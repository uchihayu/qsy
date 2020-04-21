import axios from "axios"

const service = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? " " : "http://120.27.214.61:7001/",
  timeout: 10 * 1000,
  withCredentials: true,
})

/** 请求拦截器 */
service.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

/** 响应拦截器 */
service.interceptors.response.use(
  function (response) {
     
    const {status, data} = response
    if (status !== 200) {
      return Promise.reject(new Error("网络异常，请重新尝试！"))
    }
    return data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default service
