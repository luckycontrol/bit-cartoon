import React from "react";
import styled from "styled-components";

const ResultContainer = styled.div`
  width: 100%;
  height: 100%;

  padding: 80px 100px;

  button.backBtn {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;

    border: none;
    background-image: url("left-arrow.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
  }

  div.ContentContainer {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.SmallImageContainer {
    width: 100%;
    height: 15vh;
    margin: 15px 0;

    overflow: auto;
    white-space: nowrap;

    border-radius: 10px;
    background: rgba(255, 255, 255, 0.7);

    img {
      width: 40%;
      height: 100%;
      padding: 10px;

      object-fit: contain;
    }
  }

  div.MainImageContainer {
    width: 100%;
    height: 70vh;

    border-radius: 10px;
    background: rgba(0, 0, 0, 0.7);

    img {
      width: 100%;
      height: 100%;
      padding: 20px;

      object-fit: contain;
    }
  }

  button.ImageDownload {
    width: 100%;
    height: 4vh;
    margin-top: 20px;

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

const AfterTransfer = ({
  cartoonImages,
  mainImage,
  _handleReset,
  _handleSelectMainImage,
  _handleImagesDownload,
}) => {
  return (
    <ResultContainer>
      <button className="backBtn" onClick={_handleReset}></button>
      <div className="ContentContainer">
        <div className="SmallImageContainer">
          {cartoonImages.map((cartoonImage) => (
            <img
              key={cartoonImage.id}
              name={cartoonImage.id}
              src={cartoonImage.imageURL}
              onClick={_handleSelectMainImage}
              alt="보조이미지"
            />
          ))}
        </div>
        <div className="MainImageContainer">
          <img src={mainImage.imageURL} alt="메인이미지" />
        </div>
        <button className="ImageDownload" onClick={_handleImagesDownload}>
          이미지 다운로드
        </button>
      </div>
    </ResultContainer>
  );
};

export default AfterTransfer;
