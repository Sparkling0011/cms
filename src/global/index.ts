import type { App } from 'vue'
import { registerElement } from './register-element'
import registerIcons from './register-icon'
import { registerProperties } from './register-properties'
const registerApp = function (app: App) {
  registerElement(app)
  registerIcons(app), registerProperties(app)
}
export default registerApp
