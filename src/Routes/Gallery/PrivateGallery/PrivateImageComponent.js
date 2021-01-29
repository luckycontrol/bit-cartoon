import React, { useCallback } from "react";
import "../../../Style/Gallery/Image.css";
import { galleryApi } from "../../../api";

const PrivateImageComponent = ({
  id,
  imageId,
  filter,
  imageURL,
  date,
  like,
}) => {
  const _handleMovePrivateImage = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    let result = window.confirm(
      "선택하신 이미지를 공유갤러리에 업로드 하시겠습니까?"
    );

    if (result) {
      galleryApi.share(id, imageId);
    }
  }, []);

  const _handleDeletePrivateImage = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log(e.target.id);
  });

  return (
    <>
      <div className="private_image">
        <img src={imageURL}></img>
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
            onClick={_handleDeletePrivateImage}
            alt="오우"
          ></ion-icon>
          <ion-icon
            id={imageId}
            name="share-outline"
            onClick={_handleMovePrivateImage}
          ></ion-icon>
        </div>
      </div>
    </>
  );
};

export default PrivateImageComponent;
