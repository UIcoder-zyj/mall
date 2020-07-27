<template>
  <div class="goods-list">
    <grid-view>
      <goods-list-item 
        v-for="(item,index) in goods" 
        :key="index" 
        :goodsItem="item"/>
    </grid-view>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";
import GridView from "components/common/gridview/GridView";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
    GridView,
  },
  data(){
    return{
      loadedImgNum:{
        type: Number,
        default(){
          return 0;
        }
      }
    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
  },
};
</script>

<style scoped>
</style>
