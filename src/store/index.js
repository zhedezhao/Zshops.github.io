import Vue from 'vue';
import Vuex from 'vuex';
// 需要使用插件一次
Vue.use(Vuex);
// // 对外暴露store类的一个实例
// const state = {};
// // mutation 修改state的唯一手段
// const mutation = {};
// // action 处理action，可以书写自己的业务逻辑，也可以处理异步
// const action = {};
// // getters 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
// const getters ={};

import home from './home';
import search from './search';
import Detail from './Detail';
import user from './user';
import  shopcart from './shopcart'
import trade from './trade';


export default new Vuex.Store({
  modules:{
    home,
    search,
    Detail,
    user,
    shopcart,
    trade
  }
});