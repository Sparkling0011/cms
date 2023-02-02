import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { IAnalysisState } from './type'
import {
  getGoodsNumbers,
  getGoodsSales,
  getGoodsCollections,
  getGoodsCities
} from '@/service/main/analysis/dashboard'

const analysisModule: Module<IAnalysisState, IRootState> = {
  namespaced: true,
  state() {
    return {
      numberOfGoods: [],
      salesOfGoods: [],
      colleactionOfGoods: [],
      cityLikesOfGoods: []
    }
  },
  mutations: {
    changeNumbers(state, list: any[]) {
      state.numberOfGoods = list
    },
    changeSales(state, list: any[]) {
      state.salesOfGoods = list
    },
    changeCollections(state, list: any[]) {
      state.colleactionOfGoods = list
    },
    changeCities(state, list: any[]) {
      state.cityLikesOfGoods = list
    }
  },
  actions: {
    async getChartDataAction({ commit }) {
      const numbersRes = await getGoodsNumbers()
      const numbers = numbersRes.data
      const salesRes = await getGoodsSales()
      const sales = salesRes.data
      const collectionsRes = await getGoodsCollections()
      const collections = collectionsRes.data
      const citiesRes = await getGoodsCities()
      const cities = citiesRes.data

      commit('changeNumbers', numbers)
      commit('changeSales', sales)
      commit('changeCollections', collections)
      commit('changeCities', cities)
    }
  }
}

export default analysisModule
