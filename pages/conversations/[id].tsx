import { doc, getDoc, getDocs } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';
import { db } from '../../config/firebase';
import { Conversation } from '../../types';
import { generateQueryGetMessages } from '../../utils/generateQueryMessages';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

const StyledContainer = styled.div`
  display: flex;
`;

interface Props {
  conversation: Conversation;
}

const Conversation = (props: Props) => {
  return (
    <StyledContainer>
      <Head>
        <title>Conversation with {getRecipientEmail(props.conversation.users)}</title>
      </Head>

      <SideBar />

      <h1>Messsage</h1>
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
  const queryMessages = generateQueryGetMessages(conversationId);
  const messageSnapshot = await getDocs(queryMessages);

  console.log('messageSnapshot', messageSnapshot?.docs[0]?.data());

  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation, // object
    },
  };
};
