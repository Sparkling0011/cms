<template>
  <div
    class="echart"
    ref="divElRef"
    :style="{ width: width, height: heigth }"
  ></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '../hooks/createEchartsInstance'

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    heigth?: string
  }>(),
  {
    width: '100%',
    heigth: '340px'
  }
)
const divElRef = ref<HTMLElement>()
onMounted(() => {
  if (divElRef.value) {
    const { setOptions } = useEcharts(divElRef.value)
    watchEffect(() => {
      setOptions(props.options)
    })
  }
})
</script>

<style lang="less" scoped></style>
