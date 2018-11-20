<template>
  <div class="container">
    <div class="rank-list-wrap" v-if="!showEmpty">
      <div class="rank-list flex flex-wrap">
        <rank-item :item="item" :index="index" v-for="(item, index) in products" :key="index"></rank-item>
      </div>
      <load-more :has-more="hasMore" :is-loading="isRequesting"></load-more>
    </div>
    <data-none v-else=""></data-none>
  </div>
</template>

<script>
  import rankItem from '../components/rankItem';
  import loadMore from '../components/loadMore';
  import dataNone from '../components/dataNone';
  import * as service from '../services/product';
  import { getPrice } from '../utils';

  export default {
    name: "rank",
    components: {
      rankItem,
      loadMore,
      dataNone
    },
    data () {
      return {
        title: '排行榜',
        products: [],
        showEmpty: false,
        hasMore: true,
        isRequesting: false,
        dataSearch: {
          type: 'pdd.ddk.goods.recommend.get',
          offset: 0,
          limit: 21,
          channel_type: 1
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
              i.source_price = getPrice(i.min_group_price);
              i.discount_price = getPrice(i.min_group_price - i.coupon_discount);
            });
            this.products = this.products.concat(list);
            this.hasMore = this.products.length < res.goods_basic_detail_response.total;
            this.dataSearch.offset += this.dataSearch.limit;
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
    onLoad () {
      this.products = [];
      this.showEmpty = false;
      this.hasMore = true;
      this.isRequesting = false;
      this.dataSearch = {
        type: 'pdd.ddk.goods.recommend.get',
        offset: 0,
        limit: 21,
        channel_type: 1
      }
      this.getList();
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
    .rank-list {
      padding: 30rpx 6rpx 0 30rpx;
      .rank-item {
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
</style>
