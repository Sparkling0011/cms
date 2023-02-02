import globalRequest from '@/service'
import { IDatatype } from '@/service/type'
import { IRequestUserListData } from './type'

export function getList(
  listNameUrl: string,
  requestData: IRequestUserListData
) {
  return globalRequest.post<IDatatype<any>>({
    url: listNameUrl,
    data: requestData
  })
}

export function deleteById(deleteUrl: string) {
  return globalRequest.delete<IDatatype<any>>({
    url: deleteUrl
  })
}

export function addListData(url: string, listData: any) {
  return globalRequest.post<IDatatype<any>>({
    url: url,
    data: listData
  })
}

export function updateListData(url: string, listData: any) {
  return globalRequest.patch<IDatatype<any>>({
    url: url,
    data: listData
  })
}
