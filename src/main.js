// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import Top from './components/Top.vue'
import App from './App.vue'
import router from './router/index.js'
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueAwesomeSwiper/* { default global options } */)
Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'http://localhost:5000/api/'
Vue.component('top', Top)
Vue.config.productionTip = false
var store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    // 修改用户信息，组件触发
    user (state, load) {
      state.user = load
    }
  }
})
/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'

})
