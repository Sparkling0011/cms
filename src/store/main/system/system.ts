import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './type'
import {
  addListData,
  deleteById,
  getList,
  updateListData
} from '@/service/main/system/user'

const userModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      totalUsersNum: 0,
      roleList: [],
      totalRoleNum: 0,
      goodsList: [],
      totalGoodsNum: 0,
      menuList: [],
      totalMenuNum: 0
    }
  },
  getters: {
    getList(state) {
      return (listType: string) => (state as any)[`${listType}List`]
    },
    getListCount(state) {
      return (listType: string) =>
        (state as any)[
          `total${listType.charAt(0).toUpperCase() + listType.slice(1)}Num`
        ]
    }
  },
  actions: {
    async getListAction({ commit }, payload) {
      const listType = payload.listType as string
      const finalUrl = `/${listType}/list`
      const resData = await getList(finalUrl, payload.params)
      const resList = resData.data
      const { list, totalCount = 0 } = resList

      const commitListName = `get${
        listType.charAt(0).toUpperCase() + listType.slice(1)
      }List`
      const commitNumName = `get${
        listType.charAt(0).toUpperCase() + listType.slice(1)
      }Num`

      commit(`${commitListName}`, list)
      commit(`${commitNumName}`, totalCount)
    },

    async deleteByIdAction({ dispatch }, payload) {
      const { listType, id } = payload
      const deleteUrl = `/${listType}/${id}`
      await deleteById(deleteUrl)
      dispatch('getListAction', {
        listType: listType,
        params: { offset: 0, size: 10 }
      })
    },

    async updateList({ dispatch }, payload) {
      const { listType, id, formData } = payload
      const patchUrl = `/${listType}/${id}`
      await updateListData(patchUrl, formData)
      dispatch('getListAction', {
        listType: listType,
        params: {
          offset: 0,
          size: 10
        }
      })
    },

    async addList({ dispatch }, payload) {
      const { listType, formData } = payload
      await addListData(`/${listType}`, formData)
      dispatch('getListAction', {
        listType: listType,
        params: {
          offset: 0,
          size: 10
        }
      })
    }
  },
  mutations: {
    getUsersList(state, list: any) {
      state.usersList = list
    },
    getUsersNum(state, totalCount: number) {
      state.totalUsersNum = totalCount
    },
    getRoleList(state, list: any) {
      state.roleList = list
    },
    getRoleNum(state, totalCount: number) {
      state.totalRoleNum = totalCount
    },
    getGoodsList(state, list: any) {
      state.goodsList = list
    },
    getGoodsNum(state, totalCount: number) {
      state.totalGoodsNum = totalCount
    },
    getMenuList(state, list: any) {
      state.menuList = list
    },
    getMenuNum(state, totalCount: number) {
      state.totalMenuNum = totalCount
    }
  }
}

export default userModule
