<template>
  <div class='recommend'>
    <div v-for="item in recommends" :key='item.sort' class='recommend-item'>
      <a :href='item.link'>
        <img :src='item.image'>
         <div >{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>

 .recommend  {
    display : flex;
    width: 100%;
    text-align: center;
    padding: 12px 0 20px;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend img{
    width: 75%
  }
</style>
