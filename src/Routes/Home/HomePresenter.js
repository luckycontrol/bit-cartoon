import React from "react";
import { Helmet } from "react-helmet";
import "../../Style/HomePresenter.css";

const HomePresenter = () => {
  return (
    <>
      <Helmet>ARTWORKER | 홈</Helmet>
      <div className="main">
        <video src="mainVideo.mp4" autoPlay loop muted></video>
        <div className="overlay"></div>
        <div className="text">
          <h2>ARTWORKER</h2>
          <p>당신이 원하는 무엇이든 예술로</p>
        </div>
      </div>
    </>
  );
};

export default HomePresenter;
