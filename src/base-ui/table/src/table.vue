<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <h3>{{ title }}</h3>
        <slot name="addHandler"> </slot>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      class="beautify"
      v-bind="tableProps"
    >
      <el-table-column
        v-if="isShowSelection"
        type="selection"
      ></el-table-column>
      <el-table-column
        v-if="isShowIndex"
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <template v-for="propsItem in propsData" :key="propsItem.name">
        <el-table-column
          :prop="propsItem.prop"
          :label="propsItem.label"
          :min-width="propsItem.minWidth"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="propsItem.slotName" :row="scope.row">{{
              scope.row[propsItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showPagination">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    title: {
      type: String,
      default: '列表'
    },
    listData: {
      type: Array,
      required: true
    },
    propsData: {
      type: Array,
      required: true
    },
    isShowIndex: {
      type: Boolean,
      default: false
    },
    isShowSelection: {
      type: Boolean,
      default: false
    },
    listCount: {
      type: Number,
      required: true
    },
    tableProps: {
      type: Object,
      default: () => ({})
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const background = ref(true)
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      background,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.table {
  border-top: 30px solid #f3f3f3;
  padding: 10px;
}
.footer {
  display: flex;
  margin-top: 20px;
  flex-direction: row-reverse;
}
</style>
