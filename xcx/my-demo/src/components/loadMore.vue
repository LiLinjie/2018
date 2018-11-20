<template>
  <div class="load-more">
    <span v-if="!hasMore">没有更多数据啦～</span>
    <span v-if="hasMore && isLoading">加载中...</span>
    <span v-if="hasMore && !isLoading">上拉加载更多</span>
  </div>
</template>

<script>
  export default {
    props: {
      hasMore: {
        type: Boolean,
        default: true
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
.load-more {
  padding: 32rpx 0;
  text-align: center;
  font-size: 24rpx;
  color: #A9ABAF;
}
</style>
