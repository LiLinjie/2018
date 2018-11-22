<template>
  <div class="container">
    <map id="map"
         :longitude="longitude" :latitude="latitude" scale="20" show-location style="width: 100%; height: 300px;"></map>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        longitude: '',
        latitude: ''
      }
    },
    onLoad () {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: (res) => {
          this.latitude = res.latitude
          this.longitude = res.longitude
        }
      })
      wx.request({
        url: 'http://v.juhe.cn/weather/index',
        type: 'GET',
        data: {
          format: 2,
          cityname: encodeURIComponent('杭州'),
          key: '064f0a4f018ac7cd65d36f59ad4f9dd7'
        },
        success: (res) => {
          console.log(res);
        }
      })
    }
  }
</script>

<style scoped>

</style>
