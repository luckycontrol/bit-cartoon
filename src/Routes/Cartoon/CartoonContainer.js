import CartoonPresenter from "./CartoonPresenter";
import React, { useCallback, useState } from "react";
import { imageApi } from "../../api";

const CartoonContainer = () => {
  const [drag, setDrag] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transition, setTransition] = useState(false);

  // ======================= 변환 후 사용 될 State ==================

  const [cartoonImages, setCartoonImages] = useState([]);
  const [mainImage, setMainImage] = useState("");

  // =============================================================

  // FIXME: 드래그 시작
  const _handleOnDragEnter = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  }, []);

  // FIXME: 드래그 끝
  const _handleOnDragLeave = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setDrag(false);
  }, []);

  // FIXME: 드래그 오버
  const _handleOnDragOver = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  // FIXME: 드랍
  const _handleOnDrop = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      setDrag(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        _handleFiles(e.dataTransfer.files);
      }
    },
    [drag, images]
  );

  // FIXME: 이미지 업로드 클릭 시
  const _handleOnClick = useCallback(() => {
    const fileElem = document.getElementById("fileElem");
    fileElem.click();
  }, []);

  // FIXME: 이미지 업로드 시
  const _handleOnUpload = useCallback(() => {
    const fileElem = document.getElementById("fileElem");
    _handleFiles(fileElem.files);
  }, [images]);

  // FIXME: 이미지 미리보기
  const _handleFiles = useCallback(
    async (files) => {
      let inputFiles = Array.from(files);
      // 이미지 파일인지 검사
      inputFiles.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          alert("이미지 파일만 넣어주세요.");
          return;
        }
        if (file.type.startsWith("image/svg")) {
          alert("벡터 이미지는 넣을실 수 없습니다.");
          return;
        }
      });

      // 비회원은 한 장만
      if (!Boolean(window.localStorage.getItem("login"))) {
        if (images.length + files.length > 1) {
          alert("비회원은 이미지를 한 장만 올리실 수 있습니다.");
          return;
        }
      }
      // 이미지는 5장까지만
      if (Boolean(window.localStorage.getItem("login"))) {
        if (images.length + files.length > 5) {
          alert("이미지는 5장까지만 업로드해주세요.");
          return;
        }
      }

      // 만약 images.length 가 0이 아니면, index = images.length 부터 시작
      // imageLength = imageLength + images.legnth
      let newImages = [...images];

      inputFiles.forEach((file) => {
        let reader = new FileReader();
        reader.onload = () => {
          const newImage = {
            id: images.length + 1,
            image: file,
            imageURL: reader.result,
          };
          newImages.push(newImage);
          setImages(newImages);
        };

        reader.readAsDataURL(file);
      });
    },
    [images]
  );

  // 이미지 삭제
  const _handleImageDelete = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    let result = window.confirm("선택하신 이미지를 지우시겠습니까?");
    if (result) {
      const update = images.filter((image) => image.id != e.target.id);
      setImages(update);
    }
  });

  const _handleImageUpdate = (files) => {
    // id, image, imageURL
    return new Promise((resolve, reject) => {});
  };

  // FIXME: 이미지 변환
  const _handleImageTransition = useCallback(
    async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const imageFiles = [];

      images.forEach((image) => {
        imageFiles.push(image["imageURL"]);
      });

      setLoading(true);
      const {
        data: { imageLength, cartoonImages },
      } = await imageApi.imageTransition(imageFiles, imageFiles.length);

      const newCartoonImages = [];
      for (let i = 0; i < imageLength; i++) {
        const newCartoonImage = {
          id: i,
          imageURL: cartoonImages[`image${i}`],
        };
        newCartoonImages.push(newCartoonImage);
      }
      setCartoonImages(newCartoonImages);
      setMainImage(newCartoonImages[0]);

      setImages([]);
      setLoading(false);
      setTransition(true);
    },
    [images]
  );

  // ========================= 번환 후 사용될 함수 =========================

  // FIXME: Main 이미지 변환
  const _handleSelectMainImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const mainImage = {
      id: e.target.name,
      imageURL: e.target.src,
    };
    setMainImage(mainImage);
  };

  // FIXME: 이미지 다운로드
  const _handleImagesDownload = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    for (let idx = 0; idx < cartoonImages.length; idx++) {
      let cartoonImage = cartoonImages[idx];

      downloadLink.setAttribute("href", cartoonImage["imageURL"]);
      downloadLink.setAttribute("download", `image${idx}`);
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  };

  // FIXME: 되돌아가기 버튼
  const _handleReset = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let result = window.confirm("이미지 변환 화면으로 돌아가시겠습니까?");
    if (result) {
      setTransition(false);
      setCartoonImages([]);
      setMainImage("");
    } else {
      return;
    }
  };

  // ======================== Presenter ======================

  return (
    <CartoonPresenter
      drag={drag}
      images={images}
      _handleOnDragEnter={_handleOnDragEnter}
      _handleOnDragLeave={_handleOnDragLeave}
      _handleOnDragOver={_handleOnDragOver}
      _handleOnDrop={_handleOnDrop}
      _handleOnClick={_handleOnClick}
      _handleOnUpload={_handleOnUpload}
      _handleImageDelete={_handleImageDelete}
      _handleImageTransition={_handleImageTransition}
      loading={loading}
      transition={transition}
      cartoonImages={cartoonImages}
      mainImage={mainImage}
      _handleSelectMainImage={_handleSelectMainImage}
      _handleImagesDownload={_handleImagesDownload}
      _handleReset={_handleReset}
    />
  );
};

export default CartoonContainer;