import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import store from './store'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$axios = axios
new Vue({
  axios,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
