<template>
    <div class="page">
        <!-- 音乐播放 -->
        <div class="music" style="width: 40px;height: 40px;" v-if="isShow">
            <audio :src="musicUrl" loop="loop" id="myAudio" style="display: none;"></audio>
            <img class="music_img" @click="handleMusicPlay()" style="width:100%;height:100%;border-radius: 50%;"
                :src="isMusicPlay?'http://www.51yuansu.com/pic2/cover/00/49/83/58163299070e0_610.jpg':'http://pic.51yuansu.com/pic2/cover/00/52/19/5816ab6ccac19_610.jpg'"
                alt="">
        </div>

        <!-- 登录授权 -->
        <div class="denglu" v-if="isHide">
            <div class="wxShou">
                <div>
                    <img style="width: 100%;height: 100%;" src="../../../static/images/tiantians.png" alt="">
                </div>
                <div>申请获取以下权限</div>
                <div>获得你的公开信息(昵称、头像等)</div>
                <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN"
                    @getuserinfo="bindGetUserInfo">
                    授权登录
                </button>
            </div>
        </div>

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

        <!-------活动页面------->
        <div class="home-huod">
            <div class="homg-huod-a">
                <div class="huod-a-1">
                    <p>{{hdmags.enroll}}</p>
                    <p>已报名</p>
                </div>
                <div class="huod-a-2">
                    <p>{{hdmags.sumVote}}</p>
                    <p>总投票</p>
                </div>
                <div class="huod-a-3">
                    <p>{{hdmags.browse}}</p>
                    <p>浏览量</p>
                </div>
            </div>
            <div class="homg-huod-b">
                <p style="margin: 0 auto;" @click="gobaoming()">我要报名</p>
            </div>
            <div class="homg-huod-c">
                <p style="margin: 0 auto;">{{mags}}</p>
            </div>

            <!-- 搜索 -->
            <div class="homg-huod-d">
                <input type="text" placeholder="姓名" v-model="btnname">
                <button @click="btnsou()">搜索</button>
            </div>

            <!-- 分组 -->
            <div class="homg-huod-e">
                <picker class="grouping" @change="bindPickerChange" :value="index" :range="array">
                    <view class="picker">
                        {{array[index]}}
                        <i class="arrowDown"></i>
                    </view>
                </picker>
            </div>
            <!-----选手列表----->
            <div class="homg-xs">
                <div class="homg-xs-a" @click="godetails(v.id)" v-for="(v,index) in Listofplayers" :key=index>
                    <p>
                        <img style="width: 100%;height: 100%;" :src="Listofplayers[index].coverImg" alt="">
                    </p>
                    <p>{{Listofplayers[index].name}}</p>
                    <p>{{Listofplayers[index].ticket}}票</p>
                    <p>投票</p>
                </div>
            </div>

            <div class="homg-db">已经到底部了...</div>



        </div>


    </div>


</template>



<script>
    import Flys from "../../App"

    export default {
        data() {
            return {
                userInfo() {

                },
                days: 1,//天
                hous: 1,//时
                mous: 1,//分
                sed: 1,//秒
                mags: "",   //倒计时
                id: 1,
                indicatorDots: true,
                autoplay: true,
                interval: 5000,
                duration: 900,
                circular: true,
                hdmags: "",//活动信息，报名量，浏览量
                endtime: "", //活动截止时间
                Listofplayers: "",  //活动页面选手列表
                btnname: "",    //搜索框内容
                lunbo: "",    //轮播图
                audioCtx: "",   //暂停播放
                isMusicPlay: false, //音乐图片 默认不显示
                isShow: false,   //音乐播放器
                //音乐路径
                // musicUrl: "http://58.49.111.143/amobile.music.tc.qq.com/C400002n4xK13AJJvQ.m4a?guid=7848736348&vkey=FAA00530C72C163C2236E8D1AE2BDD6017660E68E15AAFA796A9E45247B12F6556A23271613345DF44B0D4CDB11A4F4EECFEAC9B7DCEA53E&uin=1332&fromtag=66",
                musicUrl:"https://webfs.yun.kugou.com/201910301441/6177553696c47485a02406a4019edd8b/G169/M03/19/14/iZQEAF0v5ceASRGnAEKo34ceC0A915.mp3",
                //判断小程序的API，回调，参数，组件等是否在当前版本可用。
                canIUse: wx.canIUse('button.open-type.getUserInfo'),
                isHide: true,    //登录授权模板

                //轮播图图片地址
                imgUrls: [
                    'http://n.sinaimg.cn/tech/crawl/116/w550h366/20181115/jAPH-hnvukff1269963.jpg',
                    'http://p2.music.126.net/LHH5FGDLAvv_ghJY-bYK5A==/109951163240233509.jpg',
                    'http://i0.hdslb.com/bfs/article/686fada008a72378e3d210ebd0b59885e606f2d8.jpg'

                ],
                //分组
                array: [
                    "请选择分组 ∨",
                    "分组1",
                    "分组2",
                    "分组3"
                ],
                index: 0
            }


        },
        onReady(e) {
            this.audioCtx = wx.createAudioContext("myAudio")    //音频
            this.handleMusicPlay()
        },


        //下拉刷新页面
        onPullDownRefresh: function () {
            // console.log(111)
            this.activityPlayer()  //重新加载选手列表接口的数据
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        },

        onLoad() {

            this.getlist(),    // 获取报名 总票数 浏览量
                this.activityPlayer()  //选手列表

            let that = this

            // 判断是否授权
            wx.getSetting({
                success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                        that.isHide = false;
                        that.isShow = true;
                        wx.getUserInfo({
                            success: function (res) {

                                // console.log(data,'用户登录信息')
                                // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                                // 根据自己的需求有其他操作再补充
                                // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                                wx.login({
                                    success: res => {
                                        // 获取到用户的 code 之后：res.code
                                        console.log("用户的code:" + res.code);

                                        that.$fly.post(Flys.getAppid, { code: res.code }).then(res => {
                                            console.log(res, '后台返回的数据')


                                            // 把openid存到本地存储
                                        })

                                        // 可以传给后台，再经过解析获取用户的 openid
                                        // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                                        // wx.request({
                                        //     // 自行补上自己的 APPID 和 SECRET
                                        //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                                        //     success: res => {
                                        //         // 获取到用户的 openid
                                        //         console.log("用户的openid:" + res.data.openid);
                                        //     }
                                        // });
                                    }
                                });
                            }
                        });
                    } else {
                        // 用户没有授权
                        // 改变 isHide 的值，显示授权页面
                        wx.hideTabBar()
                        that.isHide = true
                    }
                }
            });

        },

        beforeMount() {
            //获取用户登录信息
            // this.handLeGetUserInfo()
        },


        methods: {
            handleMusicPlay() {
                console.log(111)
                //解决页面一加载就播放的问题
                let isMusicPlay = this.isMusicPlay;
                this.isMusicPlay = isMusicPlay;
                if (this.isMusicPlay) {
                    this.audioCtx.pause();  //播放器暂时时
                    this.isMusicPlay = false
                } else {
                    this.audioCtx.play();   //播放器播放时
                    this.isMusicPlay = true
                }
            },





            //获取用户登录信息
            bindGetUserInfo: function (e) {
                console.log(e, "用户信息")
                if (e.mp.detail.errMsg == "getUserInfo:fail auth deny") {
                    console.log(1111)
                    wx.showToast({
                        title: '您拒绝了登录',
                        icon: 'none',
                        duration: 2000
                    })
                }
                if (e.mp.detail.errMsg == "getUserInfo:ok") {      //如果用户登录了
                    // console.log(12345678)
                    this.isHide = false;    //隐藏登录授权模板
                    wx.showTabBar()     //显示tabbar
                    this.isShow = true     //显示音频播放器 开始播放
                }
            },



            //分组方法
            bindPickerChange(e) {
                this.index = e.mp.detail.value;
            },

            godetails(id) {
                //console.log(id,"11111122222")     //跳转到选手详情页面
                wx.navigateTo({
                    url: "../wang/main?id="+id
                })
            },
            gobaoming() {           //跳转到报名页面
                // console.log(22222)
                wx.navigateTo({
                    url: "../baoming/main"
                })
            },
            btnsou() {
                if (this.btnname == "") {      //如果搜索框中的值为空
                    wx.showToast({      //提示用户输入姓名
                        title: '请输入姓名',
                        icon: 'none',
                        duration: 2000
                    })
                } else {
                    this.$fly.post(Flys.activityPlayer, { name: this.btnname }).then(res => {   //请求接口 将Input框中的值传到后台
                        console.log(res, "btn")
                        this.Listofplayers = res.data.rows  //数组循环搜索后返回的数据
                    })
                }

                this.btnname = ""   //将input框的值清空
            },

            //  定时器
            conuttiem() {
                var timeid;
                var date = new Date();
                var now = date.getTime();
                var endDate = new Date(this.endtime)   //设置截止时间
                var end = endDate.getTime();
                // console.log(end)
                var leftTime = end - now; //时间差
                if (leftTime >= 0) {
                    this.days = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    this.hous = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                    this.mous = Math.floor(leftTime / 1000 / 60 % 60);
                    this.sed = Math.floor(leftTime / 1000 % 60);
                    this.hous = this.hous < 10 ? "0" + this.hous : this.hous;
                    this.mous = this.mous < 10 ? "0" + this.mous : this.mous
                    this.sed = this.sed < 10 ? "0" + this.sed : this.sed
                    this.mags = "距离活动结束：" + this.days + "天" + this.hous + "时" + this.mous + "分" + this.sed + "秒"
                    timeid = setInterval(this.conuttiem, 1000);
                    if (this.hous < 10) {
                        this.hous = "0" + this.hous
                    }
                } else {
                    // console.log("活动结束")
                    this.mags = "活动已结束";
                    clearInterval(timeid)
                }
            },

            getlist() {
                this.$fly.post(Flys.list, { id: 1 }).then(res => {
                    console.log(res, "获取报名 总票数 浏览量")
                    this.hdmags = res.data.data.hdActivity       //获取报名 总票数 浏览量的data
                    this.endtime = res.data.data.hdActivity.end  //获取结束时间
                    this.lunbo = res.data.data.coverList    //获取轮播图
                    this.conuttiem()        //调用定时器
                })
            },
            activityPlayer() {
                this.$fly.post(Flys.activityPlayer).then(res => {
                    console.log(res, "选手列表")
                    this.Listofplayers = res.data.rows
                })
            }
        }

    }

</script>


<style scoped>
    .page {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .music {
        position: fixed;
        right: 20rpx;
        top: 50rpx;
        z-index: 99;
    }

    .music_img {
        animation: rotate 3s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg)
        }

        to {
            transform: rotate(360deg)
        }
    }

    .denglu {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding-top: 30%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        z-index: 999;

    }

    .wxShou {
        width: 94%;
        height: 100%;
        margin: 0 auto;
        margin-top: 0%;
    }

    .wxShou div:nth-child(1) {
        width: 50%;
        height: 300rpx;
        margin: 0 auto;
    }

    .wxShou div:nth-child(2) {
        width: 100%;
        font-size: 40rpx;
        color: #5A6166;
        text-align: center;
        font-weight: 700;
        margin-top: 40rpx;
    }

    .wxShou div:nth-child(3) {
        width: 100%;
        font-size: 36rpx;
        text-align: center;
        color: #C7C6C7;
        margin-top: 40rpx;
        margin-bottom: 80rpx;
    }

    .bottom {
        width: 80%;
        height: 80rpx;
        margin: 0 auto;
        border-radius: 40rpx;
        font-size: 40rpx;
        text-align: center;
        line-height: 80rpx;
    }

    .home-huod {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #EEEEEE;
    }

    .homg-huod-a {
        display: flex;
        flex-direction: row;
        width: 94%;
        height: 120rpx;
        background-color: #31C9B1;
        margin: 0 auto;
        margin-top: 4%;
    }

    .huod-a-1,
    .huod-a-2,
    .huod-a-3 {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 31%;
        font-size: 16px;
        margin-top: 20rpx;
        line-height: 40rpx;
        color: white;
    }

    .homg-huod-b {
        display: flex;
        flex-direction: row;
        width: 70%;
        height: 80rpx;
        background-color: #31C9B1;
        color: white;
        margin: 0 auto;
        margin-top: 5%;
        line-height: 80rpx;
        font-size: 16px;
        border-radius: 10px;
    }

    .homg-huod-c {
        display: flex;
        flex-direction: row;
        width: 94%;
        height: 70rpx;
        background-color: #F6FFFF;
        margin: 0 auto;
        margin-top: 4%;
        font-size: 15px;
        line-height: 70rpx;
        color: #838E9D;
    }

    .homg-huod-d {
        display: flex;
        flex-direction: row;
        width: 94%;
        height: 60rpx;
        margin: 0 auto;
        font-size: 30rpx;
        margin-top: 3%;
    }

    .homg-huod-d input {
        width: 79.5%;
        height: 60rpx;
        background-color: white;
        padding-left: 20rpx;
    }

    .homg-huod-d button {
        width: 20%;
        height: 60rpx;
        background-color: #31C9B1;
        border: none;
        color: white;
        line-height: 60rpx;
        text-align: center;
        border-radius: 0;
        font-size: 15px;
    }

    .homg-huod-d button::after {
        border-radius: 0;
    }

    .homg-huod-e {
        width: 25%;
        height: 60rpx;
        background-color: #31C9B1;
        font-size: 30rpx;
        color: white;
        margin-top: 3%;
        margin-left: 3%;
        text-align: center;
        line-height: 60rpx;
    }

    .homg-xs {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 96%;
        height: 100%;
        /* border: solid 1px red; */
        margin: 0 auto;
        margin-top: 5%;
        margin-bottom: 30rpx;
    }

    .homg-xs-a {
        display: flex;
        flex-direction: column;
        width: 48%;
        height: 450rpx;
        background-color: white;
        margin-bottom: 10rpx;
    }

    .homg-xs-a p:nth-child(1) {
        width: 100%;
        height: 60%;
        margin-bottom: 3%;
        font-weight: 700;
    }

    .homg-xs-a p:nth-child(2) {
        font-size: 17px;
        text-indent: 5%;
        color: #95A8BD;
        margin-bottom: 3%;
    }

    .homg-xs-a p:nth-child(3) {
        font-size: 16px;
        color: #6AD2C7;
        text-indent: 5%;
        margin-bottom: 3%;
    }

    .homg-xs-a p:nth-child(4) {
        width: 100%;
        height: 60rpx;
        background-color: #31C9B1;
        margin: 0 auto;
        color: white;
        font-size: 15px;
        text-align: center;
        line-height: 60rpx;
    }

    .homg-db {
        margin: 0 auto;
        font-size: 15px;
        color: #95A8BD;
    }

    .wxlogin {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        background-color: white;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }
</style>