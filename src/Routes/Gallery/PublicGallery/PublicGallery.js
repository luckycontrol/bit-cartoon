import React, { useEffect, useState, useCallback } from "react";
import { galleryApi } from "../../../api";
import PublicImageComponent from "./PublicImageComponent";
import "../../../Style/Gallery/PrivateGalleryStyle.css";
import DetailImageComponent from "../DetailImageComponent";

const PublicGallery = ({ filters, sort }) => {
  const [publicImages, setPublicImages] = useState([]);
  const [detailImageState, setDetailImageState] = useState(false);
  const [detailImage, setDetailImage] = useState({});

  useEffect(() => {
    const getPublicData = async () => {
      let data = await galleryApi.getPublic(sort);

      let {
        data: { private_images },
      } = data;

      setPublicImages(private_images);
    };

    getPublicData();
  }, [sort]);

  // FIXME: 선택한 이미지 자세히보기
  const _handleSelectDetailImage = useCallback((e, detailImage) => {
    e.stopPropagation();
    e.preventDefault();

    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("not-scroll");

    setDetailImage(detailImage);
    setDetailImageState(true);
  }, []);

  // FIXME: 선택한 이미지 자세히보기 취소
  const _handleCancelDetailImage = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("not-scroll");

    setDetailImageState(false);
  }, []);

  // FIXME: 선택한 이미지 다운로드
  const _handleDownloadImage = useCallback((e, imageId, imageURL) => {
    e.stopPropagation();
    e.preventDefault();

    let downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.setAttribute("href", imageURL);
    downloadLink.setAttribute("download", imageId);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  }, []);

  return (
    <div className="private_gallery_box">
      {sort === "필터별" ? (
        filters.map((filter, index) => (
          <div key={index} className="filter_container">
            <p className="filter_title">{filter}</p>
            <div className="private_gallery_grid">
              {publicImages[filter] !== undefined &&
                publicImages[filter].map((publicImage) => (
                  <PublicImageComponent
                    key={publicImage["imageId"]}
                    type="public"
                    publicImage={publicImage}
                    _handleSelectDetailImage={_handleSelectDetailImage}
                    _handleCancelDetailImage={_handleCancelDetailImage}
                    _handleDownloadImage={_handleDownloadImage}
                  />
                ))}
            </div>
          </div>
        ))
      ) : publicImages.length > 0 ? (
        <div className="private_gallery_grid">
          {publicImages.map((publicImage) => (
            <PublicImageComponent
              key={publicImage["imageId"]}
              type="public"
              publicImage={publicImage}
              _handleSelectDetailImage={_handleSelectDetailImage}
              _handleCancelDetailImage={_handleCancelDetailImage}
              _handleDownloadImage={_handleDownloadImage}
            />
          ))}
        </div>
      ) : (
        <span className="none_private_image">
          공개 갤러리에 이미지가 없습니다.
        </span>
      )}
      {detailImageState ? (
        <DetailImageComponent
          type="public"
          detailImage={detailImage}
          _handleCancelDetailImage={_handleCancelDetailImage}
          _handleDownloadImage={_handleDownloadImage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PublicGallery;
