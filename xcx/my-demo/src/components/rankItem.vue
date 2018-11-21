<template>
  <div class="rank-item" @tap="toDetail">
    <div class="rank-top flex flex-column items-center justify-center">
      <div class="title">TOP</div>
      <div class="index">{{index + 1}}</div>
    </div>
    <image class="img" :src="item.goods_thumbnail_url"></image>
    <div class="info">
      <div class="name">{{item.goods_name}}</div>
      <div class="price-box">
        <span class="price">{{item.discount_price}}</span>
        <span class="old-price">￥{{item.source_price}}</span>
      </div>
      <div class="count">销售量:{{item.sale_num24}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index'],
    methods: {
      toDetail () {
        wx.navigateTo({
          url: `/pages/product-detail?productId=${this.item.goods_id}`
        })
      }
    }
  };
</script>

<style scoped lang="less">
.rank-item {
  position: relative;
  width: 214rpx;
  margin: 0 24rpx 32rpx 0;
  background: #fff;
  .rank-top {
    position:absolute;
    top:-8rpx;
    left:0;
    z-index:1;
    width:52rpx;
    height:64rpx;
    color: #fff;
    text-align: center;
    background:url('https://video.m.kuosanyun.com/top_index.png') no-repeat center center;
    background-size:cover;
    .title {
      font-size:14rpx;
      color:#fff;
    }
    .index {
      font-size:24rpx;
      color:#fff;
      margin-top:-6rpx;
    }
  }
  .img {
    width: 214rpx;
    height: 216rpx;
    background: #f3f3f3;
  }
  .info {
    padding: 10rpx;
    .name {
      font-size:24rpx;
      color:#333;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap;
    }
    .price-box {
      font-size:24rpx;
      margin-top:4rpx;
      color:#ef1612;
      .old-price {
        font-size:20rpx;
        color:#999;
        text-decoration:line-through;
        margin-left:20rpx;
      }
    }
    .count {
      margin-top:20rpx;
      font-size:20rpx;
      color:#999;
    }
  }
}
</style>
