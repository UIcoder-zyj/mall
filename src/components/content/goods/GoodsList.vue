<template>
  <div class="goods-list">
    <grid-view>
      <goods-list-item v-for="item in goods" :key="item.iid" :goodsItem="item" />
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
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
</style>
