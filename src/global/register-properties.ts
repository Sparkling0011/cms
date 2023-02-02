import { App } from 'vue'
import { formatTimeUtc } from '@/utils/formatTime'

export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTimeUtc
  }
}
