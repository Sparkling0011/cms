import type { App } from 'vue'
import { registerProperties } from './register-properties'
const registerApp = function (app: App) {
  registerProperties(app)
}
export default registerApp
