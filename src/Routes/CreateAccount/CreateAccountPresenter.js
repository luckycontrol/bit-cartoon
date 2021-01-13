import React from "react";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";

const introAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CreateAccount = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  div.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const CreateAccountContainer = styled.div`
  min-width: 40vh;
  height: 60vh;

  padding: 15px;

  border-radius: 20px;
  box-shadow: 2px 2px 15px black;

  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${introAnimation} 1s ease-in;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
`;

const IntroTitle = styled.h1`
  font-size: 2rem;
  color: white;
`;

const CreateAccountForm = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const CreateAccountInputContainer = styled.div`
  width: 80%;
`;

const CreateAccountIdContainer = styled.div`
  width: 80%;

  display: flex;
  justify-content: space-between;
`;

const IdDuplicateButton = styled.button`
  width: 30%;

  font-size: 0.5rem;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  background-color: transparent;

  transition: 0.5s ease-in;

  :hover {
    cursor: pointer;
    border: none;
    color: black;
    background-color: white;
    opacity: 0.9;

    box-shadow: 1px 1px 1px black;
  }
`;

const CreateAccountInput = styled.input`
  width: 100%;
  height: 3vh;

  font-size: 18px;
  color: white;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
`;

const CreateAccountInputTitle = styled.h1`
  color: white;
`;

const CreateAccountButton = styled.button`
  width: 80%;
  height: 4vh;

  font-weight: bold;

  border: 1px solid white;
  color: white;
  background-color: transparent;
  border-radius: 20em;

  transition: 0.5s ease-in-out;

  :hover {
    cursor: pointer;
    border: none;
    color: black;
    background-color: white;
    opacity: 0.9;

    box-shadow: 1px 1px 1px black;
  }
`;

const CreateAccountPresenter = ({
  account,
  _handleAccountUpdate,
  _handleCheckId,
  _handleCreateAccount,
}) => {
  const { id, pwd } = account;

  return (
    <>
      <Helmet>
        <title>ARTWORKER | 회원가입</title>
      </Helmet>
      <CreateAccount>
        <CreateAccountContainer>
          <Title>ARTWORKER</Title>
          <CreateAccountForm>
            <IntroTitle>일상을 예술로 만들다.</IntroTitle>
            <CreateAccountIdContainer>
              <CreateAccountInputContainer>
                <CreateAccountInputTitle>아이디</CreateAccountInputTitle>
                <CreateAccountInput
                  name="id"
                  type="text"
                  value={id}
                  onChange={_handleAccountUpdate}
                />
              </CreateAccountInputContainer>
              <IdDuplicateButton onClick={() => _handleCheckId(id)}>
                중복확인
              </IdDuplicateButton>
            </CreateAccountIdContainer>
            <CreateAccountInputContainer>
              <CreateAccountInputTitle>비밀번호</CreateAccountInputTitle>
              <CreateAccountInput
                name="pwd"
                type="password"
                value={pwd}
                onChange={_handleAccountUpdate}
              />
            </CreateAccountInputContainer>
            <CreateAccountButton onClick={() => _handleCreateAccount()}>
              회원가입
            </CreateAccountButton>
          </CreateAccountForm>
        </CreateAccountContainer>
        <video src="mainVideo.mp4" autoPlay loop muted></video>
        <div className="overlay"></div>
      </CreateAccount>
    </>
  );
};

export default CreateAccountPresenter;
