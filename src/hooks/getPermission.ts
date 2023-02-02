import { computed } from 'vue'
import { useStore } from 'vuex'

export function getPermission(pageName: string, operate: string): boolean {
  const store = useStore()
  const permission = computed(() => store.state.login.permission)
  return !!permission.value.find(
    (item: any) => item === `system:${pageName}:${operate}`
  )
}
