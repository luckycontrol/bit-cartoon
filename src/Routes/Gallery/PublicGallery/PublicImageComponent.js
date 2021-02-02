import React from "react"
import "../../../Style/Gallery/Image.css"

const PublicImageComponent = ({
    publicImage
}) => {
    return <>
    <div className="private_image">
      <img src={publicImage["imageURL"]} alt="개인이미지"></img>
      <div className="private_image_overlay"></div>
      <div className="private_image_desc">
        <p>사용된 필터 : {publicImage["filter"]}</p>
        <p>추천 수 : {publicImage["like"]}</p>
        <p>{publicImage["date"]}</p>
      </div>
    </div>
  </>;
}

export default PublicImageComponent;