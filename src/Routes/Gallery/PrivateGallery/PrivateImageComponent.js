import React from "react";
import "../../../Style/Gallery/Image.css";

const PrivateImageComponent = ({
  id,
  imageId,
  filter,
  imageURL,
  date,
  isPublic,
  like,
  _handleMovePublicImage,
  _handleMovePrivateImage,
  _handleDeleteImage,
}) => {
  return (
    <>
      <div className="private_image">
        <img src={imageURL} alt="개인이미지"></img>
        <div className="private_image_overlay"></div>
        <div className="private_image_desc">
          <p>사용된 필터 : {filter}</p>
          <p>추천 수 : {like}</p>
          <p>{date}</p>
        </div>
        <div className="private_image_options">
          <ion-icon
            id={imageId}
            name="close-circle-outline"
            onClick={_handleDeleteImage}
          ></ion-icon>

          {isPublic === true ? (
            <ion-icon
              id={imageId}
              name="download-outline"
              onClick={_handleMovePrivateImage}
            ></ion-icon>
          ) : (
            <ion-icon
              id={imageId}
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
