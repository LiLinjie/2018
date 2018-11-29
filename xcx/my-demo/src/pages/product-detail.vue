<template>
  <div :class="{container: true, 'is-x': systemInfo.isX}">
    <div class="pro-detail-wrap">
      <Loading v-if="isLoading"></Loading>
      <block v-else="">
        <swiper class="swiper" indicatorDots="true" indicatorColor="#d8d8d8" indicator-active-color="#ef1612" circular="true">
          <swiper-item v-if="index < 3" v-for="(item, index) in goodsInfo.goods_gallery_urls" :key="index">
            <image class="slide-image" :src="item" mode="aspectFill"></image>
          </swiper-item>
        </swiper>
        <div class="intro-box">
          <div class="intro-price flex justify-between">
            <div class="flex items-center">
              <div class="price">券后价<span class="RMB">¥</span><span class="big">{{goodsInfo.price_first}}</span><span class="small">.{{goodsInfo.price_last}}</span></div>
              <div class="old-price">¥{{goodsInfo.source_price}}</div>
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
              <text>分享</text>
              <button open-type="share"></button>
            </div>
          </div>
          <div class="coupon-btn flex items-center" target="miniProgram" v-if="goodsInfo.coupon_discount > 0">
            <div class="flex-1 flex justify-center items-center">
              <div>
                <span class="price">{{goodsInfo.coupon_discount}}元 </span>券
              </div>
            </div>
            <button @tap="jumpToMiniPro"></button>
          </div>
        </div>
        <div class="store-tip flex">
          <div class="flex-1 flex items-center">
            <i class="iconfont icon-1"></i>
            <text>全场包邮</text>
          </div>
          <div class="flex-1 flex items-center">
            <i class="iconfont icon-1"></i>
            <text>正品保证</text>
          </div>
          <div class="flex-1 flex items-center">
            <i class="iconfont icon-1"></i>
            <text>48小时发货</text>
          </div>
          <div class="flex-1 flex items-center">
            <i class="iconfont icon-1"></i>
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
            <div class="desc">
              <text>{{goodsInfo.goods_desc}}</text>
            </div>
          </div>
          <div class="prod-imgs">
            <image class="image" mode="widthFix" :src="item" v-for="(item, index) in goodsInfo.goods_gallery_urls" :key="index"></image>
          </div>
        </div>
        <div class="footer flex items-center">
          <div class="home-btn flex flex-column justify-center items-center" @tap="toHome">
            <i class="iconfont icon-home"></i>
            <text>商城首页</text>
          </div>
          <div class="btns flex flex-1 justify-around items-center">
            <button class="btn flex-1 flex justify-center items-center" @tap="jumpToMiniPro">
              <span class="price">
                <span v-if="goodsInfo.coupon_discount > 0">
                  <span class="big">{{goodsInfo.coupon_discount}}元</span>
                  券</span>
              </span>
              <span class="txt">去拼多多购买</span>
            </button>
          </div>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
  import Loading from '../components/loading';
  import * as prodService from '../services/product';
  import { getQuery, getPrice } from '../utils';
  import { DEFAULT_PDD_PID } from '../constants';
  import config from '../config';

  export default {
    name: "product-detail",
    components: {
      Loading
    },
    data () {
      return {
        systemInfo: {},
        isLoading: true,
        goodsInfo: {},
        commentList: [],
        id: '',
        isHideTitleBar: true,
        miniProName: config.miniProName,
        isShowReg: false,
        isShowShareModal: false,
        appId: '',
        path: '',
        goodsPriceRate: 0,
        totalPrice: 0,
        subRatePrice: 0
      }
    },
    methods: {
      async getDetail () {
        const res = await prodService.getProduct({
          type: 'pdd.ddk.goods.detail',
          goods_id_list: JSON.stringify([this.id])
        });
        if (res.goods_detail_response && res.goods_detail_response.goods_details) {
          const goodsInfo = res.goods_detail_response.goods_details[0];
          const price = goodsInfo.min_group_price - goodsInfo.coupon_discount;
          const groupPrice = getPrice(price);
          const goodsRate = price * goodsInfo.promotion_rate;
          goodsInfo.price_first = groupPrice.split('.')[0];
          goodsInfo.price_last = groupPrice.split('.')[1];
          goodsInfo.source_price = getPrice(goodsInfo.min_group_price);
          goodsInfo.min_group_price = groupPrice;
          goodsInfo.coupon_discount = getPrice(goodsInfo.coupon_discount, 0);
          // this.goodsPriceRate = goodsRate;
          this.goodsInfo = goodsInfo;
          this.isLoading = false;
        } else {
          wx.showToast({
            title: '获取商品详情数据失败',
            icon: 'none'
          });
        }
      },
      async jumpToMiniPro () {
        if (this.id) {
          let pid = DEFAULT_PDD_PID;
          const res = await prodService.getProduct({
            type: 'pdd.ddk.goods.promotion.url.generate',
            p_id: pid,
            goods_id_list: JSON.stringify([this.id]),
            generate_short_url: true,
            generate_we_app: true
          });
          if (res.goods_promotion_url_generate_response &&
            res.goods_promotion_url_generate_response.goods_promotion_url_list &&
            res.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info) {
            const appInfo = res.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info;
            this.appId = appInfo.app_id;
            this.path = appInfo.page_path;
            wx.navigateToMiniProgram({
              appId: this.appId,
              path: this.path
            });
          }
        }
      },
      toHome () {
        wx.switchTab({
          url: '/pages/mall'
        })
      },
      getInit () {
        this.isLoading = true;
        this.goodsInfo = {};
        this.id = '';
        this.isHideTitleBar = true;
        this.isShowReg = false;
        this.isShowShareModal = false;
        this.appId = '';
        this.path = '';
        this.goodsPriceRate = 0;
        this.totalPrice = 0;
        this.subRatePrice = 0;
      }
    },
    onLoad () {
      this.getInit();
      const options = getQuery();
      this.id = options.productId;
      this.getDetail();
    },
    onShareAppMessage () {

    }
  };
</script>

<style scoped lang="less">
  @import "../less/main";
  .container {
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
            font-size: 20rpx;
            color: @themeColor;
            .RMB {
              margin-left: 10rpx;
              font-size: 30rpx;
            }
            .big {
              font-size: 48rpx;
              font-weight: 500;
            }
            .small {
              font-size: 32rpx;
            }
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
            position: relative;
            width: 100rpx;
            font-size: 20rpx;
            color: @themeColor;
            text-align: center;
            image {
              width: 30rpx;
              height: 30rpx;
              margin-bottom: 10rpx;
            }
            button {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              opacity: 0;
            }
          }
        }
        .coupon-btn {
          position: relative;
          width: 690rpx;
          height:140rpx;
          padding-right: 284rpx;
          color: #fff;
          text-align: center;
          font-size: 24rpx;
          margin: 26rpx auto 0;
          background:url('http://img-cows.kkkd.com/Fk61MUnc1SVgkgWAXIClqmIq-ssx') no-repeat;
          background-size:100%;
          .price {
            font-size: 40rpx;
          }
          button, navigator {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            opacity: 0;
          }
        }
      }
      .store-tip {
        height: 74rpx;
        padding: 0 30rpx;
        background: #fff;
        color: @fontColor;
        line-height: 74rpx;
        .iconfont {
          font-size: 22rpx;
          font-weight: bold;
          margin-right: 10rpx;
          color: @themeColor;
        }
        div {
          font-size: 24rpx;
        }
      }
      .intro-content {
        .title {
          height:60rpx;
          padding-left: 30rpx;
          line-height:60rpx;
          font-size:24rpx;
          color:#999;
          background:#f6f6f6;
        }
        .prod-desc {
          padding: 20rpx 30rpx;
          background:#fff;
          .tip {
            font-size: 28rpx;
            color: @themeColor;
          }
        }
        .prod-imgs {
          width: 100%;
          background:#fff;
          image {
            width: 100%;
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
          margin: 0 10rpx;
          .iconfont {
            font-size: 38rpx;
            font-weight: bold;
          }
        }
        .btns {
          width:580rpx;
          .btn {
            height:80rpx;
            line-height: 1;
            margin: 0 10rpx;
            text-align:center;
            background-image:linear-gradient(180deg,#fcf267 11%,#fed334 100%);
            border-radius:20rpx;
            font-size:32rpx;
            color:#ef1612;
            font-weight:500;
            .txt {
              width: 210rpx;
              height: 56rpx;
              line-height: 56rpx;
              margin-left: 50rpx;
              border-radius:200rpx;
              font-weight: bold;
            }
            .price {
              font-size: 24rpx;
              .big {
                font-size: 32rpx;
                margin-right: 10rpx;
              }
            }
            &:last-child {
              color: #fff;
              background-image:linear-gradient(90deg,#ff7226 0%,#ef1612 100%);
            }
            .tip {
              display: block;
              margin-top: 6rpx;
              font-size: 22rpx;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
