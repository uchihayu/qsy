import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? " " : "http://120.27.214.61:7001/",
  timeout: 10 * 1000,
  withCredentials: true,
});

/** 请求拦截器 */
service.interceptors.request.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/** 响应拦截器 */
service.interceptors.response.use(
  function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error("网络异常，请重新尝试！"));
    }
    const res = response.data;
    const code = parseInt(res.code);
    if (typeof code !== "number") {
      return Promise.reject(res.code);
    }
    if (code === 200) {
      return res;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default service;
