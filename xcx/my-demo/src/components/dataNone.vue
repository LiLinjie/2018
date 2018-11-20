<template>
  <div class="data-none">
    <i class="iconfont icon-icon-no-data"></i>
    <p>{{text}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '这里什么数据都还没有哦'
      }
    }
  }
</script>

<style scoped lang="less">
.data-none {
  padding: 40rpx;
  color: #aaa;
  text-align: center;
  .iconfont {
    display: block;
    font-size: 200rpx;
    color: #e64d45;
  }
}
</style>
