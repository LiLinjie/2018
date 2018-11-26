<template>
  <div class="container">
    <div class="search-bar-wrap">
      <div class="search-bar flex items-center" @tap="linkTo('/pages/search')">
        <i class="iconfont icon-sousuo-"></i>请输入您要搜索的宝贝
      </div>
    </div>
    <div class="swiper-wrap">
      <swiper class="swiper-banner"
              :current="current"
              indicatorDots="true" indicatorColor="#d8d8d8" indicator-active-color="#ef1612" circular="true"
              @change="swiperChange"
      >
        <swiper-item @tap.stop="linkTo(item.pageUrl, item.type)" class="titleBar" v-for="(item, index) in swiperData" :key="mall">
          <div class="img-bg" :style="{backgroundImage: 'url(' + item.image_url + ')'}"></div>
        </swiper-item>
      </swiper>
    </div>
    <div class="entry-box">
      <div class="flex">
        <div class="entry-left flex-1" @tap="linkTo('/pages/products?channel_type=0')">
          <div class="entry-title flex flex-column justify-center">
            <div class="top flex items-center">
              <img src="http://img-cows.kkkd.com/Fo4XV9eZwTYIxFt3d76PI_TuTaAE" alt="" class="icon">
              <text>9.9包邮</text>
            </div>
            <p class="desc">全民疯抢 低价包邮</p>
          </div>
          <div class="entry-img flex justify-around">
            <image v-if="index < 2" v-for="(item, index) in recommendList" :src="item.goods_thumbnail_url" :key="mall"></image>
          </div>
        </div>
        <div class="entry-right flex-1 flex flex-column">
          <div class="flex-1" @tap="linkTo('/pages/products?channel_type=2')">
            <div class="entry-title flex flex-column justify-center">
              <div class="top flex items-center">
                <img src="http://img-cows.kkkd.com/Fi6NQT18zmAxnrfVdRGsCszIgFAW" alt="" class="icon">
                <text>品牌特惠</text>
              </div>
              <p class="desc">物美价廉 超低折扣</p>
            </div>
          </div>
          <div class="flex-1" @tap="linkTo('/pages/rank', 'tabPage')">
            <div class="entry-title flex flex-column justify-center">
              <div class="top flex items-center">
                <img src="https://img-cows.kkkd.com/FiG1AvHk78dzTza5M94zQUrt3R4T" alt="" class="icon">
                <text>排行榜</text>
              </div>
              <p class="desc">看看大家都在买什么</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tab-bar :sort="dataSearch.sort_type" :opt-id="dataSearch.opt_id" @changeTab="changeTab" @changeSort="changeSort"></tab-bar>
    <div class="title-bar" v-if="!isHideTitleBar">
      <tab-bar :sort="dataSearch.sort_type" :opt-id="dataSearch.opt_id" @changeTab="changeTab" @changeSort="changeSort"></tab-bar>
    </div>
    <div class="product-list">
      <product-item v-for="(item, index) in products" :item="item" :key="mall"></product-item>
    </div>
  </div>
</template>

<script>
  import productItem from '../components/productItem-2';
  import tabBar from '../components/tabBar';
  import * as service from '../services/product';
  import {getPrice, linkTo} from '../utils'
  import config from '../config';

  export default {
    name: 'index',
    data () {
      return {
        isHideTitleBar: true,
        title: config.miniProName,
        swiperData: [{
          pageUrl: '/pages/products?channel_type=0',
          image_url: 'http://img-shop.kkkd.com/Fgo-GViux7Y9BkEK_YCZRh7FdHJs'
        }],
        products: [],
        activeTabId: '',
        hasMore: true,
        isRequesting: false,
        dataSearch: {
          type: 'pdd.ddk.goods.search',
          opt_id: '',
          with_coupon: true,
          sort_type: 0,
          page_size: 20,
          page: 1
        },
        recommendList: [],
        current: 0
      }
    },
    components: {
      productItem,
      tabBar
    },
    methods: {
      async getList () {
        if (this.hasMore && !this.isRequesting) {
          this.isRequesting = true;
          const res = await service.getProduct(this.dataSearch);
          if (res.goods_search_response && res.goods_search_response.goods_list) {
            const list = res.goods_search_response.goods_list;
            list.map(i => {
              let price = i.min_group_price - i.coupon_discount;
              i.source_price = getPrice(price);
              i.min_group_price = getPrice(i.min_group_price);
              i.coupon_discount = getPrice(i.coupon_discount, 0);
            });
            this.products = this.products.concat(list);
            this.hasMore = this.products.length < res.goods_search_response.total_count;
            this.dataSearch.page ++;
            this.isRequesting = false;
          } else {
            wx.showToast({
              title: '获取数据失败',
              icon: 'none'
            });
          }
        }
      },
      async getRecommend () {
        const res = await service.getProduct({
          type: 'pdd.ddk.goods.recommend.get',
          offset: 0,
          limit: 2,
          channel_type: 0
        });
        if (res.goods_basic_detail_response && res.goods_basic_detail_response.list) {
          this.recommendList = res.goods_basic_detail_response.list;
        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
      },
      changeTab (opt_id) {
        this.dataSearch.opt_id = opt_id;
        this.dataSearch.page = 1;
        this.products = [];
        this.hasMore = true;
        this.isRequesting = false;
        this.products = [];
        this.getList();
      },
      changeSort (key) {
        this.dataSearch.sort_type = key;
        this.dataSearch.page = 1;
        this.products = [];
        this.hasMore = true;
        this.isRequesting = false;
        this.products = [];
        this.getList();
      },
      getInit () {
        this.isHideTitleBar = true;
        this.products = [];
        this.hasMore = true;
        this.isRequesting = false;
        this.list = [];
        this.activeTabId = '';
        this.dataSearch = {
          type: 'pdd.ddk.goods.search',
          opt_id: '',
          with_coupon: true,
          sort_type: 0,
          page_size: 20,
          page: 1
        }
      },
      swiperChange (e) {
        this.current = e.target.current;
      },
      linkTo (url, type) {
        linkTo(url, type);
      }
    },
    onPageScroll (e) {
      const top = e.scrollTop;
      this.isHideTitleBar = top <= 400;
    },
    onLoad () {
      this.getInit();
      this.getList();
      this.getRecommend();
    },
    onReachBottom () {
      if (this.hasMore && !this.isRequesting) {
        this.getList();
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../less/main";
  .container {
    .title-bar {
      position: fixed;
      top: 0;
      z-index: 999;
      width: 750rpx;
    }
  }
  .search-bar-wrap {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 20rpx;
    height: 40px;
    width: 710rpx;
    .search-bar {
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      width: 710rpx;
      height: 60rpx;
      padding: 30rpx;
      border-radius: 60rpx;
      color: #fff;
      font-size: 24rpx;
      background: rgba(0, 0, 0, .2);
    }
    .iconfont {
      margin-right: 10rpx;
    }
  }
  .swiper-banner {
    height: 384rpx;
    width: 750rpx;
    margin-bottom: 20rpx;
    background: #e81a0f;
    swiper-item {
      width: 750rpx;
      height: 100%;
      .img-bg {
        width: 100%;
        height: 100%;
        background: no-repeat left bottom;
        background-size: 100%;
      }
      /*image {
        width: 100%;
        height: 384rpx;
      }*/
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
  .product-list {
    padding: 30rpx 30rpx 0;
    overflow: hidden;
  }
</style>
