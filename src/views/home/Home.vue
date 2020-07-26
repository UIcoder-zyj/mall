<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners='banners'/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

import {HomeRequestHandler} from "network/home";
const homeRequestHandler = new HomeRequestHandler();
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper
  },
  data() {
    return {
      banners: [],
      dKeyword: [],
      keywords: [],
      recommond: [],
    };
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
  },
  created() {
    this.getMultiData();
  },
};
</script >

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
