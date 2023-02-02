import globalRequest from '../index'
import { IDatatype } from '../type'
import { IAccount, loginRequestResult } from './type'

enum LoginApi {
  AccountLogin = '/login',
  userInfo = '/users',
  userMenus = '/role'
}
export function accountLoginRequest(accountInfo: IAccount) {
  return globalRequest.post<IDatatype<loginRequestResult>>({
    url: LoginApi.AccountLogin,
    data: accountInfo
  })
}

export function getUserInfoById(id: number) {
  return globalRequest.get<IDatatype<any>>({
    url: LoginApi.userInfo + `/${id}`,
    isLoading: false
  })
}

export function getUserMenusById(id: string) {
  return globalRequest.get<IDatatype<any>>({
    url: LoginApi.userMenus + `/${id}/menu`,
    isLoading: false
  })
}
