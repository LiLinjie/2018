<template>
  <div class="container">
    <div class="search-top">
      <div class="search-bar flex">
        <div class="search-form flex items-center">
          <i class="iconfont icon-sousuo-"></i>
          <input confirm-type="search" @confirm="searchComfirm" @input="keyInput" placeholder="粘贴宝贝标题，先领券再购物" :value="dataSearch.keyword">
          <div class="delete" @tap="clearKeyword"><i class="iconfont icon-clear"></i></div>
        </div>
        <div class="search-btn" @tap="searchComfirm">搜索</div>
      </div>
      <sort :sort="dataSearch.sort_type" @changeSort="changeSort" v-if="haveGoods"></sort>
    </div>
    <div class="list-wrap" v-if="!showEmpty">
      <div class="keyword-wrap" v-if="!haveGoods">
        <div class="history-list" v-if="history.length">
          <div class="title flex">
            <div class="flex-1"><i class="iconfont icon-zuijin"></i>最近搜索</div>
            <div class="clear" @tap="clearHistory"><i class="iconfont icon-clear1"></i></div>
          </div>
          <div class="list flex items-center flex-wrap">
            <div class="item" v-for="(item, index) in history" v-if="index < 10" :key="index" @tap="changeSearch(item)">
              {{item}}
            </div>
          </div>
        </div>
        <div class="hot-list" v-if="keyWords.length">
          <div class="title"><i class="iconfont icon-remen-copy"></i>热门推荐</div>
          <div class="list flex items-center flex-wrap">
            <div class="item" v-for="(item, index) in keyWords" v-if="index < 20" :key="index" @tap="changeSearch(item)">
              {{item}}
            </div>
          </div>
        </div>
      </div>
      <block v-else="">
        <div class="search-list">
          <productItem v-for="(item, index) in products" :item="item" :key="index"></productItem>
        </div>
        <load-more :has-more="hasMore" :is-loading="isRequesting"></load-more>
      </block>
    </div>
    <data-none v-else=""></data-none>
  </div>
</template>

<script>
  import sort from '../components/sort';
  import productItem from '../components/productItem-1';
  import loadMore from '../components/loadMore';
  import dataNone from '../components/dataNone';
  import { getQuery, getPrice } from '../utils';
  import * as service from '../services/product';

  export default {
    name: "search",
    components: {
      sort,
      productItem,
      loadMore,
      dataNone
    },
    data () {
      return {
        title: '搜索',
        isFocus: true,
        products: [],
        showEmpty: false,
        hasMore: true,
        isRequesting: false,
        haveGoods: false,
        dataSearch: {
          type: 'pdd.ddk.goods.search',
          keyword: '',
          page_size: 20,
          page: 1,
          sort_type: 0
        },
        history: [],
        keyWords: []
      }
    },
    methods: {
      searchComfirm () {
        this.dataSearch.page = 1;
        this.products = [];
        this.hasMore = true;
        this.isRequesting = false;
        this.products = [];
        this.getList();
      },
      keyInput (e) {
        this.dataSearch.keyword = e.target.value;
      },
      setStorage () {
        let arr = [];
        null === wx.getStorageSync('mySearch') || '' === wx.getStorageSync('mySearch')
          ? arr.push(this.dataSearch.keyword)
          : (arr = wx.getStorageSync('mySearch')).splice(0, 0, this.dataSearch.keyword)
        arr = [].concat(...new Set(arr));
        wx.setStorageSync('mySearch', arr);
        this.history = arr;
      },
      async getList () {
        if (this.dataSearch.keyword) {
          this.setStorage();
          this.haveGoods = true;
          if (this.hasMore && !this.isRequesting) {
            this.isRequesting = true;
            const res = await service.getProduct({
              ...this.dataSearch,
              keyword: this.dataSearch.keyword === '全部商品' ? '' : this.dataSearch.keyword
            });
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
            }
          } else {
            wx.showToast({
              title: '获取数据失败',
              icon: 'none'
            });
          }
          this.showEmpty = this.products.length === 0;
        }
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
      changeSearch (item) {
        this.getInit();
        this.dataSearch.keyword = item;
        this.getList();
      },
      async getHot () {
        const res = await service.getHot();
        if (res.status === 1) {
          this.keyWords = res.data.words;
        }
      },
      getInit () {
        this.products = [];
        this.showEmpty = false;
        this.hasMore = true;
        this.isRequesting = false;
        this.haveGoods = false;
        this.dataSearch = {
          type: 'pdd.ddk.goods.search',
          keyword: '',
          page_size: 20,
          page: 1,
          sort_type: 0
        }
      },
      clearHistory () {
        this.history = [];
        wx.setStorageSync('mySearch', this.history);
      },
      clearKeyword () {
        this.dataSearch.keyword = '';
        this.haveGoods = false;
        this.history = wx.getStorageSync('mySearch');
      }
    },
    onLoad () {
      const options = getQuery();
      this.getInit();
      this.haveGoods = options.keyword;
      this.history = wx.getStorageSync('mySearch');
      this.getHot();
    },
    mounted () {
      const options = getQuery();
      this.dataSearch.keyword = options.keyword || '';
      this.isFocus = !options.keyword;
      if (options.keyword) {
        this.getList();
      }
    },
    onReachBottom () {
      if (this.hasMore && !this.isRequesting) {
        this.getList();
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../less/main";
  .container {
    .search-top {
      position: fixed;
      left: 0;
      width: 750rpx;
      z-index: 100;
      .search-bar {
        height: 100rpx;
        padding: 20rpx;
        background: @themeColor;
        .search-form {
          width: 580rpx;
          height: 60rpx;
          background: #fff;
          .iconfont {
            font-size: 30rpx;
            margin-left: 20rpx;
            color: @fontColor2;
          }
          input {
            margin-left: 10rpx;
            width: 450rpx;
            height: 40rpx;
            font-size: 28rpx;
            color: #333;
          }
        }
        .search-btn {
          margin-left: 10rpx;
          width: 120rpx;
          height: 60rpx;
          font-size: 28rpx;
          line-height: 60rpx;
          color: #fff;
          text-align: center;
        }
      }
    }
    .keyword-wrap {
      position: relative;
      top: 100rpx;
      .title {
        height:80rpx;
        line-height: 80rpx;
        font-size:24rpx;
        padding: 0 20rpx;
        color:@fontColor2;
        .iconfont {
          margin-right: 10rpx;
        }
        .clear {
          .iconfont {
            font-size: 30rpx;
            margin-right: 0;
          }
        }
      }
      .list {
        .item {
          height:60rpx;
          min-width:100rpx;
          max-width: 300rpx;
          padding:0 30rpx;
          margin:0 0 20rpx 20rpx;
          line-height:60rpx;
          text-align:center;
          font-size:28rpx;
          color:#333;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          border-radius:100rpx;
          background:#efefef;
        }
      }
    }
    .search-list {
      position: relative;
      padding-top: 180rpx;
    }
  }
</style>
