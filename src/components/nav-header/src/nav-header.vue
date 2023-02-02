<template>
  <div class="nav-header">
    <div class="icon" @click="changeIsExpand">
      <i-ep-fold v-if="isFold" class="svg" />
      <i-ep-expand v-else class="svg" />
    </div>
    <div class="content">
      <breadcrumb :breadcrumbData="breadcrumbData"></breadcrumb>
      <user-area></user-area>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { userStore } from '@/store'
import { useRoute } from 'vue-router'
import breadcrumb from '@/base-ui/breadcrumb'
import UserArea from './user-area.vue'
import { mapbreadtoMenu } from '@/utils/map-menu'

export default defineComponent({
  components: { breadcrumb, UserArea },
  emits: ['changeCollapse'],
  setup(props, { emit }) {
    const isFold = ref(false)

    const store = userStore()

    const breadcrumbData = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return mapbreadtoMenu(userMenus, currentPath)
    })
    const changeIsExpand = () => {
      isFold.value = !isFold.value
      emit('changeCollapse', isFold.value)
    }
    return {
      isFold,
      breadcrumbData,
      changeIsExpand
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  align-items: center;
  height: 100%;
  .icon {
    display: flex;
    align-content: center;
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
  }
}
</style>
