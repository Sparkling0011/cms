<template>
  <div class="user">
    <page-search
      :SearchConfig="SearchConfig"
      @handleQuery="handleQuery"
      @handleResetfileds="handleResetfileds"
    ></page-search>
    <page-table
      :tableConfig="tableConfig"
      @addListDialog="addListDialog"
      @editListDialog="editListDialog"
      requestListName="users"
      ref="pageTableRef"
    ></page-table>
    <page-dialog
      ref="dialogRef"
      listType="users"
      :dialogConfig="DialogConfigRef"
      :defaultConfig="defaultConfig"
    ></page-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import pageSearch from '@/components/page-search'
import pageTable from '@/components/page-table'
import pageDialog from '@/components/page-dialog'

import { SearchConfig } from './config/searchConfig'
import { tableConfig } from './config/tableConfig'
import { DialogConfig } from './config/DialogConfig'
import { getSearchResult } from '@/hooks/getSearchRes'
import { getDialogForm } from '@/hooks/getDialogForm'
import { userStore } from '@/store'

export default defineComponent({
  components: {
    pageSearch,
    pageTable,
    pageDialog
  },
  name: 'user',

  setup() {
    const [pageTableRef, handleQuery, handleResetfileds] = getSearchResult()

    const editCallBack = () => {
      const passwordItem = DialogConfig.formItems.find(
        (item) => item.filed === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    const addCallback = () => {
      const passwordItem = DialogConfig.formItems.find(
        (item) => item.filed === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const [editListDialog, addListDialog, defaultConfig, dialogRef] =
      getDialogForm(editCallBack, addCallback)

    const DialogConfigRef = computed(() => {
      const store = userStore()
      const departmnetIdItem = DialogConfig.formItems.find(
        (item) => item.filed === 'departmentId'
      )
      if (departmnetIdItem) {
        departmnetIdItem.options = store.state.entireDepartmentList.map(
          (item: any) => {
            return { label: item.name, value: item.id }
          }
        )
      }
      const roleIdItem = DialogConfig.formItems.find(
        (item) => item.filed === 'roleId'
      )
      if (roleIdItem) {
        roleIdItem.options = store.state.entireRoleList.map((item: any) => {
          return { label: item.name, value: item.id }
        })
      }
      return DialogConfig
    })

    return {
      SearchConfig,
      tableConfig,
      DialogConfigRef,
      pageTableRef,
      handleQuery,
      handleResetfileds,
      defaultConfig,
      dialogRef,
      editListDialog,
      addListDialog
    }
  }
})
</script>

<style scoped lang="less">
.user {
  border-radius: 5px;
  background-color: #fff;
}
</style>
