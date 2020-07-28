<template>
  <div id="detail">
    <detail-nav-bar :titles='titles'></detail-nav-bar>
    <detail-swiper :topImages='topImages'></detail-swiper>
    <!-- <detail-product/>
    <detail-param/>
    <detail-discussions/>
    <detail-recommends/> -->
  </div>
</template>

<script>
import DetailNavBar from './childDetail/DetailNavBar'
import DetailProduct from './childDetail/DetailProduct'
import DetailParam from './childDetail/DetailParam'
import DetailDiscussions from './childDetail/DetailDiscussions'
import DetailRecommends from './childDetail/DetailRecommends'
import DetailSwiper from './childDetail/DetailSwiper'

import {DetailRequestHandler} from 'network/detail'

const detailRequestHandler=new DetailRequestHandler();
export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailProduct,
    DetailParam,
    DetailDiscussions,
    DetailRecommends,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      titles: ['商品','参数','评论','推荐'],
      topImages: []
    }
  },
  created() {
    this.iid = this.$route.params.iid;
    detailRequestHandler.getDetailData(this.iid).then(res=>{
      console.log(res);
      this.topImages=res.data.result.itemInfo.topImages;
    }); 
  },
  mounted(){

  },
  methods:{
    
  }
};
</script>

<style scoped>
/* .detail-nav{
  background-color: #ffff;

}
.detail-nav-left{

} */
</style>
