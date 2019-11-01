<template>
    <div class="details">
       
      

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
        <div class="details-describe">
            <p>选手描述</p>
            <p>人美声甜 性格开朗 活泼可爱 </p>
        </div>
        <div class="details-imgs">
            <p>选手照片</p>
            <img style="width: 90%;height: 80%;margin: 0 auto;" :src="playerPhoto[0].url" alt="">
        </div>
        <div class="details-contribution">
            <p>票数贡献榜</p>
            <p>
                <img style="width: 50%;height: 100%;margin: 0 auto;" src="../../../static/images/xxxin.jpg" alt="">
            </p>
            <p>喜欢我的人 在这里驻留</p>
            <button @click="gogift(this.playerid)">送ta礼物加票</button>
        </div>
        <div class="details-record">
            <p style="font-size:18px;color:#A1AEBD;padding-top: 10rpx;padding-bottom: 10rpx;text-align: center;border-bottom: solid 1px #EBEDF0;">投票记录</p>
          
            <div class="details-jilu" v-for="(v,index) in votingRecord" :key=index>
                <div class="details-jilu-a">
                    <p>名字：{{votingRecord[index].extend2}}</p>
                    <p>时间：{{votingRecord[index].createTime}}</p>
                </div>
                <div class="details-jilu-b">+{{votingRecord[index].ticket}}票</div>
            </div>
            <button>已经是最后一页了</button>
        </div>
        <div class="details-foots"></div>


          <!-----底部导航----->
          <div class="detailsFoot">
            <div class="detailsFoot-a" @click="goshouye()">
                <p><i class="icon iconfont icon-ziyuan"></i></p>
                <P><i>首页</i></P>
            </div>
            <div class="detailsFoot-b" @click="vote()">
                <p><i class="icon iconfont icon-toupiao1"></i></p>
                <p>投票</p>
            </div>
            <div class="detailsFoot-c" @click="gogift(this.playerid)">
                <p><i class="icon iconfont icon-lipin"></i></p>
                <p><i>送礼</i></p>
            </div>
        </div>

    </div>

</template>

<script>
    import Flys from "../../App"

    export default {
        data() {
           
            return{
                playerid:"",
                playerPhoto:"", //选手照片
                hdPlayerInfo:"", //选手头像
                votingRecord:[]    //投票记录
            }
        },
        onLoad(options) {
            // console.log(options,"+++++++++++++")
               this.playerid = options.id;
                this.player(),
                this.vote()
        },
        methods: {

            goshouye() {
                // console.log(22)
                wx.navigateTo({
                    url: "../shouye/main"
                })
            },
            gogift(playerid) {
                // console.log(11111)
                wx.navigateTo({
                    url: "../gift/main?id="+this.playerid
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
            },
            vote(){
                this.$fly.post(Flys.vote,{extend3:3,extend2:"仙女",extend1:"234567890dfghj",playerId:128}).then(res=>{
                    console.log(res,"投票")
                })
            }

        }
    }

</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }

    .details {
        display: flex;
        flex-direction: column;
        width: 100%;
        /* height: 2100rpx; */
        background-color: #F0F0F0;
    }

    .detailsLogo {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 280rpx;
        /* border: solid 1px red; */
        margin: 0 auto;
        margin-top: 3%;
    }

    .logoImg {
        width: 25%;
        height: 70%;
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
        width: 94%;
        height: 120rpx;
        background-color: #31C9B1;
        margin: 0 auto;
    }

    .huod-a-1,
    .huod-a-2,
    .huod-a-3,
    .huod-a-4 {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 23.5%;
        font-size: 16px;
        margin-top: 20rpx;
        line-height: 40rpx;
        color: white;
    }

    .details-describe {
        display: flex;
        flex-direction: column;
        width: 94%;
        height: 160rpx;
        /* border: solid 1px red; */
        margin: 0 auto;
        margin-top: 3%;
        background-color: white;
    }

    .details-contribution p:nth-child(1),
    .details-imgs p:nth-child(1),
    .details-describe p:nth-child(1) {
        height: 60rpx;
        font-size: 17px;
        color: #97A3B4;
        text-align: center;
        border-bottom: solid 1rpx #F8F8F8;
        line-height: 60rpx;
    }

    .details-describe p:nth-child(2) {
        font-size: 15px;
        color: #97A3B4;
        line-height: 55rpx;
        text-indent: 20rpx;
    }

    .details-imgs {
        display: flex;
        flex-direction: column;
        width: 94%;
        height: 500rpx;
        /* border: solid 1px red; */
        margin: 0 auto;
        margin-top: 3%;
        background-color: white;
    }

    .details-contribution {
        display: flex;
        flex-direction: column;
        width: 94%;
        height: 500rpx;
        background-color: white;
        margin: 0 auto;
        margin-top: 4%;
    }

    .details-contribution p:nth-child(2) {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 250rpx;

    }

    .details-contribution p:nth-child(3) {
        height: 60rpx;
        font-size: 14px;
        color: #97A3B4;
        text-align: center;
    }

    .details-contribution button {
        background: #31C9B1;
        font-size: 16px;
        color: white;
        border-radius: 35rpx;
        width: 55%;
    }

    .details-record {
        display: flex;
        flex-direction: column;
        width: 94%;
        background-color: white;
        margin: 0 auto;
        margin-top: 4%;
    }
    
    .details-jilu{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 120rpx;
        border-bottom: solid 1px #EBEDF0;
    }

    .details-jilu-a{
        display: flex;
        flex-direction: column;
        width: 80%;
        color: black;
        line-height: 60rpx;
        text-indent: 20rpx;
        color: #8B8B8B;
    }

    .details-jilu-b{
        display: flex;
        flex-direction: row;
        width: 20%;
        line-height: 120rpx;
        color: #31C9B1;
    }

    .details-record button {
        width: 70%;
        height: 80rpx;
        font-size: 15px;
        color: white;
        background-color: #31C9B1;
        border-radius: 0;
        margin-top: 30rpx;
    }

    .details-foots{
        width: 100%;
        height: 100rpx;
    }

    .detailsFoot {
        width: 100%;
        height: 90rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        background: white;
        z-index: 999;
    }

    .detailsFoot-a {
        display: flex;
        flex-direction: row;
        background-color: #9EE786;
        width: 33%;
    }

    .detailsFoot-c p:nth-child(1) i,
    .detailsFoot-a p:nth-child(1) i {
        font-size: 60rpx;
        color: #31C9B1;
        position: relative;
        top: 15%;
        left: 50%;
    }

    .detailsFoot-c p:nth-child(2) i,
    .detailsFoot-a p:nth-child(2) i {
        font-size: 16px;
        position: relative;
        top: 30%;
        left: 60%;
    }

    .detailsFoot-b {
        display: flex;
        flex-direction: column;
        background-color: #9EE786;
        width: 33%;
    }

    .detailsFoot-b p:nth-child(1) i {
        font-size: 80rpx;
        position: relative;
        top: -55%;
        left: 30%;
        color: #08C960;
        background-color: white;
        width: 90rpx;
        padding-left: 10rpx;
        border-radius: 50%;
    }

    .detailsFoot-b p:nth-child(2) {
        width: 90rpx;
        height: 20rpx;
        font-size: 15px;
        text-align: center;
        position: relative;
        top: -45%;
        left: 30%;

    }

    .detailsFoot-c {
        display: flex;
        flex-direction: row;
        background-color: #9EE786;
        width: 33%;
    }

    .detailsFoot-c p:nth-child(1) i {
        font-size: 30px;
        color: #31C9B1;
    }
</style>