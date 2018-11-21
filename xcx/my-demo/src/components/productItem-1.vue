<template>
  <div class="product-item-1 flex items-center" @tap="goDetail(item.goods_id)">
    <image class="img" :src="item.goods_thumbnail_url"></image>
    <div class="info">
      <div class="name">{{item.goods_name}}</div>
      <div class="price-box">
        <span class="price"><text>¥</text>{{item.source_price}}</span>
        <span class="old-price">¥ {{item.min_group_price}}</span>
      </div>
      <div class="count">销量：{{item.sold_quantity}}</div>
    </div>
    <div class="btn flex flex-column justify-center">
      <div class="coupon" v-if="item.coupon_discount > 0">{{item.coupon_discount}}元券</div>
      <div class="coupon-btn">领券</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    methods: {
      goDetail (id) {
        wx.navigateTo({
          url: `/pages/product-detail?productId=${id}`
        })
      }
    }
  };
</script>

<style scoped lang="less">
  .product-item-1 {
    height: 208rpx;
    margin-bottom: 20rpx;
    background: #fff;
    .img {
      width: 168rpx;
      height: 168rpx;
      margin: 0 20rpx 20rpx 30rpx;
    }
    .info {
      position: relative;
      width: 340rpx;
      .name {
        margin-bottom: 20rpx;
        font-size:28rpx;
        color:#333;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
      }
      .price-box {
        .price {
          font-size: 32rpx;
          color: #ef1612;
          margin-right: 10rpx;
        }
        .old-price {
          text-decoration:line-through;
          font-size:20rpx;
          color:#999;
        }
      }
      .count {
        font-size: 24rpx;
        color: #999;
      }
    }
    .btn {
      position: relative;
      width: 175rpx;
      margin-left: 20rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #ef1612;
      text-align: center;
      &:after {
        content: '';
        top: 50%;
        margin-top: -44rpx;
        position: absolute;
        width: 1px;
        height: 88rpx;
        background: #d8d8d8;
      }
      .coupon-btn {
        width:120rpx;
        height:48rpx;
        line-height:48rpx;
        background-image:linear-gradient(90deg,#ff7226 0%,#ef1612 100%);
        border-radius:200rpx;
        font-size:24rpx;
        color:#fff;
        margin: 20rpx auto;
      }
    }
  }
</style>
