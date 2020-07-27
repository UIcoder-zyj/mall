<template>
  <div>
    <main-tab-bar class='main-tab-bar'/>
    <keep-alive>
      <router-view />
    </keep-alive>

  </div>

</template>
<script>

import { request } from "./network/request";

import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components:{
    MainTabBar,

  },
  data() {
    return {
      message: "",
    };
  },

  created() {},
};
</script>

<style scoped>
@import "./assets/css/base.css";
.main-tab-bar{
  z-index: 10;
}
</style>
