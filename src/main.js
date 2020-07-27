import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'  //图片懒加载

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/tongji.jpg')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

