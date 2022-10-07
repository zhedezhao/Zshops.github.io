<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>Welcome Z-shop</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的Z-shop</a>
          <a href="###">Z-shop会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注Z-shop</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { set } from "vue";
export default {
  name: "",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      // 路由传参
      // 1.字符串传参
      // this.$router.push("/search/" + this.keyword +"?k="+this.keyword.toUpperCase());
      // 2.模板字符串
      // this.$router.push('/search/$(this.keyword)?=$(this.keyword.toUpperCase())')
      // 3.对象
      // this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
      //path这种写法不能与params参数一起
      // this.$router.push({path:'/search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
      // this.$router.push({name:'search',query:{k:this.keyword.toUpperCase()}});
      // this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}});
      // this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}});
      // this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{});
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    toSearch() {
      // 得到当前的请求路径和query参数对象
      const { path, query } = this.$route;
      if (this.keyword) {
        // 如果当前在搜索页面, 需要携带params和query参数
        if (path.indexOf("/search") === 0) {
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword },
            query,
          }); // 可以
        } else {
          // 如果不在, 只需要携带params参数
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword },
          }); // 可以
        }
      } else {
        if (path.indexOf("/search") === 0) {
          this.$router.push({ name: "search", query });
        } else {
          this.$router.push({ name: "search" });
        }
      }
    },
  },
  mounted() {
    // 通过全局总线绑定removeKeyword事件监听
    this.$bus.$on("removeKeyword", () => {
      this.keyword = ""; // 置空我们的搜索关键字
    });
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>