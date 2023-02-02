// import { Avatar, Phone } from '@element-plus/icons-vue'
import { App } from 'vue'
import * as ElIconModules from '@element-plus/icons-vue'

// const icons = [Avatar, Phone]

function registerIcons(app: App) {
  Object.keys(ElIconModules).forEach(function (key) {
    app.component(key, (ElIconModules as any)[key])
  })
}
export default registerIcons
