import axios from "axios";

const cartoonApi = axios.create({
  baseURL: "https://ec2-3-133-137-52.us-east-2.compute.amazonaws.com",
  withCredentials: false, // refreshToken을 Cookie로 주고받기 위해..
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
  imageTransition: (images, image_length) => {
    const form = new FormData();
    form.append("image_length", image_length);
    for (let i = 0; i < image_length; i++) {
      form.append(`image${i}`, images[i]);
    }

    //TODO: 이미지 받기
    return cartoonApi({
      method: "post",
      url:
        "https://ec2-3-133-137-52.us-east-2.compute.amazonaws.com/cartoon/transition",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
