import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// axios提供基本方法
// axios.defaults.baseURL='http://123.207.32.32:8000';
// axios.defaults.timeout=5000;
// axios.all([axios({
//   url: 'home/multidata',
// }),axios({
//   url: 'home/data',
//   params:{
//     page: 1,
//     type: 'sell'
//   },
// })]).then(axios.spread((res1,res2)=>{
//   console.log(res1),
//   console.log(res2)
// }));  //提供了axios.spread()方法来分割
 
// //创建实例进行开发
// const instance1=axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// });
// instance1({
//   url: 'home/data',
//   params:{
//     page: 1,
//     type: 'sell'
//   },
// }).then(res=>console.log(res))