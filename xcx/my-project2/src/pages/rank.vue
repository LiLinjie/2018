<template>
  <div class="container">
    <pageHeader :title="title" isBack="true"></pageHeader>
    <div class="rank-list flex flex-wrap">
      <rankItem :item="item" :index="index" v-for="(item, index) in rankArr" :key="index"></rankItem>
    </div>
  </div>
</template>

<script>
  import pageHeader from '../components/page-header';
  import rankItem from '../components/rankItem';
  import * as service from '../services/product';
  import { getSetting} from "../utils";

  export default {
    name: "rank",
    components: {
      pageHeader,
      rankItem
    },
    data () {
      return {
        title: '排行榜',
        rankArr: [],
        isBack: true
      }
    },
    async mounted () {
      const res = await service.getProduct({
        timestamp: '1538216924',
        type: 'pdd.ddk.goods.recommend.get',
        channel_type: 1,
        offset: 0,
        limit: 21,
        sign: '35CF0778CC7904F1EF1C2102719C8972'
      });
      this.rankArr = this.rankArr.concat(res.goods_basic_detail_response.list);
      console.log('this.rankArr', this.rankArr);
    }
  };
</script>

<style scoped lang="less">
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
