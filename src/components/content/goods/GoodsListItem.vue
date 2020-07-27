<template>
  <div class="goods-item" @click="goToDetail">
    <img v-lazy="getImg" :key="getImg" alt='' />
    <div class="goods-item-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">¥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    goToDetail() {
      // 1.获取iid
      let iid = this.goodsItem.iid;

      // 2.跳转到详情页面
    //  this.$router.push({ path: "/detail", query: { iid } });
    },
  },
  computed: {
    getImg() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  /* width: 48%; */
  position: relative;
}
.goods-item img {
  width: 100%;
}

.goods-item-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-item-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-item-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-item-info .collect {
  position: relative;
}

.goods-item-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
