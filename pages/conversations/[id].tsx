import { doc, getDoc, getDocs } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import ConversationScreen from '../../components/ConversationScreen';
import SideBar from '../../components/SideBar';
import { db } from '../../config/firebase';
import { Conversation, IMessage } from '../../types';
import { generateQueryGetMessages, transformMessage } from '../../utils/generateQueryMessages';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

const StyledContainer = styled.div`
  display: flex;
`;

const StyledConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 90vh;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

interface Props {
  conversation: Conversation;
  messages: IMessage[];
}

const Conversation = (props: Props) => {
  return (
    <StyledContainer>
      <Head>
        <title>Conversation with {getRecipientEmail(props.conversation.users)}</title>
      </Head>

      <SideBar />

      <StyledConversationContainer>
        <ConversationScreen conversation={props.conversation} messages={props.messages} />
      </StyledConversationContainer>
    </StyledContainer>
  );
};

export default Conversation;

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (context) => {
  const conversationId = context.params?.id;

  // get conversation to know who we are talking with
  const conversationRef = doc(db, 'conversations', conversationId as string);
  const conversationSnapshot = await getDoc(conversationRef);

  // get all messages between loggedin user and recipient in this conversation
  const queryMessages = generateQueryGetMessages(conversationId as string);
  const messagesSnapshot = await getDocs(queryMessages);
  const messages = messagesSnapshot.docs.map((messageDoc) => transformMessage(messageDoc));

  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation, // object
      messages,
    },
  };
};
