import axios from "axios"
import { message } from 'antd'
import errorFunction from './errorFunction'

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
     
    return response
  },
  function (error) {
    message.error(error.message)
    return Promise.reject(error)
  }
)
/** 单独处理响应 */
const handleResponse = (response) => {
  const {code, body} = response.data
  if (code === '200') {
    return Promise.resolve(body)
  } else {
    errorFunction(response.data)
    return Promise.reject(response.data)
  }
}

export default service

/** get方法, 独立传入params参数 */
export function get(url, params = {}, options = {}) {
  return service.get(url, {params, ...options}).then(handleResponse)
        
}

/** post方法 */
export function post(url, data) {
  return service.post(url, data).then(handleResponse)
}