<template>
  <div class="container">
    <div class="cat-sort">
      <sort :sort="dataSearch.sort_type" @changeSort="changeSort"></sort>
    </div>
    <div class="wrap">
      <div class="list-wrap" v-if="!showEmpty">
        <div class="product-list">
          <product-item v-for="(item, index) in products" :item="item" :key="index"></product-item>
        </div>
        <load-more :has-more="hasMore" :is-loading="isRequesting"></load-more>
      </div>
      <data-none v-else=""></data-none>
    </div>
  </div>
</template>

<script>
  import sort from '../components/sort';
  import productItem from '../components/productItem-2';
  import loadMore from '../components/loadMore';
  import dataNone from '../components/dataNone';
  import { getQuery, getPrice } from '../utils';
  import * as service from '../services/product';

  export default {
    name: 'products',
    components: {
      sort,
      productItem,
      loadMore,
      dataNone
    },
    data () {
      return {
        title: '',
        products: [],
        showEmpty: false,
        hasMore: true,
        isRequesting: false,
        dataSearch: {
          type: 'pdd.ddk.goods.search',
          cat_id: '',
          with_coupon: true,
          sort_type: 0,
          page_size: 20,
          page: 1
        }
      }
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
            this.haveGoods = this.products.length > 0;
          }
        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
        this.showEmpty = this.products.length === 0;
      },
      changeSort (key) {
        this.dataSearch.sort_type = key;
        this.dataSearch.page = 1;
        this.products = [];
        this.showEmpty = false;
        this.hasMore = true;
        this.isRequesting = false;
        this.getList();
      },
      getInit () {
        this.title = '';
        this.products = [];
        this.showEmpty = false;
        this.hasMore = true;
        this.isRequesting = false;
        this.dataSearch = {
          type: 'pdd.ddk.goods.search',
          cat_id: '',
          with_coupon: true,
          sort_type: 0,
          page_size: 20,
          page: 1
        }
      }
    },
    onLoad () {
      const options = getQuery();
      this.getInit();
      this.dataSearch.cat_id = options.catId * 1;
      this.title = decodeURIComponent(options.catName);
      wx.setNavigationBarTitle({
        title: this.title
      });
      this.getList();
    },
    onReachBottom () {
      if (this.hasMore && !this.isRequesting) {
        this.getList();
      }
    }
  }
</script>

<style scoped lang="less">
  .container {
    .cat-sort {
      position: fixed;
      left: 0;
      width: 750rpx;
      height: 80rpx;
    }
    .product-list {
      padding: 20rpx 30rpx 0;
      overflow: hidden;
    }
    .wrap {
      padding-top: 80rpx;
    }
  }
</style>
