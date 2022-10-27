import { Chat as ChatIcon } from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import MoreVerticalIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as EmailValidator from 'email-validator';
import { addDoc, collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Conversation } from '../types';
import {
  StyledContainer,
  StyledHeader,
  StyledSearch,
  StyledSearchInput,
  StyledSidebarButton,
  StyledUserAvatar,
} from './styles/Sidebar.style';
import ConversationSelect from './ConversationSelect';

const SideBar = () => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const toggleNewConversationDialog = (isOpen: boolean) => {
    setIsOpenNewConversationDialog(isOpen);

    if (!isOpen) {
      setRecipientEmail('');
    }
  };

  const closeNewConversationDialog = () => {
    toggleNewConversationDialog(false);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('ERROR LOGGIN OUT', error);
    }
  };
  console.log('loggedInUser', loggedInUser);
  // check if conversation already exists between the current loggedin user and recipient
  const queryGetConversationForCurrentUser = query(
    collection(db, 'conversations'),
    where('users', 'array-contains', loggedInUser?.email)
  );
  const [conversationsSnapshot, __loading, __error] = useCollection(queryGetConversationForCurrentUser);

  const isConversationAlreadyExists = (recipientEmail: string) => {
    return conversationsSnapshot?.docs.find((conversation) =>
      (conversation.data() as Conversation).users.includes(recipientEmail)
    );
  };

  const isInvitingSelf = recipientEmail === loggedInUser?.email;

  const createConversation = async () => {
    console.log('Create conversation clicked');

    if (EmailValidator.validate(recipientEmail) && !isInvitingSelf && !isConversationAlreadyExists(recipientEmail)) {
      // Add conversation user to db "conversations" collection
      // A conversation is between the currently logged user and the user entered

      await addDoc(collection(db, 'conversations'), {
        users: [loggedInUser?.email, recipientEmail],
      });
    } else {
      setIsOpenAlert(true);
    }
    closeNewConversationDialog();
  };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  return (
    <StyledContainer>
      <Snackbar open={isOpenAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity='error' sx={{ width: '100%' }}>
          Oops! Something wrong happened.
        </Alert>
      </Snackbar>

      <StyledHeader>
        <Tooltip title={loggedInUser?.email as string} placement='right'>
          <StyledUserAvatar src={loggedInUser?.photoURL || ''} />
        </Tooltip>

        <div>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>

          <IconButton>
            <MoreVerticalIcon></MoreVerticalIcon>
          </IconButton>

          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>

      <StyledSearch>
        <SearchIcon />
        <StyledSearchInput placeholder='Search in conversations' />
      </StyledSearch>

      <StyledSidebarButton onClick={() => toggleNewConversationDialog(true)}>
        Start a new conversation
      </StyledSidebarButton>

      {/* List of conversations */}
      {conversationsSnapshot?.docs.map((conversation) => (
        <ConversationSelect
          key={conversation.id}
          id={conversation.id}
          conversationUsers={(conversation.data() as Conversation).users}
        />
      ))}

      <Dialog open={isOpenNewConversationDialog} onClose={closeNewConversationDialog}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a Google email address for the user you wish to chat with</DialogContentText>
          <TextField
            autoFocus
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewConversationDialog}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default SideBar;
