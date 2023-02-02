<template>
  <div class="user-area">
    <el-dropdown @command="handleCommad">
      <span class="el-dropdown-link">
        <el-avatar :size="40" :src="circleUrl" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in drowDrowItem"
            :key="item.name"
            divided
            :command="item.name"
            >{{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const circleUrl =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const drowDrowItem = [{ name: '我的信息' }, { name: '退出登录' }]
    const router = useRouter()
    const handleCommad = (command: string | number | object) => {
      if (command === '退出登录') {
        localCache.deleteCache('token')
        router.push('/login')
      }
    }
    return {
      circleUrl,
      drowDrowItem,
      handleCommad
    }
  }
})
</script>

<style lang="less" scoped></style>
