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
    cursor: pointer;
    width: 100%;
    padding: 12px 0;
    color: black;
    background-color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 2px black;
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
  font-size: 1rem;
  color: ${(props) => props.color};

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const FilterBox = styled.div`
  width: 100%;
  color: white;

  button {
    padding: 0 10px;
  }

  @media screen and (max-width: 768px) {
    overflow: auto;
    white-space: nowrap;
    height: 10%;
  }
`;

const FilterText = styled.span`
  color: white;
  padding: 15px 0;
`;

const BeforeTransfer = ({
  drag,
  images,
  filter,
  _handleOnDragEnter,
  _handleOnDragLeave,
  _handleOnDragOver,
  _handleOnDrop,
  _handleOnClick,
  _handleOnUpload,
  _handleImageDelete,
  _handleSelectFilter,
  _handleImageTransition,
}) => {
  const filters = ["테스트1", "테스트2", "테스트3", "테스트4", "테스트5"];
  return (
    <InputImageContainer>
      <FilterBox>
        <button name="테스트1" onClick={_handleSelectFilter}>
          테스트1
        </button>
        <button name="테스트2" onClick={_handleSelectFilter}>
          테스트2
        </button>
        <button name="테스트3" onClick={_handleSelectFilter}>
          테스트3
        </button>
        <button name="테스트4" onClick={_handleSelectFilter}>
          테스트4
        </button>
        <button name="테스트5" onClick={_handleSelectFilter}>
          테스트5
        </button>
      </FilterBox>
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
      {filter != "" ? <FilterText>적용될 필터 : {filter}</FilterText> : null}
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
