import { createStore, useStore as VuexStore, Store } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import analysis from './main/analysis/analysis'
import { IRootState, IStoreType } from './type'
import { getList } from '@/service/main/system/user'
const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartmentList: [],
      entireRoleList: [],
      entireMenuList: []
    }
  },
  actions: {
    async getListDataAction({ commit }) {
      const departmentRes = await getList('/department/list', {
        offset: 0,
        size: 1000
      })
      const roleRes = await getList('/role/list', {
        offset: 0,
        size: 1000
      })
      const menuRes = await getList('/menu/list', {})

      const { list: departmentList } = departmentRes.data
      const { list: roleList } = roleRes.data
      const { list: menuList } = menuRes.data
      commit('changeDepartList', departmentList)
      commit('changeRoleList', roleList)
      commit('changeMenuList', menuList)
    }
  },
  mutations: {
    changeDepartList(state, list: any[]) {
      state.entireDepartmentList = list
    },
    changeRoleList(state, list: any[]) {
      state.entireRoleList = list
    },
    changeMenuList(state, list: any[]) {
      state.entireMenuList = list
    }
  },
  modules: {
    login,
    system,
    analysis
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getListDataAction')
}
export function userStore(): Store<IStoreType> {
  return VuexStore()
}
export default store
