<template>
  <div class="col-2 product-item" @tap="goDetail(item.goods_id)">
    <div class="img">
      <img :src="item.goods_thumbnail_url" alt="">
    </div>
    <div class="info">
      <div class="name">{{item.goods_name}}</div>
      <div class="price-all-view flex justify-between">
        <div>
          <text class="price">¥{{item.source_price}}</text>
          <text class="old-price">¥{{item.min_group_price}}</text>
        </div>
        <div class="count">销量{{item.sold_quantity}}</div>
      </div>
    </div>
    <div class="coupon-wrap flex items-center" v-if="item.coupon_discount > 0">
      <span class="coupon">{{item.coupon_discount}} 元</span>
      <span>优惠券</span>
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
  }
</script>

<style lang="less">
  @import "../less/main";
  .product-item {
    float: left;
    width: 324rpx;
    height: 524rpx;
    margin: 0 10rpx 40rpx;
    border-radius: 10rpx;
    background: #fff;
    overflow: hidden;
    .img {
      width: 324rpx;
      height: 324rpx;
      margin-bottom: 10rpx;
      image {
        width: inherit;
        height: inherit;
        border-radius: 10rpx 10rpx 0 0;
      }
    }
    .info {
      padding: 0 10rpx;
      .name {
        margin-bottom: 20rpx;
        font-size: @fontSize;
        color: @fontColor;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
      }
      .price-all-view {
        height: 30rpx;
        line-height: 30rpx;
        margin-bottom: 10rpx;
        .price {
          font-size: 32rpx;
          color: @themeColor;
          margin-right: 12rpx;
        }
        .old-price {
          text-decoration: line-through;
          font-size: 20rpx;
          color: #999;
        }
        .count {
          font-size: 20rpx;
          color: #999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .coupon-wrap {
      width:100%;
      height:54rpx;
      line-height: 54rpx;
      padding-left: 20rpx;
      font-size: 20rpx;
      color: #fff;
      margin:auto;
      background:url('https://video.m.kuosanyun.com/h137762673h.png') no-repeat;
      background-size:100%;
      .coupon {
        font-size: 28rpx;
        margin-right: 10rpx;
      }
    }
  }
</style>
