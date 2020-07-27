<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class='content' ref='scroll' :probe-type='3' @scroll='contentScroll'>
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control  class="home-tab-control"
                    @itemClick="tabClick"
                    :titles="['流行','新款','精选']" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- native 赋予了自定义组件dom对象原有的事件 -->
    <back-top @click.native='backClick' v-show='isShowBackTop'/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll  from 'components/common/scroll/Scroll'
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";


import { HomeRequestHandler } from "network/home";
import { BACKTOP_DISTANCE, POP, NEW, SELL } from "common/const";

const homeRequestHandler = new HomeRequestHandler();
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      dKeyword: [],
      keywords: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: POP,
      isShowBackTop:false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
 

  },
  methods: {
    getMultiData() {
      homeRequestHandler.getHomeMultiData().then((res) => {
        console.log(res);
        this.banners = res.data.data[homeRequestHandler.BANNER].list;
        this.recommends = res.data.data[homeRequestHandler.RECOMMEND].list;

        // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
        // this.$nextTick(() => {
        //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        // });
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      homeRequestHandler.getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page++;
        console.log("类型为:", type, "  总共有==>", this.goods[type]);
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
        default:
          this.currentType = POP;

          break;
      }
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,600);
      //这也行，不过这样是直接使用better-scroll方法，以后替换scroll框架的时候得到处找代码修改不好
    //  this.$refs.scroll.scroll.scrollTo(0,0,600);
    },
    contentScroll(position){
      const result=(position.y < -1000);
      this.isShowBackTop=result;
    }
  },
  created() {
    this.getMultiData();
    this.getHomeGoods(POP);
    this.getHomeGoods(NEW);
    this.getHomeGoods(SELL);
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.home-tab-control {
  /****网页没有效果 */
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
