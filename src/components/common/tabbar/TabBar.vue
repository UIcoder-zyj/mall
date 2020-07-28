<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "TabBar"
	}
</script>

<style scoped>
  #tab-bar {
    /* 本身的样式 */
    background-color: #f6f6f6;
   

    /* 利用flex进行布局 */
    display: flex;
    text-align: center;
  }
</style>


