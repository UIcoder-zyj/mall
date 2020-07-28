<template>
  <div class="tab-control">
    <!-- <tab-bar class="tab-bar"> -->
      <div
        v-for="(item, index) in titles"
        :class="{active:currentIndex===index }"
        class="tab-bar-item"
        @click="itemClick(index)"
      >
        <span>{{ item }}</span>
      </div>
    <!-- </tab-bar> -->
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
export default {
  name: "TabControl",
  components: {
    TabBar,
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.$emit("itemClick", index);
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 100%;
  height: 40px;
  line-height: 40px;
}
.tab-bar-item {
  flex: 1;
}
.tab-bar-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
  /* color: var(--color-high-text); */
}
</style>
