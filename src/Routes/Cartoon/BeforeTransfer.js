import React from "react";
import styled, { css } from "styled-components";

const InputImageContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 80px 100px;

  .translateBtn {
    width: 100%;
    height: 4vh;

    color: white;
    background: transparent;
    border-radius: 10px;
    border: 1px solid white;

    transition: 0.5s ease-in-out;

    :hover {
      border: none;
      color: black;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 1px 1px 1px black;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 80px 30px;
  }
`;

const InputBox = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 2px black;
  cursor: pointer;

  ${(props) => {
    if (props.isDrag) {
      return css`
        background: rgba(255, 255, 255, 0.7);
      `;
    } else {
      return css`
        background: rgba(0, 0, 0, 0.7);
      `;
    }
  }}

  input {
    display: none;
  }
`;

const ImageGrid = styled.div`
  width: 100%;
  height: 100%;

  overflow: auto;
  white-space: nowrap;

  display: flex;
  align-items: center;
`;

const BeforeImg = styled.div`
  background-image: url(${(props) => props.imageURL});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 50%;
  height: 50%;
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DragText = styled.span`
  color: ${(props) => props.color};
`;

const BeforeTransfer = ({
  drag,
  images,
  _handleOnDragEnter,
  _handleOnDragLeave,
  _handleOnDragOver,
  _handleOnDrop,
  _handleOnClick,
  _handleOnUpload,
  _handleImageDelete,
  _handleImageTransition,
}) => {
  return (
    <InputImageContainer>
      <InputBox
        isDrag={drag}
        onDragEnter={_handleOnDragEnter}
        onDragLeave={_handleOnDragLeave}
        onDragOver={_handleOnDragOver}
        onDrop={_handleOnDrop}
        onClick={_handleOnClick}
      >
        <input
          id="fileElem"
          type="file"
          multiple
          accept="image/*"
          onChange={_handleOnUpload}
        ></input>
        {images.length > 0 ? (
          <>
            <ImageGrid>
              {images.map((image) => (
                <BeforeImg
                  key={image.id}
                  id={image.id}
                  imageURL={image.imageURL}
                  alt="변환이미지"
                  onClick={_handleImageDelete}
                ></BeforeImg>
              ))}
            </ImageGrid>
          </>
        ) : drag ? (
          <DragText color="black">여기에 놓아주세요.</DragText>
        ) : (
          <DragText color="white">
            이곳을 클릭하거나 드래그로 이미지를 가져오세요.
          </DragText>
        )}
      </InputBox>
      {images.length > 0 ? (
        <button className="translateBtn" onClick={_handleImageTransition}>
          이미지 변환
        </button>
      ) : (
        <></>
      )}
    </InputImageContainer>
  );
};

export default BeforeTransfer;
