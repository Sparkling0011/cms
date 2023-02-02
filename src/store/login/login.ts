import { Module } from 'vuex'
import { IRootState } from '../type'
import { ILoginState } from './types'
import { IAccount } from '@/service/login/type'
import router from '@/router'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusById
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { getRouterMap, mapMenuToPermission } from '@/utils/map-menu'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permission: []
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      const LoginRes = await accountLoginRequest(payload)
      const { id, token } = LoginRes.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      dispatch('getListDataAction', null, { root: true })

      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      const userMenusRes = await getUserMenusById(userInfo.role.id)
      const userMenus = userMenusRes.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const routeMaps = getRouterMap(userMenus)
      routeMaps.forEach((route) => {
        router.addRoute('main', route)
      })
      const permission = mapMenuToPermission(state.userMenus)
      state.permission = permission
    }
  }
}

export default loginModule
