<template>
  <div class="pieChart">
    <custom-echart :options="options"></custom-echart>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import customEchart from '@/base-ui/echart'

const props = defineProps<{
  data: any[]
}>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '商品数量统计',
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
