import { reqCategoryList, reqBanners, reqFloors} from "@/api";
// home模块小仓库
const state = {
  //state中的数据默认初始别瞎写，根据服务器返回值初始化
  categoryList: [],
  banners: [], // 广告位轮播数据的数组
  floors: [], // 所有楼层数据的数组
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  }
  ,
  /* 
  接收广告轮播列表
  */
  RECEIVE_BANNERS(state, banners) {
    state.banners = banners
  },

  /* 
  接收楼层列表
  */
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors
  },

};
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  //异步获取广告位轮播数据
  async getBanners({ commit }) {
    const result = await reqBanners();
    if (result.code === 200) {
      commit('RECEIVE_BANNERS', result.data)
    }
  },

  //异步获取所有楼层数据
  async getFloors({ commit }) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit('RECEIVE_FLOORS', result.data)
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}