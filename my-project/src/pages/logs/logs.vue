<template>
  <div class="page">

    <!-------轮播图------->
    <view class="page__hd">
      <view class="page__title"></view>
      <view class="page__desc"></view>
    </view>
    <div class="page__bd page__bd_spacing">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
        :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
        <div v-for="item in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" style="width: 100%;height: 100%;" />
          </swiper-item>
        </div>
      </swiper>
    </div>

    <!-------热门活动------->

    <div class="logs-hd">
      <div class="logs-hd-a">
        <p style="width: 40%;height:80rpx;font-weight: 700;line-height: 80rpx;font-size: 15px;">热门活动</p>
      </div>
      <div class="logs-hd-b"">
        <p style="width: 15%;height:80rpx;color: #FF6282;line-height: 80rpx;">1</p>
        <p style="width: 40%;height:80rpx;font-weight: 700;line-height: 80rpx;" @click="goindex()">{{hotlist[0].name}}456
        </p>
        <p style="width: 30%;height:80rpx;color: #CCCECF;line-height: 80rpx;">{{hotlist[0].browse}}</p>
        <p style="width: 15%;height:80rpx;line-height: 80rpx;">
          <img style="width: 20%;height: 30%;" src="../../../static/images/lie_logo.png" alt="">
        </p>
      </div>
      <div class="logs-hd-c">
        <p style="width: 15%;height:80rpx;color: #FF6282;line-height: 80rpx;">2</p>
        <p style="width: 40%;height:80rpx;font-weight: 700;line-height: 80rpx;">8-7测试一</p>
        <p style="width: 30%;height:80rpx;color: #CCCECF;line-height: 80rpx;">9</p>
        <p style="width: 15%;height:80rpx;line-height: 80rpx;">
          <img style="width: 20%;height: 30%;" src="../../../static/images/lie_logo.png" alt="">
        </p>
      </div>

    </div>


  </div>
</template>

<script>
  import Flys from "../../App"
  export default {
    data() {
      return {
        id: 1,
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 900,
        circular: true,
        hotlist: "",
        imgUrls: [
          'http://www.kaixian.tv/gd/d/file/201607/07/7a7f3964c672a793da3b0f625b40264d.jpg',
          'http://pic8.iqiyipic.com/image/20190614/c8/24/v_131173630_m_601_m2_480_360.jpg',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=781419465,690616006&fm=26&gp=0.jpg'

        ]
      }

    },
    created() {
      this.getActivityLists()
    },
    methods: {

      // godenglu() {
      //   wx.navigateTo({
      //     url: "../denglu/main"
      //   })
      // },
      goindex() {
        wx.switchTab({
          url: "../isindex/main"
        })
      },
      getActivityLists() {
        this.$fly.post(Flys.getActivityList).then(res => {
          console.log(res,"热门活动列表")
          this.hotlist = res.data.data
        })
      }

    }
  }


</script>

<style scoped>
  
  .logs-hd {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 240rpx;
    border-bottom: solid 1px #F8F8F8;
    line-height: 65rpx;
    text-indent: 10px;
  }

  .logs-hd-a {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 80rpx;
    border-bottom: solid 1px #F8F8F8;
    line-height: 80rpx;
    font-size: 15px;
  }

  .logs-hd-b {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 80rpx;
    border-bottom: solid 1px #F8F8F8;
    font-size: 15px;
  }

  .logs-hd-c {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 80rpx;
    border-bottom: solid 1px #F8F8F8;
    font-size: 15px;
  }
</style>