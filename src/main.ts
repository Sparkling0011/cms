import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerApp from './global'
import 'normalize.css'
import 'animate.css'
import './assets/css/index.less'
import { setupStore } from './store'
setupStore()
const app = createApp(App).use(router).use(store)
registerApp(app)
app.mount('#app')
