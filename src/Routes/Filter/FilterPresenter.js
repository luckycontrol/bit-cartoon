import React, { useState, useMemo, useCallback } from "react";
import PlotPresenter from "./Plot/PlotPresenter";
import "../../Style/Filter/FilterPresenter.css";

const FilterPresenter = () => {
  const filterNames = useMemo(
    () => [
      ["5Centimater_crop_BGR", "초속5센티미터"],
      ["Howls_crop_BGR", "하울의 움직이는 성"],
      ["Paprika_BGR", "파프리카"],
      ["snow_BGR", "겨울왕국"],
      ["SummerWars_RGB_6cut", "썸머워즈"],
      ["yourname_RGB_6cut", "너의이름은"],
    ],
    []
  );

  // FIXME: 필터 사용법 보는 버튼
  const _handleSetFilterInfo = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    const info_container = document.querySelector(".info_container");
    const body = document.getElementsByTagName("body")[0];
    info_container.classList.toggle("is-active");
    body.classList.toggle("not-scroll");
  }, []);

  return (
    <>
      <div className="filter_container">
        <div className="filter_info">
          <ion-icon
            className="info_btn"
            name="alert-circle-outline"
            onClick={_handleSetFilterInfo}
          ></ion-icon>
        </div>
        <div className="filters_all_in_one">
          {filterNames.map((filter) => (
            <div key={filter} className="filter_title_and_info">
              <p className="filter_title">{filter[1]}</p>
              <div className="filter_box">
                <img src={`poster/${filter[0]}.jpg`} alt="필터 이미지"></img>
                <PlotPresenter classname="plot" csvFile={filter[0]} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 필터 페이지란 무엇인가...? */}
      <div className="info_container">
        <div className="info_close">
          <ion-icon name="close-circle-outline"></ion-icon>
        </div>
        <div className="info_box"></div>
        <div className="info_overlay"></div>
      </div>
    </>
  );
};

export default FilterPresenter;
{
  /* <PlotPresenter csvFile="5Centimater_crop_BGR" /> */
}
