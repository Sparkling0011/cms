<template>
  <div class="page-table">
    <custom-table
      :listData="list"
      v-bind="tableConfig"
      v-model:page="page"
      :listCount="listCount"
    >
      <template #addHandler>
        <div class="add" v-if="isCreate">
          <el-button type="primary" @click="addList">新增</el-button>
        </div>
      </template>
      <template #enable="scope">
        <el-tag :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-tag>
      </template>
      <template #status="scope">
        <el-tag :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? '在售' : '售完' }}
        </el-tag>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTimeUtc(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTimeUtc(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <div class="btns">
          <el-button
            type="primary"
            plain
            v-if="isUpdate"
            @click="editList(scope.row)"
          >
            <el-icon class="el-icon--left"><Edit /></el-icon>编辑</el-button
          >
          <el-button
            type="danger"
            plain
            v-if="isDelete"
            @click="handleDelete(scope.row)"
            ><el-icon class="el-icon--left"><Delete /></el-icon>删除</el-button
          >
        </div>
      </template>
      <template
        v-for="propItem in otherProps"
        :key="propItem.props"
        #[propItem.slotName]="scope"
      >
        <slot :name="propItem.slotName" :row="scope.row"></slot>
      </template>
    </custom-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { userStore } from '@/store'
import customTable from '@/base-ui/table'
import { getPermission } from '@/hooks/getPermission'

export default defineComponent({
  components: {
    customTable
  },
  props: {
    tableConfig: {
      type: Object,
      require: true
    },
    requestListName: {
      type: String,
      required: true
    }
  },
  emits: ['editListDialog', 'addListDialog'],
  setup(props, { emit }) {
    const store = userStore()
    const pageName = ref(props.requestListName)
    const page = ref({ currentPage: 1, pageSize: 10 })

    const isQuery = getPermission(pageName.value, 'query')
    const isCreate = getPermission(pageName.value, 'create')
    const isUpdate = getPermission(pageName.value, 'update')
    const isDelete = getPermission(pageName.value, 'delete')

    watch(page, () => getData())

    const getData = (QueryParams?: any) => {
      if (!isQuery) return
      const requestList = {
        listType: pageName.value,
        params: {
          offset: (page.value.currentPage - 1) * page.value.pageSize,
          size: page.value.pageSize,
          ...QueryParams
        }
      }
      store.dispatch('system/getListAction', requestList)
    }
    getData()

    const list = computed(() => store.getters['system/getList'](pageName.value))
    const listCount = computed(() =>
      store.getters['system/getListCount'](pageName.value)
    )

    const otherProps = props.tableConfig?.propsData.filter((item: any) => {
      if (item.prop === 'enable') return false
      if (item.prop === 'status') return false
      if (item.prop === 'createAt') return false
      if (item.prop === 'updateAt') return false
      if (item.prop === 'handler') return false
      return true
    })

    const handleDelete = (item: any) => {
      store.dispatch('system/deleteByIdAction', {
        listType: pageName.value,
        id: item.id
      })
    }

    const editList = (item: any) => {
      emit('editListDialog', item)
    }
    const addList = () => {
      emit('addListDialog')
    }

    return {
      list,
      page,
      otherProps,
      isCreate,
      isDelete,
      isUpdate,
      listCount,
      getData,
      handleDelete,
      editList,
      addList
    }
  }
})
</script>

<style lang="less" scoped></style>
