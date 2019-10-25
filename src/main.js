import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
