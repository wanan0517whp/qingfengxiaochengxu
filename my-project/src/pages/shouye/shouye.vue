<template>
  <div class="page">

    <!-- 轮播图 -->
    <view class="page__hd">
      <view class="page__title"></view>
      <view class="page__desc"></view>
    </view>
    <div class="page__bd page__bd_spacing">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
        :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
        <div v-for="item in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" />
          </swiper-item>
        </div>
      </swiper>
    </div>


    <div class="homePage">
      <div class="homePage-a">
        <div class="homePage-a-left" @click="gologs()">
          <img class="left-image-a" src="../../../static/images/image1.jpg" alt="">
          <p style="text-align: center;font-size:14px">
            活动</p>
        </div>
        <div class="homePage-a-right" @click="godiaocha()">
          <img class="left-image-a" src="../../../static/images/image1.jpg" alt="">
          <p style="text-align: center;font-size:14px">问卷</p>
        </div>
      </div>
      <div class="homePage-b">
        <div class="homePage-a-left">
          <img class="left-image-a" src="../../../static/images/image1.jpg" alt="">
          <p style="text-align: center;font-size:14px">夏令营</p>
        </div>
        <div class="homePage-a-right">
          <img class="left-image-a" src="../../../static/images/image1.jpg" alt="">
          <p style="text-align: center;font-size:14px">课程</p>
        </div>
      </div>

    </div>


  </div>



</template>

<script>
  export default {
    data() {
      return {
        id: 1,
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 900,
        circular: true,
        imgUrls: [
          'http://www.kaixian.tv/gd/d/file/201607/07/7a7f3964c672a793da3b0f625b40264d.jpg',
          'http://pic8.iqiyipic.com/image/20190614/c8/24/v_131173630_m_601_m2_480_360.jpg',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=781419465,690616006&fm=26&gp=0.jpg'
        ]
      }
    },
    methods: {
      gologs() {
        console.log(111111)
        wx.navigateTo({
          url: "../logs/main"
        })
      },
      godiaocha() {
        wx.navigateTo({
          url: "../diaocha/main"
        })
      }

    }
  }




</script>

<style scoped>
  .slide-image {
    width: 100%;
    height: 100%;
  }

  .homePage {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* border: solid 1px yellowgreen; */
    background: #EEEEEE;
  }

  .homePage-a {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 96%;
    height: 300rpx;
    margin: 0 auto;
    margin-top: 5%;
  }

  .homePage-b {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 96%;
    height: 300rpx;
    margin: 0 auto;
    margin-top: 5%;
  }

  .homePage-a-left {
    display: flex;
    flex-direction: column;
    width: 46%;
    height: 300epx;
    /* border: solid 1px black; */
    background-color: #F6FFFF;
    border: solid 2px #E0F7FA;
  }

  .homePage-a-right {
    display: flex;
    flex-direction: column;
    width: 46%;
    height: 300epx;
    /* border: solid 1px black; */
    background-color: #F6FFFF;
    border: solid 2px #E0F7FA;
  }

  .left-image-a {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    margin-top: 5%;
  }
</style>