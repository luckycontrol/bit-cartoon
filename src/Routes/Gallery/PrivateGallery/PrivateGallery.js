import React, { useEffect, useState } from "react";
import "../../../Style/Gallery/PrivateGalleryStyle.css";
import { galleryApi } from "../../../api";
import PrivateImageComponent from "./PrivateImageComponent";

const PrivateGallery = ({ sort }) => {
  const filters = ["테스트1", "테스트2", "테스트3", "테스트4", "테스트5"];
  const [privateImages, setPrivateImages] = useState([]);

  useEffect(() => {
    const id = window.localStorage.getItem("c_uid");

    const getPrivateData = async () => {
      let data = await galleryApi.getPrivate(id, sort);

      let {
        data: { private_images },
      } = data;

      if (sort === "필터별") {
        let private_data = [];
        filters.map((filter) => {
          private_data.push(private_images[filter]);
        });

        console.log(private_data);
      }

      setPrivateImages(private_images);
    };

    getPrivateData();
  }, [sort]);

  return (
    <>
      <div className="private_gallery_box">
        {privateImages.length > 0 ? (
          <>
            {sort === "필터별" ? (
              <>
                {filters.map(
                  (filter, index) => (
                    console.log(index),
                    (
                      <div key={filter} className="filterContainer">
                        <p>
                          <u>{filter}</u>
                        </p>
                      </div>
                    )
                  )
                )}
              </>
            ) : (
              <>
                <div className="private_gallery_grid">
                  {privateImages.map((privateImage) => (
                    <PrivateImageComponent
                      key={privateImage["imageId"]}
                      id={privateImage["id"]}
                      imageId={privateImage["imageId"]}
                      filter={privateImage["filter"]}
                      imageURL={privateImage["imageURL"]}
                      date={privateImage["date"]}
                      like={privateImage["like"]}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="none_private_image">
              <span>개인 갤러리가 비었습니다.</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PrivateGallery;
