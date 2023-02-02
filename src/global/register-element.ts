import type { App } from 'vue'
import { ElButton } from 'element-plus/lib/components/button/index'

const components = [ElButton]

export function registerElement(app: App) {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
