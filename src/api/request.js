//对于axios进行二次封装
import axios from "axios";
// import { config } from "vue/types/umd";

// 引入进度条
import nProgress from "nprogress";
import "nprogress/nprogress.css";

// 利用axios对象方法创建一个axios实例
// request 就是axios，只不过重新配置了一下
const requests = axios.create({
  baseURL:"/api",
  timeout:15000,
});

// 请求拦截器
requests.interceptors.request.use((config)=>{
  nProgress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use((res)=>{
  // 成功的回调函数，服务器响应的数据回来以后，响应拦截器可以检测到，可以做一些事情
  nProgress.done();
  return res.data;
},(error)=>{
  // 响应失败的回调函数
  nProgress.done();
  alert('请求出错')
  return Promise.reject(error)
})


export default requests;
