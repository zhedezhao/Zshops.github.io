<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home search显示，在Login register隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

export default {
  name: 'App',
    data() {
    return {
      searchParams: {
        pageNo: 6,
        pageSize: 3,
      },
    };
  },
  components: {
    Header,
    Footer
  },
  mounted(){
    this.$store.dispatch("categoryList");
  },
}
</script>
  
<style>
</style>
