<template>
  <div>
    <h2>hello world</h2>
    <h2>{{message}}</h2>
  </div>
</template>

<script>
import { request } from "./network/request";
export default {
  name: "App",
  data() {
    return{
      message: "",
    }  
  },
  created() {
    const config = {
      baseURL: "http://123.207.32.32:8000",
      timeout: 5000,
      url: "/home/data",
      params: {
        page: 1,
        type: "sell",
      },
    };
    request(config).then((res) => (this.message = res)).catch(e=>console.log(e));
  },
};
</script>


<style scoped>
</style>