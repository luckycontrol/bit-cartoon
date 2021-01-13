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

const Login = styled.div`
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

const LoginContainer = styled.div`
  min-width: 40vh;
  height: 60vh;

  padding: 15px;

  border-radius: 20px;
  box-shadow: 2px 2px 15px;

  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${introAnimation} 1s ease-in-out;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
`;

const LoginForm = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const LoginInputContainer = styled.div`
  width: 70%;

  z-index: 10;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 3vh;

  font-size: 18px;
  color: white;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
`;

const LoginInputTitle = styled.h1`
  color: white;
`;

const LoginButton = styled.button`
  width: 70%;
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

const LoginPresenter = ({
  account,
  _handleInputAccount,
  _handleLogin,
  idRef,
  pwdRef,
}) => {
  const { id, pwd } = account;

  return (
    <>
      <Helmet>
        <title>ARTWORKER | 로그인</title>
      </Helmet>
      <Login>
        <LoginContainer>
          <Title>ARTWORKER</Title>
          <LoginForm>
            <LoginInputContainer>
              <LoginInputTitle>아이디</LoginInputTitle>
              <LoginInput
                name="id"
                type="text"
                value={id}
                onChange={_handleInputAccount}
                ref={idRef}
              />
            </LoginInputContainer>
            <LoginInputContainer>
              <LoginInputTitle>비밀번호</LoginInputTitle>
              <LoginInput
                name="pwd"
                type="password"
                value={pwd}
                onChange={_handleInputAccount}
                ref={pwdRef}
              />
            </LoginInputContainer>
            <LoginButton onClick={() => _handleLogin()}>로그인</LoginButton>
          </LoginForm>
        </LoginContainer>
        <video src="mainVideo.mp4" autoPlay muted loop></video>
        <div className="overlay"></div>
      </Login>
    </>
  );
};

export default LoginPresenter;
