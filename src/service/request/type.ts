import { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}
export interface customRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  isLoading?: boolean
}
