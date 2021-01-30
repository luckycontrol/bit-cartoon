import React, { useEffect, useState, useCallback } from "react";
import "../../../Style/Gallery/PrivateGalleryStyle.css";
import { galleryApi } from "../../../api";
import PrivateImageComponent from "./PrivateImageComponent";

const PrivateGallery = ({ filters, sort, setLoading }) => {
  const [privateImages, setPrivateImages] = useState([]);
  const [act, setAct] = useState(false);

  // FIXME: sorting 방법에 따라 리로드..
  useEffect(() => {
    const id = window.localStorage.getItem("c_uid");

    const getPrivateData = async () => {
      let data = await galleryApi.getPrivate(id, sort);

      let {
        data: { private_images },
      } = data;

      if (sort === "필터별") {
        let private_datas = [];
        for (let filter of filters) {
          private_datas.push(private_images[filter]);
        }

        setPrivateImages(private_datas);
        return;
      }

      setPrivateImages(private_images);
    };

    getPrivateData();
  }, [filters, sort, act, setLoading]);

  // FIXME: 이미지를 공개 갤러리로
  const _handleMovePublicImage = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    let result = window.confirm(
      "선택하신 이미지를 공개갤러리에 업로드 하시겠습니까?"
    );

    if (result) {
      const id = window.localStorage.getItem("c_uid");
      galleryApi.share(id, e.target.id);
      setAct(false);
    }
  }, []);

  // FIXME: 이미지를 개인 갤러리로
  const _handleMovePrivateImage = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    let result = window.confirm(
      "선택하신 이미지를 공개갤러리에서 내리시겠습니까?"
    );

    if (result) {
      const id = window.localStorage.getItem("c_uid");
      galleryApi.share(id, e.target.id);
      setAct(false);
    }
  }, []);

  // FIXME: 선택한 이미지 삭제
  const _handleDeleteImage = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    let result = window.confirm("선택하신 이미지를 삭제하시겠습니까?");

    if (result) {
      const id = window.localStorage.getItem("c_uid");
      galleryApi.delete(id, e.target.id);
      setAct(false);
    }
  }, []);

  return (
    <div className="private_gallery_box">
      {sort === "필터별" ? (
        <></>
      ) : privateImages.length > 0 ? (
        <div className="private_gallery_grid">
          {privateImages.map((privateImage) => (
            <PrivateImageComponent
              key={privateImage["imageId"]}
              id={privateImage["id"]}
              imageId={privateImage["imageId"]}
              filter={privateImage["filter"]}
              imageURL={privateImage["imageURL"]}
              date={privateImage["date"]}
              isPublic={privateImage["isPublic"]}
              like={privateImage["like"]}
              _handleMovePublicImage={_handleMovePublicImage}
              _handleMovePrivateImage={_handleMovePrivateImage}
              _handleDeleteImage={_handleDeleteImage}
            />
          ))}
        </div>
      ) : (
        <p>개인갤러이에 이미지가 없습니다.</p>
      )}
    </div>
  );
};

export default PrivateGallery;
