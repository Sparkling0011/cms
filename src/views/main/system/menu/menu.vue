<template>
  <div class="menu">
    <page-table :table-config="tableConfig" requestListName="menu"></page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageTable from '@/components/page-table'
import { tableConfig } from './config/tableConfig'

export default defineComponent({
  name: 'menu-manage',
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
