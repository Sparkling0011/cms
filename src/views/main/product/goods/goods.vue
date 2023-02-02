<template>
  <div class="goods">
    <page-table :table-config="tableConfig" request-list-name="goods">
      <template #imgUrl="scope">
        <el-image
          style="width: 80px; height: 80px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="4"
          fit="cover"
      /></template>
    </page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageTable from '@/components/page-table'
import { tableConfig } from './config/tableConfig'

export default defineComponent({
  name: 'goods',
  components: {
    pageTable
  },
  setup() {
    return {
      tableConfig
    }
  }
})
</script>

<style scoped></style>
