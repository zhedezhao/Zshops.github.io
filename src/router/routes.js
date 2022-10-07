// 配置路由的地方
import Vue from 'vue';
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/shopCart'
import Trade from '@/pages/trade';
import Pay from '@/pages/pay'
import PaySuccess from '@/pages/paySuccess';
import Center from '@/pages/center'

import MyOrder from '@/pages/center/myOrder';
import TeamOrder from '@/pages/center/teamOrder'

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写Push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

// 配置路由
export default new VueRouter({
  // 配置路由
  routes: [
    {
      path: "/home",
      component: Home,
      meta: { show: true }
    }
    ,
    {
      path: "/search/:keyword?",
      component: Search,
      meta: { show: true },
      name: "search",
      // 路由组件能不能传递props数据？
      // 布尔值写法：params
      // props:{a:1,b:2}，
      // 函数写法：可以param参数，query参数，通过props传递给路由组件
      props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    }
    ,
    {
      path: "/login",
      component: Login,
      meta: { show: false }
    }
    ,
    {
      path: "/register",
      component: Register,
      meta: { show: false }
    }
    ,
    // 重定向，项目跑起来立马定向到首页
    {
      path: '*',
      redirect: "/home"
    },
    {
      path: '/detail/:skuId?',
      component: Detail,
      meta: { show: true },
    },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      //路由元信息,控制当前路由是否需要Footer组件
      meta: { show: true },
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: { show: true }
    },
    {
      path: '/trade',
      component: Trade,
      meta: { show: true }
    },
    {
      path: '/pay',
      component: Pay,
      meta: { show: true }
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      meta: { show: true }
    }
    ,
    {
      path: '/center',
      component: Center,
      meta: { show: true },
      //二级路由配置的地方
      children: [
        //我的订单
        {
          path: 'myorder',
          component: MyOrder
        }
        ,
        {
          path: 'teamorder',
          component: TeamOrder
        }
        ,
        {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    },
    {
      path: '/communication',
      component: () => import('@/pages/Communication/Communication'),
      children: [
        {
          path: 'event',
          component: () => import('@/pages/Communication/EventTest/EventTest'),
          meta: {
            show: false
          },
        },
        {
          path: 'model',
          component: () => import('@/pages/Communication/ModelTest/ModelTest'),
          meta: {
            show: false
          },
        },
        {
          path: 'sync',
          component: () => import('@/pages/Communication/SyncTest/SyncTest'),
          meta: {
            show: false
          },
        },
        {
          path: 'attrs-listeners',
          component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
          meta: {
            show: false
          },
        },
        {
          path: 'children-parent',
          component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
          meta: {
            show: false
          },
        },
        {
          path: 'scope-slot',
          component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
          meta: {
            show: false
          },
        }
      ],
    },
  ]
})