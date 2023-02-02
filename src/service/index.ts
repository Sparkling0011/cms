import GlobalRequest from './request'
import { BASE_URL, TIME_OUT } from './request/conf'
import localCache from '../utils/cache'

const request = new GlobalRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers = {}
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default request
