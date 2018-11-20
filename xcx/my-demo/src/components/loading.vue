<template>
  <div class="loading">Loading<span class="dot">...</span></div>
</template>

<script>
  export default {
    name: "loading"
  };
</script>

<style scoped lang="less">
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  font-size: 36rpx;
  color: #999;
  .dot {
    display: inline-block;
    width: 1.5em;
    vertical-align: bottom;
    font-family: simsun;
    overflow: hidden;
    animation: dot 3s infinite step-start;
  }
  @keyframes dot {
    0% { width: 0; margin-right: 1.5em; }
    33% { width: .5em; margin-right: 1em; }
    66% { width: 1em; margin-right: .5em; }
    100% { width: 1.5em; margin-right: 0;}
  }

}
</style>
