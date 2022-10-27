import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useRecipient } from '../hooks/useRecipient';

declare type Props = ReturnType<typeof useRecipient>;

const StyledAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`;

const RecipientAvatar = ({ recipient, recipientEmail }: Props) => {
  return recipient?.photoURL ? (
    <StyledAvatar src={recipient?.photoURL} />
  ) : (
    <StyledAvatar>{recipientEmail && recipientEmail[0].toUpperCase()}</StyledAvatar>
  );
};

export default RecipientAvatar;
