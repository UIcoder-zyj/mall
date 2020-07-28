<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control class="tab-control" 
                  v-show='isTabFixed'
                   @itemClick="tabClick" 
                   :titles="['流行','新款','精选']" 
                    ref='tabControl1'
                    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"  
                    @swiperImageLoad='swiperImageLoad'/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control @itemClick="tabClick" 
                   :titles="['流行','新款','精选']" 
                    ref='tabControl2'
                    />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- native 赋予了自定义组件dom对象原有的事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import {debounce} from 'common/utils.js'
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
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
    BackTop,
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
      isShowBackTop: false,
      tabOffestTop: 0,
      isTabFixed: false,
      loadOffset: {
        type: Number,
        default(){
          return 0;
        }
      }
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
        this.$refs.scroll.finishedPullUp();
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
      };
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;

    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 600);
      this.$refs.scroll.refresh();
      //这也行，不过这样是直接使用better-scroll方法，以后替换scroll框架的时候得到处找代码修改不好
      //  this.$refs.scroll.scroll.scrollTo(0,0,600);
    },
    contentScroll(position) {
      /***********backtop跟踪*************/
      const showBackTopResult = position.y < -1000;
      this.isShowBackTop = showBackTopResult;    
      this.isTabFixed= (-position.y)>this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      
    },
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop; 
    }
  },
  activated(){  
    this.$refs.scroll.scrollTo(0, this.loadOffset, 10);  
    this.$refs.scroll.refresh();
  },
   deactivated(){
    this.loadOffset=this.$refs.scroll.getScroll();
  },
  created() {
    this.getMultiData();
    this.getHomeGoods(POP);
    this.getHomeGoods(NEW);
    this.getHomeGoods(SELL);
  },
  mounted() {
    const refresh=debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  /****由于better-scroll中translate依然改变fixed属性的位置因此设置成fixed属性
  仍然不行因而网页没有效果 */
  position: relative;
  z-index: 9;
  background-color: #fff;
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
