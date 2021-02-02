import React, { useEffect, useState } from "react";
import { galleryApi } from "../../../api";
import PublicImageComponent from "./PublicImageComponent";
import "../../../Style/Gallery/PrivateGalleryStyle.css";

const PublicGallery = ({ filters, sort }) => {
  const [publicImages, setPublicImages] = useState([]);
  const [act, setAct] = useState(0);

  useEffect(() => {
    const id = window.localStorage.getItem("c_uid");

    const getPublicData = async () => {
      let data = await galleryApi.getPublic(sort);

      let {
        data: { private_images },
      } = data;

      setPublicImages(private_images);
    };

    getPublicData();
  }, [sort, act]);

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
                    publicImage={publicImage}
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
              publicImage={publicImage}
            />
          ))}
        </div>
      ) : (
        <span className="none_private_image">
          개인 갤러리에 이미지가 없습니다.
        </span>
      )}
    </div>
  )
};

export default PublicGallery;
