import React, { MouseEventHandler } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { IMessage } from '../types';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteDoc, doc } from 'firebase/firestore';

const StyledMessage = styled.div`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  min-width: 30%;
  padding: 15px 15px 30px;
  border-radius: 8px;
  margin: 10px 0 0 0;
  position: relative;
`;

const StyledSenderMessage = styled(StyledMessage)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const StyledReceivedMessage = styled(StyledMessage)`
  background-color: whitesmoke;
`;

const StyledTimestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: x-small;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: darkgray;
  color: red;
`;

const Message = ({ message }: { message: IMessage }) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  const MessageType = loggedInUser?.email === message.user ? StyledSenderMessage : StyledReceivedMessage;

  const deleteDocs = async () => {
    console.log('message', message);
    await deleteDoc(doc(db, 'messages', message.id));
  };

  const onDeleteMessage: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    deleteDocs();
  };

  return (
    <MessageType>
      <StyledIconButton onClick={onDeleteMessage}>
        <CloseIcon />
      </StyledIconButton>

      {message.text}
      <StyledTimestamp>{message.sent_at}</StyledTimestamp>
    </MessageType>
  );
};

export default Message;
