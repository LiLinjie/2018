<template>
  <div class="container">
    <pageHeader :title="title"></pageHeader>
    <button open-type="getUserInfo" v-if="!userInfo" @getuserinfo="getUserInfo">授权</button>
    <div class="user-info-panel" v-else="">
      <div class="avatar"><img :src="userInfo.avatarUrl" alt=""></div>
      <div class="nickName">{{userInfo.nickName}}</div>
    </div>
  </div>
</template>

<script>
  import pageHeader from '../components/page-header';
  import { getSetting} from "../utils";

  export default {
    name: 'index',
    data () {
      return {
        title: '个人中心',
        userInfo: ''
      }
    },
    components: {
      pageHeader
    },
    methods: {
      getUserInfo (e) {
        this.userInfo = e.mp.detail.userInfo;
        console.log(this.userInfo);
      }
    },
    mounted () {
      getSetting((res) => {
        this.userInfo = res.userInfo;
        console.log(this.userInfo);
      });
    }
  }
</script>

<style scoped lang="less">
  .container {
    .user-info-panel {
      .avatar {
        width: 200rpx;
        height: 200rpx;
        padding: 10rpx;
        border-radius: 100%;
        image {
          width: 180rpx;
          height: 180rpx;
          border-radius: 100%;
        }
      }
    }
  }
</style>
