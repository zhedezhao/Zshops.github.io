import Vue from 'vue'
import App from './App.vue'

// 注册三级联动组件
import TypeNav from '@/components/TypeNav';
// 注册轮播图
import Carousel from '@/components/Carousel';
// 注册分页组件
import Pagination from '@/components/Pagination';




// 第一个参数：全局组件名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component('Pagination', Pagination) // 全局使用<Pagination/> <pagination/>

import "@/mock/mockServer.js";
import router from './router/routes';
import {reqCategoryList} from '@/api';
reqCategoryList();

import store from '@/store';
import 'swiper/dist/css/swiper.css';

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // 注册路由:底下写法KV一致省略V[router小写]
  router,
  store,
  beforeCreate(){                 //在初始化阶段前
    Vue.prototype.$bus = this   //配置全局总线，bus有总线的意思
}
}).$mount('#app')
