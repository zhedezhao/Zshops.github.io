<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow()" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show = "Show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}" @mouseenter="changeIndex(index)">
                <h3>
                  <a :data-categoryName = "c1.categoryName" :data-categoryId="c1.category1Id">{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                <!-- <div class="item-list clearfix" v-show="currentIndex == index"> -->
                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName = "c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName = "c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">Z-shop超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      Show: true,
    };
  },
  //组件挂载完毕，可以向服务器发送请求
  mounted() {
    this.Show = this.$route.path === "/home";
    //通知vuex发送请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
  computed: {
    ...mapState({
      // 右侧需要一个函数
      // 注入一个state，即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
    },
    goSearch(event) {
      // this.$router.push('/search')
      let element = event.target;
      // console.log(element);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
    enterShow() {
      if (this.$route.path != "/home") {
        this.Show = true;
      }
    },
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.Show = false;
      }
    },
    /* 
点击某个分类项跳转到search路由
*/
    toSearch(event) {
      // 只绑定的一个点击监听
      // console.dir(event.target)
      // 得到所有标签上的data自定义属性
      const dataset = event.target.dataset;
      // console.log('dataset', dataset)
      // 取出自定义属性值
      const { categoryname, category1id, category2id, category3id } = dataset;

      //if (event.target.tagName==='A') { // 如果点击的是a标签就可以跳转了
      if (categoryname) {
        // 必然点击的是分类项
        // 准备query参数对象
        const query = {
          categoryName: categoryname,
        };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 得到当前路由路径     /  或者 /search 或者 /search/xxx
        const { path, params } = this.$route;

        this.hideFirst();

        // 如果当前已经在搜索界面
        if (path.indexOf("/search") === 0) {
          // 跳转到搜索, path为原本的路径(可能携带了params参数)
          this.$router.replace({
            name: "search",
            params,
            query,
          });
        } else {
          // 当前没在搜索界面
          // 跳转路由, 并携带query参数
          this.$router.push({
            path: "/search",
            query,
          });
        }
      }
    },
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>