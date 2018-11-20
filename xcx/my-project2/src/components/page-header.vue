<template>
  <div :class="{'page-header': true, isX: isX, android: isAndroid, anim_fade_image: isAnimate}" v-show="!isHideTitleBar">
    <div class="page-header-placeholder"></div>
    <div :class="{'page-header-wrap': true, isfixed: isFixed}" :style="{backgroundColor: backgroundColor, color: color}">
      <div class="header-back" v-if="isBack" @tap="toBack">
        <image class="icon" src="/static/images/backIcon/back.png"></image>
      </div>
      <div class="header-title">{{title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      isBack: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: '#fff'
      },
      backgroundColor: {
        type: String,
        default: '#ef1612'
      },
      isAnimate: {
        type: Boolean,
        default: false
      },
      isFixed: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        isX: /iphone10|iphone x/i.test(wx.getSystemInfoSync().model),
        isAndroid: /android/i.test(wx.getSystemInfoSync().system)
      }
    },
    methods: {
      toBack () {
        console.log(1111);
        wx.navigateBack({
          delta: 1
        });
      },

    }
  };
</script>

<style scoped lang="less">
  @import "../less/main";
.page-header {
  position: relative;
  z-index: 999;
  .page-header-placeholder {
    height: 64px;
  }
  .page-header-wrap {
    height: 44px;
    padding-top: 20px;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    &.isfixed {
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 750rpx;
    }
    .header-back {
      position:absolute;
      left: 0;
      width:40px;
      height:40px;
      padding:0;
      margin:auto;
      color:inherit;
      background-color:transparent;
      image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width:20rpx;
        height:36rpx;
        margin: auto;
      }
    }
    .header-title {
      flex: 1;
      text-align: center;
      padding: 0 40px;
      font-size: 34rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &.isX {
    .page-header-placeholder {
      height: 88px;
    }
    .page-header-wrap {
      padding-top: 44px;
    }
  }
  &.android {
    .page-header-placeholder {
      height: 72px;
    }
    .page-header-wrap {
      height: 48px;
      padding-top: 24px;
    }
  }
}
</style>
