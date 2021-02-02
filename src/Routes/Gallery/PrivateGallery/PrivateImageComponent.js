import React from "react";
import "../../../Style/Gallery/Image.css";

const PrivateImageComponent = ({
  privateImage,
  _handleMovePublicImage,
  _handleMovePrivateImage,
  _handleDeleteImage,
}) => {
  return (
    <>
      <div className="private_image">
        <img src={privateImage["imageURL"]} alt="개인이미지"></img>
        <div className="private_image_overlay"></div>
        <div className="private_image_desc">
          <p>사용된 필터 : {privateImage["filter"]}</p>
          <p>추천 수 : {privateImage["like"]}</p>
          <p>{privateImage["date"]}</p>
        </div>
        <div className="private_image_options">
          <ion-icon
            id={`${privateImage["id"]}/${privateImage["imageId"]}`}
            name="close-circle-outline"
            onClick={_handleDeleteImage}
          ></ion-icon>

          {privateImage["isPublic"] === true ? (
            <ion-icon
            id={`${privateImage["id"]}/${privateImage["imageId"]}`}
              name="download-outline"
              onClick={_handleMovePrivateImage}
            ></ion-icon>
          ) : (
            <ion-icon
            id={`${privateImage["id"]}/${privateImage["imageId"]}`}
              name="share-outline"
              onClick={_handleMovePublicImage}
            ></ion-icon>
          )}
        </div>
      </div>
    </>
  );
};

export default PrivateImageComponent;
