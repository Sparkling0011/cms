<template>
  <div class="user">
    <page-search :SearchConfig="SearchConfig"></page-search>
    <page-table
      :tableConfig="tableConfig"
      @addListDialog="addListDialog"
      @editListDialog="editListDialog"
      request-list-name="role"
    ></page-table>
    <page-dialog
      ref="dialogRef"
      listType="role"
      :dialogConfig="DialogConfig"
      :defaultConfig="defaultConfig"
    >
      <el-tree
        ref="elTreeRef"
        :otherInfo="otherInfo"
        class="tree"
        :data="entireMenuList"
        show-checkbox
        node-key="id"
        :default-checked-keys="[5]"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
    /></page-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import pageSearch from '@/components/page-search'
import pageTable from '@/components/page-table'

import { SearchConfig } from './config/searchConfig'
import { tableConfig } from './config/tableConfig'
import { DialogConfig } from './config/DialogConfig'
import { getDialogForm } from '@/hooks/getDialogForm'
import { userStore } from '@/store'
import { getLeaveList } from '@/utils/map-menu'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageTable
  },
  setup() {
    const store = userStore()
    const entireMenuList = computed(() => store.state.entireMenuList)
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (items: any) => {
      const leafKeys = getLeaveList(items.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const otherInfo = ref({})

    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    const [editListDialog, addListDialog, defaultConfig, dialogRef] =
      getDialogForm(editCallBack)
    return {
      SearchConfig,
      tableConfig,
      DialogConfig,
      editListDialog,
      addListDialog,
      defaultConfig,
      dialogRef,
      entireMenuList,
      otherInfo,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.user {
  border-radius: 5px;
  background-color: #fff;
}
.tree {
  margin-left: 60px;
}
</style>
