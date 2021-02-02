import React from "react";
import "../../Style/Gallery/DetailImage.css";

const DetailImageComponent = ({ fullImage, _handleCancelDetailImage }) => {
  const { id, imageId, filter, imageURL, date, isPublic, like } = fullImage;

  return (
    <>
      <div className="detail_image_container">
        <div className="detail_image_box">
          <ion-icon
            className="cancel_detail_image"
            name="close-outline"
            onClick={_handleCancelDetailImage}
          ></ion-icon>
          <img src={imageURL} alt="이미지"></img>
        </div>
        <div className="detail_image_overlay"></div>
      </div>
    </>
  );
};

export default DetailImageComponent;
