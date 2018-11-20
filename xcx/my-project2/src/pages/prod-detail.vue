<template>
  <div class="container">
    <!--<loading v-if="isLoading"></loading>-->
    <div class="pro-detail-wrap">
      <pageHeader isBack="true" :isAmimate="isHideTitleBar" :isHideTitleBar="isHideTitleBar"></pageHeader>
      <swiper circular="true" class="swiper" duration="500" indicatorDots="true">
        <swiper-item v-if="index < 3" v-for="(item, index) in goodsInfo.goods_gallery_urls" :key="index">
          <image class="slide-image" :src="item"></image>
        </swiper-item>
      </swiper>
      <div class="intro-box">
        <div class="intro-price flex justify-between">
          <div class="flex items-center">
            <span class="price">¥{{goodsInfo.price_first}}<span class="small">.{{goodsInfo.price_last}}</span></span>
            <span class="old-price">¥{{goodsInfo.source_price}}</span>
          </div>
          <div class="count">销量:{{goodsInfo.sold_quantity}}</div>
        </div>
        <div class="prod-name flex items-center">
          <div class="flex-1">
            <text class="tip">拼多多</text>
            <text>{{goodsInfo.goods_name}}</text>
          </div>
          <div class="share-btn flex flex-column justify-center items-center">
            <image src="https://video.m.kuosanyun.com/hjshdjajdjha.png"></image>
            <text>赚钱</text>
          </div>
        </div>
        <div class="coupon-btn flex items-center">
          <div class="flex-1">
            <span class="price">{{goodsInfo.coupon_discount}}元</span>券 + <span class="price">元</span>返利
          </div>
        </div>
      </div>
      <div class="store-tip flex">
        <div class="flex-1 flex items-center">
          <image src="/static/images/IntroIcon/rightIcon.png"></image>
          <text>全场包邮</text>
        </div>
        <div class="flex-1 flex items-center">
          <image src="/static/images/IntroIcon/rightIcon.png"></image>
          <text>正品保证</text>
        </div>
        <div class="flex-1 flex items-center">
          <image src="/static/images/IntroIcon/rightIcon.png"></image>
          <text>48小时发货</text>
        </div>
        <div class="flex-1 flex items-center">
          <image src="/static/images/IntroIcon/rightIcon.png"></image>
          <text>售后补贴</text>
        </div>
      </div>
      <div class="comment-list-wrap" v-if="false">
        <div class="title">商品评价</div>
        <div class="comment-list">
          <div v-for="(item, index) in commentList" :key="index">
            <div>{{item}}</div>
          </div>
        </div>
      </div>
      <div class="intro-content">
        <div class="title">商品详情</div>
        <div class="prod-desc" v-if="goodsInfo.goods_desc">
          <div class="tip">商品介绍</div>
          <text>{{goodsInfo.goods_desc}}</text>
        </div>
        <div class="prod-imgs">
          <image class="image" mode="widthFix" :src="item" v-for="(item, index) in goodsInfo.goods_gallery_urls" :key="index"></image>
        </div>
      </div>
      <div class="more-products-box" v-if="false">
        <div class="more-prod-title">
          九块九
          <div class="more">
            <text>更多</text>
            <image src="/static/images/IntroIcon/arrow.png"></image>
          </div>
        </div>
        <scroll-view scrollX class="moreGoodsListBox">
          <view catchtap="toGoodsIntro" class="moreGoodsList" v-for="(items, index) in ExplosiveGoods" :key="index">
            <image class="goods_thumbnail_url" :src="items.goods_thumbnail_url"></image>
            <view class="moreGoodsListGoodsName">{{items.goods_name}}</view>
            <view class="moreGoodsListGoodsPrice">
              <text class="min_group_price_first">¥ {{items.min_group_price_first}}</text>
              <text class="min_group_price_last">.{{items.min_group_price_last}} </text>
              <text class="source_price">  ¥{{items.source_price}}</text>
            </view>
            <view class="moreGoodsListSoldQuantity">销量:{{items.sold_quantity}}</view>
          </view>
        </scroll-view>
      </div>
      <div class="footer flex">
        <div class="home-btn flex flex-column justify-center items-center">
          <image class="collectIcon" src="/static/images/IntroIcon/home.png"></image>
          <text>商城首页</text>
        </div>
        <div class="btns flex flex-1 justify-around" v-if="!userInfo">
          <button class="btn">直接购买</button>
          <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">会员购买</button>
        </div>
        <div class="btns flex flex-1 justify-around" v-else>
          <button class="btn">直接购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pageHeader from '../components/page-header';
  import loading from '../components/loading';
  import * as prodService from '../services/product';
  import { getQuery, getPrice } from '../utils';
  import config from '../config';
  import { getSetting} from "../utils";

  export default {
    name: "pro-detail",
    compnents: {
      pageHeader,
      loading
    },
    data () {
      return {
        isLoading: true,
        goodsInfo: {},
        commentList: [],
        id: '',
        userInfo: ''
      }
    },
    methods: {
      back () {
        wx.navigateBack({
          delta: 1
        });
      },
      getUserInfo (e) {
        this.userInfo = e.mp.detail.userInfo;
        console.log(this.userInfo);
      },
      async getDetail () {
        const res = await prodService.getProduct({
          type: 'pdd.ddk.goods.detail',
          goods_id_list: JSON.stringify([this.id]),
          timestamp: 1538192454,
          sign:'28A8031B3C6E9DD596F94D5417D953A0'
        });
        const goodsInfo = res.goods_detail_response.goods_details[0];
        const groupPrice = getPrice(goodsInfo.min_group_price);
        goodsInfo.price_first = groupPrice.split('.')[0];
        goodsInfo.price_last = groupPrice.split('.')[1];
        goodsInfo.source_price = getPrice(goodsInfo.min_group_price);
        goodsInfo.coupon_discount = getPrice(goodsInfo.coupon_discount, 0);
        this.goodsInfo = goodsInfo;
      }
    },
    mounted () {
      const options = getQuery();
      this.id = options.id;
      getSetting((res) => {
        this.userInfo = res.userInfo;
        console.log(this.userInfo);
        this.getDetail();
      });
    }
  };
</script>

<style scoped lang="less">
  @import "../less/main";
.pro-detail-wrap {
  padding-bottom: 100rpx;
  .swiper {
    width: 100%;
    height: 800rpx;
    image {
      width: 100%;
      height: 800rpx;
    }
  }
  .intro-box {
    padding-bottom: 30rpx;
    margin-bottom: 20rpx;
    background: #fff;
    .intro-price {
      height: 92rpx;
      line-height: 92rpx;
      padding: 0 30rpx;
      color: #999;
      font-size: 24rpx;
      .price {
        font-size: 48rpx;
        color: @themeColor;
        font-weight: 500;
      }
      .old-price {
        text-decoration: line-through;
        margin-left: 10rpx;
      }
    }
    .prod-name {
      position: relative;
      font-size:32rpx;
      padding:0 0 0 30rpx;
      color:#333;
      .tip {
        /*width:90rpx;*/
        /*height:40rpx;*/
        line-height:40rpx;
        font-size:24rpx;
        color:#fff;
        border-radius:4rpx;
        padding:4rpx 10rpx;
        font-weight:500;
        background-image:linear-gradient(90deg,#ff7226 0%,#ef1612 100%);
        margin-right:20rpx;
      }
      .share-btn {
        width: 100rpx;
        font-size: 20rpx;
        color: @themeColor;
        text-align: center;
        image {
          width: 30rpx;
          height: 30rpx;
          margin-bottom: 10rpx;
        }
      }
    }
    .coupon-btn {
      width: 690rpx;
      height:140rpx;
      padding-right: 284rpx;
      color: #fff;
      text-align: center;
      font-size: 24rpx;
      margin: 26rpx auto 0;
      background:url('https://video.m.kuosanyun.com/jjjj23123.png') no-repeat;
      background-size:100%;
      .price {
        font-size: 40rpx;
      }
    }
  }
  .store-tip {
    height: 74rpx;
    margin-bottom: 20rpx;
    padding: 0 30rpx;
    background: #fff;
    font-size: 24rpx;
    color: @fontColor;
    line-height: 74rpx;
    image {
      width: 20rpx;
      height: 20rpx;
      margin-right: 10rpx;
    }
  }
  .intro-content {
    background: #fff;
    .prod-imgs {
      width: 100%;
      image {
        max-width: 100%;
        margin: 0 auto;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: #fff;
    box-shadow:0 -1px 1px 0 rgba(51,51,51,0.10);
    .home-btn {
      width: 100rpx;
      height: 100rpx;
      font-size:20rpx;
      color:#444;
      margin-top:6rpx;
      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
}
</style>
