<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zyj
 * @Date: 2020-07-28 17:50:45
 * @LastEditors: zyj
 * @LastEditTime: 2020-07-30 16:20:08
-->
<template>
  <div>
    <nav-bar class="detail-nav">
      <div slot="left" class='back' @click="backClick">
        <img src="~assets/img/common/back.svg"  alt />
      </div>
      <div slot="center" class='detail-nav-center'>
           <tab-control :titles="titles" class='tab-control'/>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
    TabControl
  },
  props:{
    titles:{
      type: Array,
      default(){
        return [];
      }
    }
  },
  methods: {
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.detail-nav{
  background-color: #fff;
  position : relative;
  z-index: 9;
}
.back{
  height:44px;
}
.back img{
  margin-top: 8px;
  height: 60%;
}
</style>
