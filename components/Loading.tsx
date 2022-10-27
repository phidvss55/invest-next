import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import styled from 'styled-components'
import WhatsAppLogo from '../assets/whatsapplogo.png';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  place-items: center;
  height: 100vh;
`

const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`

const Loading = () => {
  return (
    <StyledContainer>
      <StyledImageWrapper>
        <Image src={WhatsAppLogo} alt="Whatsapp logo" height='200px' width='200px' />
      </StyledImageWrapper>

      <CircularProgress />
    </StyledContainer>
  )
}

export default Loading