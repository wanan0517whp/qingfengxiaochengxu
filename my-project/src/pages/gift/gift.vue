<template>
    <div class="gifts">

        <div class="detailsLogo">
            <div class="logoImg">
                <img style="width: 100%;height:100%;border-radius: 50%;" :src="hdPlayerInfo.coverImg"
                    alt="">
            </div>
            <div class="logoName">
                <p>{{hdPlayerInfo.name}}</p>
            </div>
        </div>
        <div class="homg-huod-a">
            <div class="huod-a-1">
                <p>{{hdPlayerInfo.i}}</p>
                <p>排名</p>
            </div>
            <div class="huod-a-2">
                <p>{{hdPlayerInfo.ticket}}</p>
                <p>票数</p>
            </div>
            <div class="huod-a-3">
                <p>{{hdPlayerInfo.gift}}</p>
                <p>礼物</p>
            </div>
            <div class="huod-a-4">
                <p>{{hdPlayerInfo.browse}}</p>
                <p>浏览量</p>
            </div>
        </div>

        <div class="gifts-nav">
            <p>送礼物加票数</p>
        </div>

        <div class="giftsLieb">
            <div class="giftsLieb-a">
                <!-- <div class="giftsLieb-a-left" @click="show(index)" v-for="(v,index) in liwu" :key="index"
                    :class="flag==index?'giftsLieb-a-left':'giftsLieb-a-left-show'">
                    <p>{{v.title}}</p>
                    <p><img src="../../../static/images/fangmao.png" alt="" style="width: 100%;height: 100%;"></p>
                    <p>{{v.name}}</p>
                </div> -->

                <div class="giftsLieb-a-left"  @click="show(index)" v-for="(v,index) in gifts" :key="index" :class="flag==index?'giftsLieb-a-left-show':'giftsLieb-a-left'">
                    <p>{{v.name}}</p>
                    <p><img :src="gifts[index].icon" alt="" style="width: 100%;height: 100%;"></p>
                    <p>+{{v.ticket}}票</p>
                </div>
            </div>
        </div>


        <div class="giftsLieb-money">
            <div class="giftsLieb-money-left">
                <span style="font-size: 14px;line-height: 60rpx;">￥</span>
                <span style="font-size: 17px;line-height: 60rpx;">{{ totalPrice }}</span>
                <span style="font-size: 16px;line-height: 60rpx;">&nbsp;&nbsp;+{{ votes }}票</span>
            </div>
            <div class="giftsLieb-money-right">
                <p @click="jian()" style="width: 30%;text-align: center;line-height: 60rpx;border: solid 1px #E4E4E4;">-
                </p>
                <p
                    style="width: 70%;text-align: center;line-height: 60rpx;border-bottom: solid 1px #E4E4E4;border-top: splid 1px #E4E4E4;">
                    {{ num }}</p>
                <p @click="add()" style="width: 30%;text-align: center;line-height: 60rpx;border: solid 1px #E4E4E4;">+
                </p>
            </div>
        </div>
        <div class="immediately">
            <p style="width: 100%;height: 50px;">立即送出</p>
        </div>


    </div>



</template>

<script>
    import Flys from "../../App"
    export default {
        data() {
            return {
                gifts: [],   //礼物列表
                flag: 0,
                num: 1,
                money: 0.01,    //
                vote: 20,
                totalPrice: 0.01,  //总价格
                votes: 20,   //总票数
                playerid:"",
                playerPhoto:"", //选手照片
                hdPlayerInfo:"", //选手头像
                liwu: [
                    { title: "么么哒", id: 1, name: 52, money: 1 },
                    { title: "么么哒", id: 2, name: 66, money: 2 },
                    { title: "么么哒", id: 3, name: 88, money: 3 },
                    { title: "么么哒", id: 4, name: 520, money: 4 },
                    { title: "么么哒", id: 5, name: 886, money: 5 },
                    { title: "么么哒", id: 6, name: 999, money: 6 },
                    { title: "么么哒", id: 7, name: 1314, money: 7 },
                    { title: "么么哒", id: 8, name: 6666, money: 8 },
                    { title: "么么哒", id: 9, name: 8888, money: 9 }
                ]
            }
        },
     
        onLoad(options) {
            // console.log(options,"----------")
               this.playerid = options.id;
               this.giftLists()
               this.player()
        },
        methods: {
            show(index) {
                // console.log(this.liwu[index].money)
                this.money = this.gifts[index].price    //获取金钱的值
                this.vote = this.gifts[index].ticket
                this.flag = index
                this.num = 1
                this.totalPrice = this.money
                this.votes = this.vote
            },
            add(index) {
                // console.log(11111)

                if (this.num >= 99) {
                    wx.showModal({
                        title: "提示!",
                        content: "礼物数量不得大于99!",
                        showCancel: false
                    })
                    this.num = 99
                }
                else{
                    this.num++
                    this.totalPrice = this.num * this.money
                    this.votes = this.num * this.vote   
                    this.totalPrice =  this.totalPrice.toFixed(2)
                }

            },
            jian(index) {
                if (this.num <= 1) {

                    wx.showModal({
                        title: "提示!",
                        content: "礼物数量不得小于1!",
                        showCancel: false
                    })
                    this.num = 1
                }
                else {
                    this.num--
                    this.totalPrice = this.totalPrice - this.money
                    this.votes = this.votes - this.vote
                    this.totalPrice = this.totalPrice.toFixed(2)
                    // this.totalPrice = this.money
                    // this.votes = this.vote
                }
            },

            giftLists() {
                this.$fly.post(Flys.giftList).then(res => {
                    console.log(res, "礼物列表")         //Ok
                    this.gifts = res.data.data.hdGifts
                })
            },
            player() {
                this.$fly.post(Flys.player, { id: this.playerid }).then(res => {
                    console.log(res, "选手详情")
                    this.playerPhoto = res.data.data.playerImg   //选手照片
                    this.hdPlayerInfo = res.data.data.HdPlayer  //选手头像
                    this.votingRecord = res.data.data.hdPlayerGiftlist  //投票记录
                    // console.log(res.data.data.hdPlayerGiftlist[0].createTime,"xiabiao")
                })
            }
            
        }
    }
</script>

<style scoped>
    .gifts {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #EBEBEB;
    }

    .detailsLogo {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 280rpx;

        margin: 0 auto;
        margin-top: 3%;
    }

    .logoImg {
        width: 25%;
        height: 65%;
        margin: 0 auto;
    }

    .logoName {
        font-size: 15px;
        color: #97A3B4;
        margin: 0 auto;
        margin-top: 2%;
    }

    .homg-huod-a {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 120rpx;
        background-color: #31C9B1;
        margin: 0 auto;
        margin-bottom: 20px;
    }

    .huod-a-1,
    .huod-a-2,
    .huod-a-3,
    .huod-a-4 {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 33.3%;
        font-size: 16px;
        margin-top: 20rpx;
        line-height: 40rpx;
        color: white;
    }

    .gifts-nav {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 80rpx;
        background-color: white;
        margin-bottom: 10px;
        font-size: 34rpx;
        line-height: 80rpx;
        text-indent: 15px;
        color: #A2A5AC;
    }

    .giftsLieb {
        display: flex;
        width: 94%;
        height: 100%;
        margin: 0 auto;
        background-color: #F0F0F0;
    }

    .giftsLieb-a {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        margin: 0 auto;
        margin-top: 20rpx;
    }

    .giftsLieb-a-left {
        display: flex;
        flex-direction: column;
        width: 31%;
        height: 200rpx;
        background-color: #F3F3F3;
        border: solid 1px #E0DFE4;
        margin: 0 auto;
        margin-bottom: 20rpx;
    }

    .giftsLieb-a-left-show {
        display: flex;
        flex-direction: column;
        width: 31%;
        height: 200rpx;
        background-color: white;
        border: solid 1px white;
        margin: 0 auto;
        margin-bottom: 20rpx;
    }

    .giftsLieb-a-left p:nth-child(1) {
        width: 100%;
        height: 20px;
        text-align: center;
        color: #969A9D;
        font-size: 14px;
    }

    .giftsLieb-a-left p:nth-child(2) {
        width: 100%;
        height: 60px;
    }

    .giftsLieb-a-left p:nth-child(3) {
        width: 100%;
        height: 20px;
        text-align: center;
        color: #969A9D;
        font-size: 13px;
        background-color: #B3E757;

    }

    .giftsLieb-money {
        display: flex;
        flex-direction: row;
        width: 94%;
        height: 60rpx;
        margin: 0 auto;
        margin-top: 20px;
    }

    .giftsLieb-money-left {
        display: flex;
        flex-direction: row;
        width: 70%;
        color: #4D4E50;
    }

    .giftsLieb-money-right {
        display: flex;
        flex-direction: row;
        width: 30%;
        color: #969A9E;
    }

    .immediately {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        background-color: #1ABA0E;
        color: white;
        text-align: center;
        line-height: 50px;
        margin-top: 25px;
    }
</style>