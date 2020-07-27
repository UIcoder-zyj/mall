<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
     
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    //不要用document.querySelector方法获取
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
    });
    this.scrollTo(0, 0);
    this.scroll.on("scroll", (position) => {
      this.$emit('scroll',position);
    });
  },
  methods: {
    //   面向我开发，不然外部如果直接使用better-scroll的scrollto方法，以后换scroll框架的时候
    //   得到处改代码
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>
