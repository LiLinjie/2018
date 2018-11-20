<template>
  <div class="container">
    <pageHeader :title="title"></pageHeader>
    <div class="search-box-wrap">
      <div class="search-box">
        <view class="search flex items-center justify-center">
          <image src="/static/images/tyqSearch.png"></image>
          <text>请输入商品名称</text>
        </view>
        <view class="search-key flex justify-between">
          <div @tap="toSearch('全部商品')">全部商品</div>
          <div v-for="(item, index) in keyWods" :key="index" @tap="toSearch(item)">{{item}}</div>
        </view>
      </div>
    </div>
    <div class="category-box">
      <div class="categories">
        <div @tap="checkCatId(item.cat_id)" v-for="(item, index) in cat_list" :key="index" :class="{'category-item': true, selected: item.cat_id === selectedId}">
          {{item.cat_name}}
        </div>
      </div>
      <div class="details">
        <div class="details-list flex flex-wrap">
          <div class="detail-item"
               @tap="category(item.cat_id)"
               v-for="(item, index) in cat_list_two"
               :key="index"
          >
            {{item.cat_name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pageHeader from '../components/page-header';

  export default {
    name: "category",
    data () {
      return {
        title: '搜券',
        userInfo: '',
        keyWods: ['运动鞋', '婴儿', '纸抽'],
        cat_list: [ {
          level: 1,
          cat_id: 2,
          parent_cat_id: 0,
          cat_name: "美食饮料"
        }, {
          level: 1,
          cat_id: 69,
          parent_cat_id: 0,
          cat_name: "美容护肤"
        }, {
          level: 1,
          cat_id: 77,
          parent_cat_id: 0,
          cat_name: "母婴玩具"
        }, {
          level: 1,
          cat_id: 239,
          parent_cat_id: 0,
          cat_name: "男装"
        }, {
          level: 1,
          cat_id: 259,
          parent_cat_id: 0,
          cat_name: "饰品首饰"
        }, {
          level: 1,
          cat_id: 281,
          parent_cat_id: 0,
          cat_name: "健身"
        }, {
          level: 1,
          cat_id: 282,
          parent_cat_id: 0,
          cat_name: "厨房用品"
        }, {
          level: 1,
          cat_id: 479,
          parent_cat_id: 0,
          cat_name: "家庭清洁"
        }, {
          level: 1,
          cat_id: 483,
          parent_cat_id: 0,
          cat_name: "洗护纸品"
        }, {
          level: 1,
          cat_id: 489,
          parent_cat_id: 0,
          cat_name: "居家日用"
        }, {
          level: 1,
          cat_id: 519,
          parent_cat_id: 0,
          cat_name: "收纳整理"
        }, {
          level: 1,
          cat_id: 525,
          parent_cat_id: 0,
          cat_name: "宠物用品"
        }, {
          level: 1,
          cat_id: 873,
          parent_cat_id: 0,
          cat_name: "床上用品"
        }, {
          level: 1,
          cat_id: 879,
          parent_cat_id: 0,
          cat_name: "布艺家饰"
        }, {
          level: 1,
          cat_id: 1432,
          parent_cat_id: 0,
          cat_name: "个护美体"
        }, {
          level: 1,
          cat_id: 1629,
          parent_cat_id: 0,
          cat_name: "家居饰品"
        }, {
          level: 1,
          cat_id: 1715,
          parent_cat_id: 0,
          cat_name: "成人用品"
        }, {
          level: 1,
          cat_id: 1889,
          parent_cat_id: 0,
          cat_name: "鲜花园艺"
        }, {
          level: 1,
          cat_id: 1896,
          parent_cat_id: 0,
          cat_name: "住宅家具"
        }, {
          level: 1,
          cat_id: 2351,
          parent_cat_id: 0,
          cat_name: "运动"
        }, {
          level: 1,
          cat_id: 2479,
          parent_cat_id: 0,
          cat_name: "家居建材"
        }, {
          level: 1,
          cat_id: 2603,
          parent_cat_id: 0,
          cat_name: "办公用品"
        }, {
          level: 1,
          cat_id: 2629,
          parent_cat_id: 0,
          cat_name: "文化用品"
        }, {
          level: 1,
          cat_id: 2933,
          parent_cat_id: 0,
          cat_name: "3C数码配件"
        }, {
          level: 1,
          cat_id: 3202,
          parent_cat_id: 0,
          cat_name: "书籍杂志"
        }, {
          level: 1,
          cat_id: 4173,
          parent_cat_id: 0,
          cat_name: "户外"
        } ],
      }
    },
    components: {
      pageHeader
    },
    methods: {
      toSearch (keyword) {
        wx.navigateTo({
          url: `/pages/search?keyword=${keyword}`
        });
      }
    }
  };
</script>

<style scoped lang="less">
.container {
  .search-box-wrap {
    width:100%;
    height:384rpx;
    position:relative;
    z-index:3;
    background:#ef1612 url('https://video.m.kuosanyun.com/20180913105647-6quhNJINlG.jpg') no-repeat;
    background-size:100%;
    .search-box {
      position:relative;
      top:200rpx;
      z-index:2;
      height:100rpx;
      line-height:100rpx;
      .search {
        position:relative;
        width:700rpx;
        margin: 0 auto;
        height:80rpx;
        line-height:80rpx;
        background:#fff;
        border-radius:4rpx;
        font-size: 28rpx;
        color: #999;
        image {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }
      .search-key {
        width: 700rpx;
        margin: 20rpx auto 0;
        > div {
          width:162rpx;
          height:60rpx;
          line-height:60rpx;
          font-size:24rpx;
          color:#fff;
          text-align:center;
          background:rgba(255,255,255,0.15);
          border-radius:4rpx;
          overflow:hidden;
        }
      }
    }
  }
  .category-box {
    position: relative;
    top: 0;
    left: 0;
    width: 750rpx;
    z-index: 2;
    height: calc(100vh - 120rpx - 384rpx);
    .categories {
      position:absolute;
      left:0;
      top:0;
      width:200rpx;
      height:100%;
      font-size:28rpx;
      color:#333;
      text-align:center;
      background:#fff;
      overflow-y:auto;
      -webkit-overflow-scrolling:touch;
      .category-item {
        height:100rpx;
        line-height:100rpx;
        position:relative;
        &.selected {
          background:#f2f2f2;
          &:after {
            content: '';
            position:absolute;
            left:0;
            width:6rpx;
            height:60rpx;
            display:inline-block;
            border-top-right-radius:1000rpx;
            border-bottom-right-radius:1000rpx;
            background:#ef1612;
          }
        }
      }
    }
    .details {
      position:absolute;
      right:0;
      top:0;
      width: 550rpx;
      height:100%;
      overflow:hidden;
      overflow-y:auto;
      -webkit-overflow-scrolling:touch;
      .detail-item {
        width: 90rpx;
        height: 230rpx;
      }
    }
  }
}
</style>
