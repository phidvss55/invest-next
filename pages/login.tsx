import { Button } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import WhatsAppLogo from '../assets/whatsapplogo.png';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { StyledContainer, StyledImageWrapper, StyledLoginContainer } from '../components/styles/Login.style';

const Login = () => {
  const [signInWithGoogle, _user, _loading] = useSignInWithGoogle(auth);

  const signIn = () => {
    signInWithGoogle();
  };

  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>

      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image src={WhatsAppLogo} alt='Whatsapp logo' height='200px' width='200px' />
        </StyledImageWrapper>

        <Button variant='outlined' onClick={signIn}>
          Sign in with Google
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  );
};

export default Login;
