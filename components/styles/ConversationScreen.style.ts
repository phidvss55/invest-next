import styled from "styled-components";

export const StyledRecipientHeader = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  padding: 11px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

export const StyledHeaderInfo = styled.div`
	flex-grow: 1;
	> h3 {
		margin-top: 0;
		margin-bottom: 3px;
	}
	> span {
		font-size: 14px;
		color: gray;
	}
`

export const StyledH3 = styled.h3`
	word-break: break-all;
`

export const StyledHeaderIcons = styled.div`
	display: flex;
`

export const StyledMessageContainer = styled.div`
	padding: 30px;
	background-color: #e5ded8;
	min-height: 75vh;
`

export const StyledInputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: white;
	z-index: 100;
`

export const StyledInput = styled.input`
	flex-grow: 1;
	outline: none;
	border: none;
	border-radius: 10px;
	background-color: whitesmoke;
	padding: 15px;
	margin-left: 15px;
	margin-right: 15px;
`

export const EndOfMessagesForAutoScroll = styled.div`
	margin-bottom: 30px
`