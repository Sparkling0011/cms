<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @change-collapse="getCollapse"></nav-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NavHeader } from '@/components/nav-header'
import { NavMenu } from '@/components/nav-menu'

export default defineComponent({
  components: { NavHeader, NavMenu },
  setup() {
    const isCollapse = ref(false)
    const getCollapse = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      getCollapse
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
      text-align: center;
      background-color: #001529;
      transition: width 0.3s linear;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-header {
      height: 48px;
      text-align: center;
    }
    .el-main {
      color: #333;
      padding: 10px;
      height: calc(100%-48px);
      background-color: #f0f2f5;
    }
  }
}
</style>
