import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './toast'
import { Lazyload } from 'vant'

import 'postcss-pxtorem'
import 'amfe-flexible'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

Vue.use(Lazyload, {
  lazyComponent: true
})

new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')
