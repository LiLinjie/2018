<template>
  <div class="container">
    <pageHeader :title="title" is-back="true"></pageHeader>
    <div class="search-top">
      <div class="search-bar flex">
        <div class="search-form flex items-center">
          <image class="search-img" src="/static/images/tyqSearch.png"></image>
          <input type="search" @confirm="keyConfirm" @input="keyInput" :focus="isFocus" placeholder="粘贴宝贝标题，先领券再购物" :value="keyword">
          <div class="delete"></div>
        </div>
        <div class="search-btn">搜索</div>
      </div>
      <sort></sort>
    </div>
    <div class="search-list">
      <productItem v-for="(item, index) in products" :item="item" :key="index"></productItem>
    </div>
  </div>
</template>

<script>
  import pageHeader from '../components/page-header';
  import sort from '../components/sort';
  import productItem from '../components/productItem-1';
  import { getSetting, getQuery } from "../utils";
  import * as service from '../services/product';

  export default {
    name: "search",
    components: {
      pageHeader,
      sort,
      productItem
    },
    data () {
      return {
        title: '搜索',
        keyword: '',
        isFocus: true,
        products: []
      }
    },
    mounted () {
      const options = getQuery();
      this.keyword = options.keyword;
      this.isFocus = !options.keyword;
      this.getList();
    },
    methods: {
      keyConfirm (e) {

      },
      keyInput (e) {

      },
      async getList () {
        const res = await service.getProduct({
          timestamp: 1538222027,
          type: 'pdd.ddk.goods.search',
          keyword: this.keyword,
          page_size: 20,
          page: 1,
          sort_type: 0,
          sign: '2655FF2D40606F5378A1FB1FCB9FECE3'
        });
        this.products = this.products.concat(res.goods_search_response.goods_list);
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
        .search-img {
          width: 30rpx;
          height: 30rpx;
          margin-left: 20rpx;
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
  .search-list {
    position: relative;
    top: 180rpx;
  }
}
</style>
