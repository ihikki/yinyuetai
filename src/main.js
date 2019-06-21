import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'
import './common/stylus/index.styl'
import router from './router/index.js'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VueLazyLoad,{
  loading:require('@/common/image/default.gif')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
