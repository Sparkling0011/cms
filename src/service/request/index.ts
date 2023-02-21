import axios from 'axios'
import { AxiosInstance } from 'axios'
import ElLoading from 'element-plus/lib/components/loading/index'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { customRequestConfig, RequestInterceptors } from './type'
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true

class GlobalRequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  isLoading?: boolean
  loading?: LoadingInstance

  constructor(config: customRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.isLoading = config.isLoading ?? DEFAULT_LOADING
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        if (this.isLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中',
            background: 'rgba(0,0,0,0.7)'
          })
        }
        return config
      },
      (err) => {
        console.error(err)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        console.error(err)
      }
    )
  }

  request<T>(config: customRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }
      if (config.isLoading === false) {
        this.isLoading = false
      }
      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
          this.isLoading = DEFAULT_LOADING
        },
        (err) => {
          this.isLoading = DEFAULT_LOADING
          reject(err)
        }
      )
    })
  }

  get<T>(config: customRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'get' })
  }

  post<T>(config: customRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'post' })
  }
  delete<T>(config: customRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'delete' })
  }
  patch<T>(config: customRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'patch' })
  }
}
export default GlobalRequest
