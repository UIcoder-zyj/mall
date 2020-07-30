<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zyj
 * @Date: 2020-07-28 16:11:10
 * @LastEditors: zyj
 * @LastEditTime: 2020-07-30 16:29:29
-->
<template>
  <div id="detail">
    <detail-nav-bar :titles='titles' class='detail-nav-bar'></detail-nav-bar>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            >
      <detail-swiper :topImages='topImages'></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'/>
    </Scroll>
    <back-top @click.native="backClick" v-show="showBackTop" />
    <!-- <detail-product/>
    <detail-param/>
    <detail-discussions/>
    <detail-recommends/> -->
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'
import DetailNavBar from './childDetail/DetailNavBar'
import DetailSwiper from './childDetail/DetailSwiper'
import DetailBaseInfo from './childDetail/DetailBaseInfo'
import DetailShopInfo from './childDetail/DetailShopInfo'

import {Goods, Shop, GoodsParam} from "./detailMessage";
import {BACKTOP_DISTANCE} from "@/common/const";

import {DetailRequestHandler} from 'network/detail'

const detailRequestHandler=new DetailRequestHandler();
export default {
  name: "Detail",
  components:{
    Scroll,
    BackTop,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      showBackTop: false,
      iid: null,
      titles: ['商品','参数','评论','推荐'],
      topImages: [],
      goods:{},
      shop: {}
    }
  },
  created() {
    this.iid = this.$route.params.iid;
    this.getDetailData(this.iid);

  },
  mounted(){

  },
  methods:{
    getDetailData(iid){
      detailRequestHandler.getDetailData(this.iid).then(res=>{
        console.log('detail msg',res);
        const data=res.data.result;

        this.topImages=data.itemInfo.topImages;

        this.goods=new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        this.shop = new Shop(data.shopInfo);
      });
    },
    contentScroll(position) {
    // 1.监听backTop的显示
    this.showBackTop = position.y < -BACKTOP_DISTANCE

    // 2.监听滚动到哪一个主题
   // this._listenScrollTheme(-position.y)
  },
  }
};
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }

</style>
