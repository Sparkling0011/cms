<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" class="img" alt="无法加载" />
      <span class="title" v-if="!isCollapse">Vue3+Typescript</span>
    </div>
    <el-menu
      :default-active="defaultMenu"
      :collapse="isCollapse"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      unique-opened
      active-text-color="#0a60bd"
    >
      <template v-for="menu in userMenus" :key="menu.id + ''">
        <!-- 有二级菜单 -->
        <template v-if="menu.type === 1">
          <el-sub-menu :index="menu.id + ''">
            <template #title>
              <el-icon>
                <component :is="getIconName(menu.icon)"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="submenu in menu.children" :key="submenu.key">
              <el-menu-item
                :index="submenu.id + ''"
                @click="handleMenuItemClick(submenu)"
              >
                <span>{{ submenu.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 只有一级菜单 -->
        <template v-else-if="menu.type === 2">
          <el-menu-item :index="menu.id + ''"> </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { userStore } from '@/store'
import router from '@/router'
import { mapUrlToMenu } from '@/utils/map-menu'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = userStore()
    const userMenus = computed(() => store.state.login.userMenus)
    const currentPath = useRoute().path

    const menu = mapUrlToMenu(userMenus.value, currentPath)
    const defaultMenu = ref(menu.id + '')

    const getIconName = (iconClass: string) => {
      return iconClass.slice(8)
    }
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-find'
      })
    }
    return {
      userMenus,
      defaultMenu,
      getIconName,
      handleMenuItemClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  .logo {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    padding: 12px 10px 8px 10px;
    height: 28px;
    .img {
      height: 100%;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
</style>
