<template>
  <div class="container">
    <div class="product-list-wrap" v-if="!showEmpty">
      <div class="product-list">
        <product-item v-for="(item, index) in products" :item="item" :key="index"></product-item>
      </div>
      <load-more :has-more="hasMore" :is-loading="isRequesting"></load-more>
    </div>
    <data-none v-else=""></data-none>
  </div>
</template>

<script>
  import productItem from '../components/productItem-1';
  import loadMore from '../components/loadMore';
  import dataNone from '../components/dataNone';
  import { getQuery, getPrice } from '../utils';
  import * as service from '../services/product';
  import { CHANNEL_TYPE } from '../constants';
  import config from '../config';

  export default {
    name: 'products',
    components: {
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
          type: 'pdd.ddk.goods.recommend.get',
          offset: 0,
          limit: 20
        }
      }
    },
    methods: {
      async getList () {
        if (this.hasMore && !this.isRequesting) {
          this.isRequesting = true;
          const res = await service.getProduct(this.dataSearch);
          if (res.goods_basic_detail_response && res.goods_basic_detail_response.list) {
            const list = res.goods_basic_detail_response.list;
            list.map(i => {
              let price = i.min_group_price - i.coupon_discount;
              i.source_price = getPrice(price);
              i.min_group_price = getPrice(i.min_group_price);
              i.coupon_discount = getPrice(i.coupon_discount, 0);
            });
            this.products = this.products.concat(list);
            this.hasMore = this.products.length < res.goods_basic_detail_response.total;
            this.dataSearch.offset += this.dataSearch.limit;
            this.isRequesting = false;
          } else {
            wx.showToast({
              title: '获取数据失败',
              icon: 'none'
            });
          }
          this.showEmpty = this.products.length === 0;
        }
      },
      getInit () {
        this.title = '';
        this.products = [];
        this.showEmpty = false;
        this.hasMore = true;
        this.isRequesting = false;
        this.dataSearch = {
          type: 'pdd.ddk.goods.recommend.get',
          offset: 0,
          limit: 20
        }
      }
    },
    mounted () {
      const options = getQuery();
      this.getInit();
      this.dataSearch.channel_type = options.channel_type * 1;
      this.title = CHANNEL_TYPE[this.dataSearch.channel_type].name || config.miniProName;
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
    padding-top: 20rpx;
  }
</style>
