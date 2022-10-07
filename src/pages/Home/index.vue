<template>
  <div>
    <!-- 三级联动全局组件已经注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>


<script>
// 引入其余组件
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import { mapState } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 触发vuex的异步action调用, 从mock接口请求数据到state中
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getFloors");
  },

  computed: {
    ...mapState({
      floors: (state) => state.home.floors,
    }),
  },
};
</script>

<style scoped>
</style>