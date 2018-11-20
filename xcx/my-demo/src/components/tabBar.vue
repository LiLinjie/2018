<template>
  <div class="tab-box">
    <div class="scroll-view-title-box flex items-center">
      <scroll-view class="scroll-view-title" scrollX="true">
        <div :class="{'tab-item': true, active: optId == title.opt_id}" v-for="(title, index) in sortTitleArr" :key="index" @tap="changeTab(title.opt_id)">
          <text class="txt">{{title.text}}</text>
        </div>
      </scroll-view>
      <view class="column_line"></view>
      <view @tap="showSelect1" class="scroll_select flex items-center justify-center">
        <image src="https://video.m.kuosanyun.com/scroll_select.png"></image>
      </view>
      <view class="hide_select" v-if="newSelect1">
        <div @tap.stop="checkSort(20)" class="select-line">
          <i class="iconfont icon-haoping"></i>
          <span :class="{active: sort == 20}">按好评排序</span>
        </div>
        <div @tap.stop="checkSort(6)" class="select-line">
          <i class="iconfont icon-xiaoliang1"></i>
          <span :class="{active: sort == 6}">按销量排序</span>
        </div>
        <div @tap.stop="checkSort(3)" class="select-line">
          <i class="iconfont icon-quotation"></i>
          <span :class="{active: sort == 3}">按价格排序</span>
        </div>
      </view>
      <view @tap="hideSelect1" class="select_mask" v-if="newSelect1"></view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabBar',
    props: ['sort', 'optId'],
    data () {
      return {
        newSelect1: false,
        sortTitleArr: [ {
          text: '精选',
          flag: !0,
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
      }
    },
    methods: {
      changeTab (optId) {
        this.$emit('changeTab', optId);
      },
      checkSort (key) {
        this.$emit('changeSort', key);
        this.newSelect1 = false;
      },
      showSelect1 () {
        this.newSelect1 = true;
      },
      hideSelect1 () {
        this.newSelect1 = false;
      }
    }
  }
</script>

<style scoped lang="less">
@import "../less/main";
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
  .hide_select {
    width: 220rpx;
    height: 218rpx;
    background: #fff;
    box-shadow: 0 4rpx 20rpx 0 rgba(0,0,0,0.20);
    border-radius: 10rpx;
    position: absolute;
    bottom: -230rpx;
    right: 20rpx;
    z-index: 9999;
    .select-line {
      height: 72rpx;
      border-bottom: 1rpx solid #e8e8e8;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &:last-child {
        border-bottom: none;
      }
      .iconfont {
        font-size: 26rpx;
        font-weight: bold;
        margin-right: 10rpx;
      }
      span {
        font-size: 24rpx;
        color: #333;
        &.active {
          color: @themeColor;
        }
      }
    }
  }
  .select_mask {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
}
</style>
