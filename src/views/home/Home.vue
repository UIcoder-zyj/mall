<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control  class="home-tab-control" :titles="['流行','新款','精选']"/>
    <goods-list :goods="goods['pop'].list"></goods-list>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList  from 'components/content/goods/GoodsList'

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { HomeRequestHandler } from "network/home";
import {BACKTOP_DISTANCE,POP,NEW,SELL} from 'common/const'

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
  },
  data() {
    return {
      banners: [],
      dKeyword: [],
      keywords: [],
      recommends: [],
      goods:{
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]},
      }
    };
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
    getHomeGoods(type){
      const page=this.goods[type].page+1;
      homeRequestHandler.getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(... res.data.data.list);
        this.goods[type].page++;
          console.log('类型为:',type,'  总共有==>',this.goods[type]);
      })
    },
    getGoodsType(type){

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
.home-tab-control {  /****网页没有效果 */
  position: sticky;
  top: 44px;
  z-index: 9;
}
/* .content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
} */
</style>
