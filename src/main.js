import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './toast'

import 'postcss-pxtorem'
import 'amfe-flexible'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')
