<template>
  <div class="feature">
    <!-- <div class="feature-item" v-for="(item, index) in features" :key='index'>
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div> -->
    <a href='http://act.mogujie.com/zzlx67'>
      <img src='~assets/img/home/recommend_bg.jpg' alt=''>
    </a>
  </div>
</template>

<script>
	export default {
		name: "FeatureView",
    // props: {
		//   features: {
		//     type: Array,
    //     default: []
    //   }
    // }
	}
</script>

<style scoped>
  /* .feature {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }

  .feature-item {
    flex: 1;
    text-align: center;
  } */

  .feature img {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }
</style>
