import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8001'
axios.defaults.headers.common['token'] = store.state.token;
//请求拦截器，配置token
axios.interceptors.request.use(
  config => {
      if (localStorage.getItem('token') != null) { // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.token = localStorage.getItem('token');
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });
  //响应拦截器
  axios.interceptors.response.use((res) => {
    // token 已过期，重定向到登录页面
   console.log(res)
    return res
  }, function(err) {
    if(err.response.status == 600){
    }
    console.log(err.response)
    return Promise.reject(err) 
  })
new Vue({
  axios,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
