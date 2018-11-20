<template>
  <div class="sorts-box flex">
    <div :class="{'sort-item flex-1': true, active: sort === item.key}"
         v-for="(item, index) in sorts" :key="index" @tab="changeSort(item.key)">
      {{item.value}}
    </div>
    <div class="sort-item flex-1">
      价格
    </div>
  </div>
</template>

<script>
  export default {
    name: "sort",
    data () {
      return {
        sorts: [{
          key: '',
          value: '默认'
        }, {
          key: 20,
          value: '好评'
        }, {
          key: 6,
          value: '销量'
        }]
      }
    },
    methods: {
      changeSort (key) {
        console.log(key);
      }
    }
  };
</script>

<style scoped lang="less">
.sorts-box {
  position: relative;
  z-index: 99;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #fff;
  font-size: 28rpx;
  color: #333;
  border-bottom: 2rpx solid #f6f6f6;
  .sort-item {
    height: 80rpx;
    &.active {
      color: #ef1612;
    }
  }
}
</style>
