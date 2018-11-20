<template>
  <div class="container">
    <swiper autoplay="false" circular="true" class="swiper-banner" indicatorDots="false" interval="3000">
      <swiper-item catchtap="goToSwiperDetail" class="titleBar" v-for="(item, index) in swiperData" :key="index">
        <!--<form bindsubmit="postFormID" reportSubmit="true">
          <button class="postFormID" formType="submit">
          </button>
        </form>-->
        <image class="banner" mode="widthFix" :src="item.image_url"></image>
        <text class="titleBarTop"></text>
      </swiper-item>
    </swiper>
    <div class="discount-entry flex justify-around items-center">
      <div class="item flex-1 flex flex-column items-center justify-around" v-for="(item, index) in discountEntry" :key="index">
        <image :src="item.image_url" mode="widthFix"></image>
        <p>{{item.title}}</p>
      </div>
    </div>
    <div class="entry-box">
      <div class="flex">
        <div class="entry-left flex-1">
          <div class="entry-title flex flex-column justify-center">
            <div class="top flex items-center">
              <img src="https://video.m.kuosanyun.com/1.9yyysds.png" alt="" class="icon">
              <text>1.9包邮</text>
            </div>
            <p class="desc">全民疯抢 低价包邮</p>
          </div>
          <div class="entry-img flex justify-around">
            <image src="http://t00img.yangkeduo.com/goods/images/2018-09-19/6e68850943a9e169a9466a7de30b8712.jpeg"></image>
            <image src="http://t00img.yangkeduo.com/goods/images/2018-07-24/1e440fcd35ab4b864a14809b7142fa0e.jpeg"></image>
          </div>
        </div>
        <div class="entry-right flex-1 flex flex-column">
          <div class="flex-1">
            <div class="entry-title flex flex-column justify-center">
              <div class="top flex items-center">
                <img src="https://video.m.kuosanyun.com/ada1313d.png" alt="" class="icon">
                <text>品牌优惠</text>
              </div>
              <p class="desc">物美价廉 超低折扣</p>
            </div>
          </div>
          <div class="flex-1">
            <div class="entry-title flex flex-column justify-center">
              <div class="top flex items-center" @tap="toRank">
                <img src="https://video.m.kuosanyun.com/ppppsdsaa.png" alt="" class="icon">
                <text>排行榜</text>
              </div>
              <p class="desc">看看大家都在买什么</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="theme-entry">
      <swiper autoplay="true" circular="true" interval="5000">
        <swiper-item>
          <image class="theme_bg" mode="aspectFill" src="https://video.m.kuosanyun.com/1232jjj.png"></image>
        </swiper-item>
        <swiper-item>
          <image class="theme_bg" mode="aspectFill" src="https://video.m.kuosanyun.com/Bitmap.png?v1"></image>
        </swiper-item>
        <swiper-item>
          <image class="theme_bg" mode="aspectFill" src="https://video.m.kuosanyun.com/jskdjskadk.png"></image>
        </swiper-item>
      </swiper>
    </div>
    <div class="tab-box">
      <div class="scroll-view-title-box flex items-center">
        <scroll-view class="scroll-view-title" scrollX="true">
          <div :class="{'tab-item': true, active: sort.flag}" v-for="(sort, index) in sortTitleArr" :key="index" @tap="changeTab(index)">
            <text class="txt">{{sort.text}}</text>
          </div>
        </scroll-view>
        <view class="column_line"></view>
        <view bindtap="showSelect1" class="scroll_select flex items-center justify-center">
          <image src="https://video.m.kuosanyun.com/scroll_select.png"></image>
        </view>
        <view class="hide_select" v-if="newSelect1">
          <view catchtap="checkSort" class="selcet_line" data-sort-id="20">
            <image src="https://video.m.kuosanyun.com/scroll_ping.png"></image>
            <!--<text class="{{sort==20?'select':''}}">按好评排序</text>-->
          </view>
          <view catchtap="checkSort" class="selcet_line" data-sort-id="6">
            <image src="https://video.m.kuosanyun.com/scroll_quanlity.png"></image>
            <!--<text class="{{sort==6?'select':''}}">按销量排序</text>-->
          </view>
          <view catchtap="checkSort" class="selcet_line">
            <image src="https://video.m.kuosanyun.com/scroll_price.png"></image>
            <!--<text class="{{sort==3?'select':''}}">按价格排序</text>-->
          </view>
        </view>
        <view catchtap="hideSelect1" class="select_mask" v-if="newSelect1"></view>
      </div>
    </div>
    <div class="title-bar-show" v-show="!isHideTitleBar">
      <div class="title-bar-top"></div>
      <div class="title-bar-name">悦惠-乐享生活</div>
      <div class="tab-box">
        <div class="scroll-view-title-box flex items-center">
          <scroll-view class="scroll-view-title" scrollX="true">
            <div :class="{'tab-item': true, active: sort.flag}" v-for="(sort, index) in sortTitleArr" :key="index" @tap="changeTab(index)">
              <text class="txt">{{sort.text}}</text>
            </div>
          </scroll-view>
          <view class="column_line"></view>
          <view bindtap="showSelect2" class="scroll_select flex items-center justify-center">
            <image src="https://video.m.kuosanyun.com/scroll_select.png"></image>
          </view>
          <view class="hide_select" v-if="newSelect2">
            <view catchtap="checkSort" class="selcet_line" data-sort-id="20">
              <image src="https://video.m.kuosanyun.com/scroll_ping.png"></image>
              <text>按好评排序</text>
            </view>
            <view catchtap="checkSort" class="selcet_line" data-sort-id="6">
              <image src="https://video.m.kuosanyun.com/scroll_quanlity.png"></image>
              <text>按销量排序</text>
            </view>
            <view catchtap="checkSort" class="selcet_line">
              <image src="https://video.m.kuosanyun.com/scroll_price.png"></image>
              <text>按价格排序</text>
            </view>
          </view>
          <view catchtap="hideSelect2" class="select_mask" v-if="newSelect2"></view>
        </div>
      </div>
    </div>
    <div class="product-list">
      <product-item v-for="(item, index) in products" :item="item" :key="index"></product-item>
    </div>
  </div>
</template>

<script>
  import productItem from '../components/productItem-2';
  import * as prodService from '../services/product';

  export default {
    name: 'index',
    data () {
      return {
        isHideTitleBar: true,
        swiperData: [{
          image_url: '/static/images/1.jpg'
        }, {
          image_url: '/static/images/2.jpg'
        }, {
          image_url: '/static/images/3.jpg'
        }],
        discountEntry: [{
          image_url: 'https://video.m.kuosanyun.com/sc_home_sign2-min.png',
          title: '签到领钱'
        }, {
          image_url: 'https://video.m.kuosanyun.com/sc_home_jiang2-min.png',
          title: '每日开奖'
        }, {
          image_url: 'https://video.m.kuosanyun.com/sc_home_roll2-min.png',
          title: '抽现金'
        }, {
          image_url: 'https://video.m.kuosanyun.com/sc_home_article2-min.png',
          title: '热门导购'
        }],
        sortTitleArr: [ {
          text: '爆品',
          flag: !0,
          opt_id: ""
        }, {
          text: '精选',
          flag: !1,
          opt_id: ""
        }, {
          text: "美食",
          flag: !1,
          opt_id: "1"
        }, {
          text: "水果",
          flag: !1,
          opt_id: "13"
        }, {
          text: "女装",
          flag: !1,
          opt_id: "14"
        }, {
          text: "男装",
          flag: !1,
          opt_id: "743"
        }, {
          text: "美妆",
          flag: !1,
          opt_id: "16"
        }, {
          text: "运动",
          flag: !1,
          opt_id: "1451"
        }, {
          text: "母婴",
          flag: !1,
          opt_id: "4"
        }, {
          text: "电器",
          flag: !1,
          opt_id: "18"
        }, {
          text: "鞋包",
          flag: !1,
          opt_id: "1281"
        }, {
          text: "家装",
          flag: !1,
          opt_id: "1917"
        }, {
          text: "百货",
          flag: !1,
          opt_id: "15"
        } ],
        products: [],
        activeTabId: '',
        formData: {
          type: 'pdd.ddk.goods.search',
          sort_type: 0,
          keyword: '',
          with_coupon: true,
          page: 1,
          page_size: 20,
        }
      }
    },
    components: {
      productItem
    },
    methods: {
      async getList () {
        const res = await prodService.getProduct({
          type: 'pdd.ddk.goods.search',
          sort_type: 0,
          with_coupon: true,
          goods_id_list: JSON.stringify([]),
          timestamp: 1538188176,
          sign:'E6F2C1B251116F4226B3BF5054FE4B46'
        });
        this.products = this.products.concat(res.goods_search_response.goods_list);
      },
      changeTab (index) {
        for (let i in this.sortTitleArr) {
          this.sortTitleArr[i].flag = false;
        }
        this.sortTitleArr[index].flag = true;
        this.getList();
      },
      toRank () {
        wx.navigateTo({
          url: '/pages/rank'
        });
      }
    },
    onPageScroll (e) {
      const top = e.scrollTop;
      this.isHideTitleBar = top <= 490;
    },
    onShareAppMessage ({from}) {
      console.log(from);
      return {
        title: '悦惠-乐享生活',
        path: '/page/index'
      }
    },
    created () {
      this.getList();
    }
  }
</script>

<style scoped lang="less">
  @import "../less/main";
  .swiper-banner {
    height: 350rpx;
    width: 100%;
    swiper-item {
      width: 100%;
      height: 100%;
      image {
        width: 100%;
        height: 350rpx;
      }
    }
  }
  .discount-entry {
    height: 162rpx;
    padding: 10rpx 40rpx;
    margin: 0 auto;
    background: #f6f6f6;
    .item {
      width: 128rpx;
      height: 142rpx;
      font-size: 24rpx;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      image {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
      }
    }
  }
  .entry-box {
    width: 690rpx;
    height: 290rpx;
    margin: 0 auto 30rpx;
    background: #fff;
    border-radius: 8rpx;
    .entry-left {
      border-right: 1rpx solid #f6f6f6;
    }
    .entry-right {
      >.flex-1 {
        &:first-child {
          border-bottom: 1rpx solid #f6f6f6;
        }
      }
    }
    .entry-title {
      width: 284rpx;
      height: 145rpx;
      margin: 0 auto;
      font-size: 32rpx;
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
      .desc {
        font-size: 24rpx;
        color: #999;
        margin-top: 10rpx;
      }
    }
    .entry-img {
      image {
        width: 132rpx;
        height: 132rpx;
        margin: 0 10rpx;
        border-radius: 10rpx;
      }
    }
  }
  .theme-entry {
    height: 130rpx;
    margin-bottom: 20rpx;
    padding: 0 30rpx;
    background: #f6f6f6;
    swiper {
      width: 100%;
      height: 130rpx;
      image {
        width: 100%;
        height: 130rpx;
      }
    }
  }
  .tab-box {
    background: #fff;
    .scroll-view-title-box {
      height: 80rpx;
      position:relative;
      .scroll-view-title {
        display: inline-block;
        width: 662rpx;
        height: 80rpx;
        line-height: 80rpx;
        white-space: nowrap;
        .tab-item {
          position: relative;
          display: inline-block;
          margin-left: 34rpx;
          height: 100%;
          width: 88rpx;
          text-align: center;
          .txt {
            font-size: 28rpx;
            color: #333;
          }
          &.active {
            .txt {
              color: @themeColor;
              font-weight: 700;
            }
            &:after {
              content: '';
              position:absolute;
              height:6rpx;
              background: @themeColor;
              left:0rpx;
              right: 0;
              bottom:4rpx;
            }
          }
        }
      }
      .column_line {
        width:2rpx;
        height:38rpx;
        background:#d8d8d8;
        margin-top:10rpx;
      }
      .scroll_select {
        width: 86rpx;
        height: 80rpx;
        z-index: 998;
        image {
          width: 28rpx;
          height: 24rpx;
        }
      }
    }
  }
  .title-bar-show {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 750rpx;
    height: 122rpx;
    text-align: center;
    background: @themeColor;
    .title-bar-top {
      width: 100%;
      height: 50rpx;
    }
    .title-bar-name {
      width: 100%;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 34rpx;
      color: #fff;
    }
  }
  .product-list {
    padding: 40rpx 30rpx 0;
    overflow: hidden;
  }
</style>
