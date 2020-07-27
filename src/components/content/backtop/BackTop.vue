<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" v-if='' alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
 

};
</script>

<style scoped>
.back-top{
    position: absolute;
    width: 44px;
    height: 44px;
    bottom: 49px;
    right: 0;
}
.back-top img{
    padding-right: 3px;
    width: 100%;
    /* position: absolute;
    right: 0 */
}
</style>
