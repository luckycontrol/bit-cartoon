import axios from "axios";

const cartoonApi = axios.create({
  // baseURL: "https://luckycontrol.xyz",
  baseURL: "http://192.168.1.9:5000",
  // withCredentials: false, // refreshToken을 Cookie로 주고받기 위해..
});

export const loginApi = {
  login: (id, pwd) => {
    const form = new FormData();
    form.append("id", id);
    form.append("pwd", pwd);

    // Success, access_token 을 받는다.
    return cartoonApi.post("/login", form);
  },
};

export const createAccountApi = {
  // 중복검사
  checkId: (id) => cartoonApi.get(`/login/check_id/${id}`),

  // 계정생성
  createAccount: (id, pwd) => {
    const form = new FormData();
    form.append("create_id", id);
    form.append("create_pwd", pwd);

    return cartoonApi.post("/login/createAccount", form);
  },
};

export const imageApi = {
  imageTransition: (filter, images, image_length) => {
    const form = new FormData();

    if (window.localStorage.getItem("c_uid") === null) {
      form.append("id", "Not User");
    } else {
      form.append("id", window.localStorage.getItem("c_uid"));
    }

    form.append("filter", filter);
    form.append("image_length", image_length);
    for (let i = 0; i < image_length; i++) {
      form.append(`image${i}`, images[i]);
    }

    //TODO: 이미지 받기
    return cartoonApi({
      method: "post",
      url: "http://192.168.1.9:5000/cartoon/transition",
      // url: "https://luckycontrol.xyz/cartoon/transition",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export const galleryApi = {
  getPrivate: (id, sort) => {
    const form = new FormData();
    form.append("id", id);
    form.append("sort", sort);

    return cartoonApi.post("/gallery/getPrivate", form);
  },

  delete: (id, imageId) => {
    const form = new FormData();
    form.append("id", id);
    form.append("imageId", imageId);

    return cartoonApi.post("/gallery/delete", form);
  },

  share: (id, imageId) => {
    const form = new FormData();
    form.append("id", id);
    form.append("imageId", imageId);

    cartoonApi.post("/gallery/share", form);
  },
};
