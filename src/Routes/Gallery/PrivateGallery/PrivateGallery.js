import React, { useEffect, useState, useCallback } from "react";
import "../../../Style/Gallery/PrivateGalleryStyle.css";
import { galleryApi } from "../../../api";
import PrivateImageComponent from "./PrivateImageComponent";


const PrivateGallery = ({ filters, sort }) => {
  const [privateImages, setPrivateImages] = useState([]);
  const [act, setAct] = useState(0);

  // FIXME: sorting 방법에 따라 리로드..
  useEffect(() => {
    const id = window.localStorage.getItem("c_uid");

    const getPrivateData = async () => {
      let data = await galleryApi.getPrivate(id, sort);

      let {
        data: { private_images },
      } = data;

      setPrivateImages(private_images);
    };

    getPrivateData();
  }, [sort, act]);

  // FIXME: 이미지를 공개 갤러리로
  const _handleMovePublicImage = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      let result = window.confirm(
        "선택하신 이미지를 공개갤러리에 업로드 하시겠습니까?"
      );

      if (result) {
        const id = e.target.id.split("/")[0];
        const imageId = e.target.id.split("/")[1];

        galleryApi.share(id, imageId);

        setAct(act + 1);
      }
    },
    [act]
  );

  // FIXME: 이미지를 개인 갤러리로
  const _handleMovePrivateImage = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      let result = window.confirm(
        "선택하신 이미지를 공개갤러리에서 내리시겠습니까?"
      );

      if (result) {
        const id = e.target.id.split("/")[0];
        const imageId = e.target.id.split("/")[1];

        galleryApi.unshare(id, imageId);

        setAct(act + 1);
      }
    },
    [act]
  );

  // FIXME: 선택한 이미지 삭제
  const _handleDeleteImage = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      let result = window.confirm("선택하신 이미지를 삭제하시겠습니까?");

      if (result) {
        const id = e.target.id.split("/")[0];
        const imageId = e.target.id.split("/")[1];

        galleryApi.delete(id, imageId);

        setAct(act + 1);
      }
    },
    [act]
  );

  return (
    <div className="private_gallery_box">
      {sort === "필터별" ? (
        filters.map((filter, index) => (
          <div key={index} className="filter_container">
            <p className="filter_title">{filter}</p>
            <div className="private_gallery_grid">
              {privateImages[filter] !== undefined &&
                privateImages[filter].map((privateImage) => (
                  <PrivateImageComponent
                    key={privateImage["imageId"]}
                    privateImage={privateImage}
                    _handleMovePublicImage={_handleMovePublicImage}
                    _handleMovePrivateImage={_handleMovePrivateImage}
                    _handleDeleteImage={_handleDeleteImage}
                  />
                ))}
            </div>
          </div>
        ))
      ) : privateImages.length > 0 ? (
        <div className="private_gallery_grid">
          {privateImages.map((privateImage) => (
            <PrivateImageComponent
              key={privateImage["imageId"]}
              privateImage={privateImage}
              _handleMovePublicImage={_handleMovePublicImage}
              _handleMovePrivateImage={_handleMovePrivateImage}
              _handleDeleteImage={_handleDeleteImage}
              
            />
          ))}
        </div>
      ) : (
        <span className="none_private_image">
          개인 갤러리에 이미지가 없습니다.
        </span>
      )}
      
    </div>
  );
};

export default PrivateGallery;
