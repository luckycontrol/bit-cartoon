import React from "react";
import "../../Style/Gallery/Gallery.css";
import PublicGallery from "./PublicGallery/PublicGallery";
import PrivateGallery from "./PrivateGallery/PrivateGallery";
import Loading from "../../Components/Loading";

const Gallery = ({
  title,
  _handleGalleryCategory,
  _handleClickSortingWayTitle,
  sort,
  _handleSortingWay,
  filters,
  loading,
  setLoading,
}) => {
  return (
    <>
      <div className="gallery_container">
        <p className="gallery_title">{title}</p>
        <div className="gallery_category">
          <span
            className="gallery_category_item is-active"
            active-color="white"
            id="공개갤러리"
            onClick={_handleGalleryCategory}
          >
            공개갤러리
          </span>
          <span
            className="gallery_category_item"
            active-color="blue"
            id="개인갤러리"
            onClick={_handleGalleryCategory}
          >
            개인갤러리
          </span>
        </div>
        <div className="sortingway_dropdown_container">
          <button
            className="sortingway_text"
            onClick={_handleClickSortingWayTitle}
          >
            정렬방법 - {sort}
          </button>

          <div className="sortingway_dropdown_items">
            <button
              className="sortingway_dropdown_item"
              name="최신순"
              onClick={_handleSortingWay}
            >
              최신순
            </button>
            <button
              className="sortingway_dropdown_item"
              name="필터별"
              onClick={_handleSortingWay}
            >
              필터별
            </button>
            <button
              className="sortingway_dropdown_item"
              name="추천순"
              onClick={_handleSortingWay}
            >
              추천순
            </button>
          </div>
        </div>
        <div className="gallery_content">
          {loading ? (
            <Loading text={"이미지 로딩중..."} />
          ) : title === "공개갤러리" ? (
            <PublicGallery
              filters={filters}
              sort={sort}
              setLoading={setLoading}
            />
          ) : (
            <PrivateGallery
              filters={filters}
              sort={sort}
              setLoading={setLoading}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
