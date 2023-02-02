<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="商品数量"
          ><page-pie-chart :data="goodNumbers"></page-pie-chart> </card
      ></el-col>
      <el-col :span="10"> <card title="地图展示"> </card></el-col>
      <el-col :span="7"> <card title="商品数量"> </card></el-col>
    </el-row>
    <el-row :gutter="10" class="divideDistance">
      <el-col :span="12"><card title="折线图"> </card></el-col>
      <el-col :span="12"
        ><card title="柱状图"
          ><bar-chart v-bind="goodsCollections"></bar-chart></card
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { userStore } from '@/store'
import card from '@/base-ui/card'
import { pagePieChart, barChart } from '@/components/page-chart'

export default defineComponent({
  name: 'dashboard',
  components: {
    card,
    pagePieChart,
    barChart
  },
  setup() {
    const store = userStore()
    store.dispatch('analysis/getChartDataAction')
    const goodNumbers = computed(() => {
      return store.state.analysis.numberOfGoods.map((item) => {
        return { value: item.goodsCount, name: item.name }
      })
    })

    const goodsCollections = computed(() => {
      const collections = store.state.analysis.colleactionOfGoods
      const dataAxis: any[] = []
      const data: any[] = []
      collections.forEach((item) => {
        const { name, goodsFavor } = item
        dataAxis.push(name)
        data.push(goodsFavor)
      })
      return { dataAxis, data }
    })
    return {
      goodNumbers,
      goodsCollections
    }
  }
})
</script>

<style scoped>
.divideDistance {
  margin-top: 10px;
}
</style>
