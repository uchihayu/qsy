import axios from './axios'

/** get方法, 独立传入params参数 */
export function get(url, params = {}, options = {}) {
  return axios.get(url, {params, ...options})
}

/** post方法 */
export function post(url, data) {
  return axios.post(url, data)
}