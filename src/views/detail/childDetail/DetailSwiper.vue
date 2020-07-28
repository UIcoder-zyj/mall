<template>
  <swiper ref="swiper" v-if="topImages.length" class='detail-swiper'>
    <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="" />      
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data(){
    return{
      isLoad:false
    }
  },
  props: {
    topImages: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad=true;
      }
     
    }
  }
};
</script>

<style scoped>
.detail-swiper{
  height: 300px;
}
</style>
