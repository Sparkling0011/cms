import globalRequest from '@/service'
import { IDatatype } from '@/service/type'

enum getcharDatatApi {
  getNumbers = 'goods/category/count',
  getSales = '/goods/category/sale',
  getCollections = '/goods/category/favor',
  getCities = '/goods/address/sale'
}
export function getGoodsNumbers() {
  return globalRequest.get<IDatatype<any[]>>({
    url: getcharDatatApi.getNumbers
  })
}

export function getGoodsSales() {
  return globalRequest.get<IDatatype<any[]>>({
    url: getcharDatatApi.getSales
  })
}
export function getGoodsCollections() {
  return globalRequest.get<IDatatype<any[]>>({
    url: getcharDatatApi.getCollections
  })
}
export function getGoodsCities() {
  return globalRequest.get<IDatatype<any[]>>({
    url: getcharDatatApi.getCities
  })
}
