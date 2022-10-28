import React, { KeyboardEventHandler, useState } from 'react';
import { useRecipient } from '../hooks/useRecipient';
import { Conversation, IMessage } from '../types';
import {
  convertFirestoreTimestampToString,
  generateQueryGetMessages,
  transformMessage,
} from '../utils/generateQueryMessages';
import RecipientAvatar from './RecipientAvatar';
import {
  StyledH3,
  StyledHeaderIcons,
  StyledHeaderInfo,
  StyledInput,
  StyledInputContainer,
  StyledMessageContainer,
  StyledRecipientHeader,
} from './styles/ConversationScreen.style';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

const ConversationScreen = ({ conversation, messages }: { conversation: Conversation; messages: IMessage[] }) => {
  const conversationUsers = conversation.users;
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  const { recipientEmail, recipient } = useRecipient(conversationUsers);
  const [newMessage, setNewMessage] = useState('');

  const router = useRouter();
  const conversationId = router.query.id;
  const queryMessage = generateQueryGetMessages(conversationId as string);
  const [messagesSnapshot, messagesLoading, __error] = useCollection(queryMessage);

  const showMessages = () => {
    // if fronend is loading messages behind the scenes, display messages retrieved from next SSR (passed down from [id].tsx)
    if (messagesLoading) {
      return messages.map((message, index) => <Message key={index} message={message}></Message>);
    }

    // if frontend has finished loading messages, so now we have message snapshot
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message, index) => (
        <Message key={index} message={transformMessage(message)}></Message>
      ));
    }

    return null;
  };

  const addMessageToDbAndUpdateLastSeen = async () => {
    // update last seen in 'users' collection
    await setDoc(
      doc(db, 'users', loggedInUser?.email as string),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    ); // just update what is changed

    // add new message to 'messages' collection
    await addDoc(collection(db, 'messages'), {
      conversation_id: conversationId,
      sent_at: serverTimestamp(),
      text: newMessage,
      user: loggedInUser?.email,
    });

    // reset input field
    setNewMessage('');

    // scroll to bottom
    scrollToBottom();
  };

  const endOfMessagesRef = React.useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessageOnEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!newMessage) return;

      addMessageToDbAndUpdateLastSeen();
    }
  };

  return (
    <>
      <StyledRecipientHeader>
        <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />

        <StyledHeaderInfo>
          <StyledH3>{recipientEmail}</StyledH3>
          {recipient && <span>Last active: {convertFirestoreTimestampToString(recipient.lastSeen)}</span>}
        </StyledHeaderInfo>

        <StyledHeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </StyledHeaderIcons>
      </StyledRecipientHeader>

      <StyledMessageContainer>{showMessages()}</StyledMessageContainer>

      {/* Enter new message */}
      <StyledInputContainer>
        <InsertEmoticonIcon />

        <StyledInput
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyDown={sendMessageOnEnter}
        />
        <IconButton>
          <SendIcon />
        </IconButton>
        <IconButton>
          <MicIcon />
        </IconButton>
      </StyledInputContainer>
    </>
  );
};

export default ConversationScreen;
