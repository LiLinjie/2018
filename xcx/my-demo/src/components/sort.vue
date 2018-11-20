<template>
  <div class="sorts-box flex">
    <div :class="{'sort-item flex-1': true, active: sort === item.key}"
         v-for="(item, index) in sorts" :key="index"
         @tap="changeSort(item.key)"
    >
      {{item.value}}
    </div>
    <div :class="{'sort-item flex-1 flex justify-center items-center': true, active: sort === 3 || sort === 4}" @tap="priceChange">
      价格
      <div class="arrow flex flex-column justify-center items-center">
        <i :class="{'iconfont icon-sort-down1': true, active: sort === 3}"></i>
        <i :class="{'iconfont icon-sort-down': true, active: sort === 4}"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sort",
    props: ['sort'],
    data () {
      return {
        sorts: [{
          key: 0,
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
        this.$emit('changeSort', key);
      },
      priceChange () {
        if (this.sort === 3) {
          this.changeSort(4);
        } else {
          this.changeSort(3);
        }
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
    .arrow {
      line-height: 1;
      margin-top: -10rpx;
      color: #333333;
      .icon-sort-down1 {
        margin-bottom: -7px;
        &.active {
          color: #ef1612;
        }
      }
      .icon-sort-down {
        margin-top: -7px;
        &.active {
          color: #ef1612;
        }
      }
    }
  }
}
</style>
