<template>
    <div class="topb">
        <div class="topTime">
            <p>2019-12-31 00:00:00结束</p>
            <p>{{mags}}</p>
        </div>
        <div class="topBang">
            <p>票数排行榜</p>
        </div>
         <div class="topName">
            <div class="topName-a" @click="gowang(hotlista[1].id)">
                <p>No.2</p>
                <p style="width: 70px;height: 70px;margin: 0 auto;margin-top: 20rpx">
                    <img style="width: 90%;height:90%;border-radius: 50%;margin: 0 auto;" :src="hotlista[1].coverImg"
                        alt="">
                </p>
                <p style="color:#B4BCC4;">{{hotlista[1].name}}</p>
                <p>{{hotlista[1].ticket}}票</p>
            </div>

           <div class="topName-b"  @click="gowang(hotlista[0].id)" >
                <p>
                    1
                </p>
                <p style="width: 70px;height: 70px;margin: 0 auto;margin-top: 10rpx;">
                    <img style="width: 100%;height:100%;border-radius: 50%;border:solid 3px #F8E594;"
                        :src="hotlista[0].coverImg" alt="">
                    <img style="width: 100%;height:50%;position: relative;top:-112px;"
                        src="../../../static/images/queens.jpg" alt="">
                </p>
                <p style="color:#7B8793;font-weight: 700;">{{hotlista[0].name}}</p>
                <p>{{hotlista[0].ticket}}票</p>
            </div>

            <div class="topName-c"  @click="gowang(hotlista[2].id)">
                <p>No.3</p>
                <p style="width: 70px;height: 70px;margin: 0 auto;margin-top: 20rpx;">
                    <img style="width: 90%;height:90%;border-radius: 50%;" :src="hotlista[2].coverImg" alt="">
                </p>
                <p style="color:#B4BCC4;">{{hotlista[2].name}}</p>
                <p>{{hotlista[2].ticket}}票</p>
            </div>

        </div> 

        <!-- 第三名以后的 -->
        <div class="topName-d">
            <div class="topName-dd" @click="godetails(v.id)" v-for="(v,index) in hotlist" :key="index">
                <div class="topNmaeD-a">
                    <p style="width: 60px;height: 60px;margin: 0 auto;">
                        <img style="width: 100%;height:100%;border-radius: 50%;margin-top: 30%;"
                            :src="v.coverImg" alt="">
                    </p>
                </div>
                <div class="topNmaeD-b">
                    <p>{{v.name}}</p>
                    <p>{{v.ticket}}票</p>
                </div>
                <div class="topNmaeD-c">
                    {{index+4}}
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
    import Flys from "../../App"

    export default {
        data() {
            return {
                days: 1,//天
                hous: 1,//时
                mous: 1,//分
                sed: 1,//秒
                mags: "",
                hotlist: [],    //后七名
                hotlista:[],    //前三名
                endtime:"" , //活动截止时间
                playerid:"" 
            }
        },
        // created() {
           
                
        // },
        onLoad(options) {
            // console.log(options,"+++++----+++++")
               this.playerid = options.id;
               this.conuttiem()
               this.playerRanks()
        },
        methods: {
            godetails(id) {
                // console.log(id,"ididididiidi")
                wx.navigateTo({
                    url: "../wang/main?id=" + id     //跳转选手详情页面
                })
            },
            gowang(id){
                console.log(id,"555555555555522222222222")
                wx.navigateTo({
                    url: "../wang/main?id="+id    //跳转选手详情页面
                })
            },

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
                    this.mags = this.days + "天" + this.hous + "时" + this.mous + "分" + this.sed + "秒"
                    timeid = setInterval(this.conuttiem, 1000);
                       if(this.hous<10){ 
                        this.hous="0"+this.hous
                       }
                } else {
                    // console.log("活动结束")
                    this.mags = "活动结束";
                    clearInterval(timeid)

                }

            },
            
            playerRanks() {
                this.$fly.post(Flys.playerRank, { activityId: 1 }).then(res => {
                    console.log(res, "选手排行榜")
                    this.hotlist = res.data.data.playerList1     //获取排行后七
                    this.hotlista = res.data.data.playerList    //获取选手排行前三
                    this.endtime = res.data.data.hdActivity.end     //获取结束时间
                    this.conuttiem()        //调用定时器
                    // console.log(this.hotlist, "选手排行榜")
                    // for (var i = 0; i < this.hotlist.length; i++) {
                    //     if (i < 3) {
                    //         this.arrs.push(this.hotlist[i])
                    //     } else {
                    //         this.arre.push(this.hotlist[i])
                    //     }   
                    // }                  
                    // console.log(this.arrs,"排行榜前三名")
                    // console.log(this.arre,"排行榜后七名")
                })
            }

        }
    }




</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .topb {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

    }

    .topTime {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 150rpx;
        background-color: #F7F7F7;
        color: #9A9FA5;
        text-align: center;
        font-size: 15px;
        line-height: 30px;
        padding-top: 20rpx;
    }

    .topBang {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100rpx;
        font-size: 16px;
        background-color: #33C8B1;
        color: white;
        text-align: center;
        line-height: 100rpx;
    }

    .topName {
        display: flex;
        flex-direction: row;
        width: 94%;
        height: 400rpx;
        /* border: solid 1px red; */
        margin: 0 auto;
        margin-top: 40px;

    }

    .topName-a,
    .topName-b,
    .topName-c {
        display: flex;
        flex-direction: column;
        width: 31%;
        margin: 0 auto;
    }


    .topName-a p:nth-child(1),
    .topName-a p:nth-child(3),
    .topName-a p:nth-child(4),
    .topName-b p:nth-child(1),
    .topName-b p:nth-child(3),
    .topName-b p:nth-child(4),
    .topName-c p:nth-child(1),
    .topName-c p:nth-child(3),
    .topName-c p:nth-child(4) {
        font-size: 17px;
        text-align: center;
    }

    .topName-a p:nth-child(1),
    .topName-c p:nth-child(1) {
        color: #FCCC46;
    }


    .topName-a p:nth-child(1),
    .topName-c p:nth-child(1) {
        margin-top: 30rpx;
    }

    .topName-a p:nth-child(4),
    .topName-b p:nth-child(4),
    .topName-c p:nth-child(4) {
        color: #3FBFA4;
        font-weight: 700;
    }

    .topName-b p:nth-child(3) {
        margin-top: 20rpx;
    }

    .topName-b p:nth-child(4) {
        font-size: 18px;
    }

    .topName-d {
        display: flex;
        flex-direction: column;
        width: 94%;
        height: 100%;
        margin: 0 auto;
        border-top: solid 1px #F7F7F7;
    }

    .topName-dd {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 180rpx;
        border-bottom: solid 1px #F7F7F7;
        color: #A5AFB7;
    }
    
    .topNmaeD-a {
        width: 30%;
        height: 150rpx;
    }

    .topNmaeD-b {
        display: flex;
        flex-direction: column;
        width: 60%;
        height: 150rpx;
        margin-top: 25rpx;
        line-height: 65rpx;
        font-size: 16px;
    }

    .topNmaeD-c {
        width: 10%;
        height: 150rpx;
        line-height: 180rpx;
        font-size: 16px;
        color: #33C8B1;
    }
</style>