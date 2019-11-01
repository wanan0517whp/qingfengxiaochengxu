<template>
    <div class="diaocha">
        <div class="diaocha-titles">
            <p>宏鹏教育学员问卷调查</p>
        </div>
        <div class="diaocha-logo">
            <img src="../../../static/images/hplogo.png" alt="">
        </div>
        <div class="diaocha-xin">
            <!-- <p class="diaocha-xin-sanj"></p> -->
            <p style="text-indent: 20px;">您好！</p>
            <p style="width: 90%;margin: 0 auto;">
                人这一辈子，有一条明显的界线——三十五岁。三十五岁以前，时间过得很慢，像蜗牛在爬。三十五岁以后，却过得飞快，似乎眨眼之间，一年过去了，好像都没做什么事。似乎一夜之间，两鬓便有了几根刺眼的白发，好像都没忙过什么、累过什么。
            </p>
        </div>
        <div class="diaocha-lie">
            <div class="lie-name">
                <p>姓名</p>
                <p><input type="text"></p>
            </div>
            <div class="lie-age">
                <p>年龄</p>
                <p><input type="text"></p>
            </div>
            <div class="lie-sex">
                <p>性别</p>
                <p>
                    <radio-group class="radio-group" bindchange="radioChange">
                        <label class="radio">
                            男
                            <radio value="" checked="" />
                        </label>
                        <label class="radio">
                            女
                            <radio value="" checked="" />
                        </label>
                    </radio-group>

                </p>
            </div>
            <div class="lie-xl">
                <p>学历</p>
                <p>
                    <radio-group class="radio-group radio-group-lie" bindchange="radioChange">
                        <label class="radio">
                            <radio value="" checked="" />
                            初中
                        </label>
                        <label class="radio">
                            <radio value="" checked="" />
                            高中
                        </label>
                        <label class="radio">
                            <radio value="" checked="" />
                            中专
                        </label>
                        <label class="radio">
                            <radio value="" checked="" />
                            大专
                        </label>
                        <label class="radio">
                            <radio value="" checked="" />
                            本科
                        </label>
                    </radio-group>
                </p>
            </div>
            <div class="lie-kc">
                <p>报名的课程</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {

        data() {
            return {

            }

        }

    }




</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .diaocha {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 2000rpx;
        border: solid 1px red;
    }

    .diaocha-titles {
        display: flex;
        flex-direction: row;
        width: 94%;
        height: 80rpx;
        margin: 0 auto;
        /* border: solid 1px red; */
        font-size: 17px;
        line-height: 80rpx;
        font-weight: 700;
    }

    .diaocha-logo {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .diaocha-logo img {
        width: 100%;
        height: 270rpx;
    }

    .diaocha-xin {
        display: flex;
        flex-direction: column;
        width: 94%;
        height: 400rpx;
        margin: 0 auto;
        border: solid 1px #EBEBEB;
        font-size: 15px;
        text-indent: 20px;
        line-height: 50rpx;
        margin-top: 8%;
        box-shadow: #EBEBEB 0px 0px 10px 2px;
        border-radius: 30rpx;
    }

    .diaocha-lie {
        display: flex;
        flex-direction: column;
        width: 94%;
        height: 600rpx;
        /* border: solid 1px blue; */
        margin: 0 auto;
        margin-top: 5%;
    }

    .lie-name,
    .lie-age,
    .lie-sex,
    .lie-xl {
        display: flex;
        flex-direction: row;
        padding-bottom: 15px;
        border-bottom: solid 1px #EBEBEB;
    }

    .lie-name p:nth-child(1),
    .lie-age p:nth-child(1),
    .lie-sex p:nth-child(1),
    .lie-xl p:nth-child(1) {
        width: 15%;
        font-size: 17px;
        margin-top: 10px;
    }

    .lie-name p:nth-child(2),
    .lie-age p:nth-child(2),
    .lie-sex p:nth-child(2),
    .lie-xl p:nth-child(2) {
        width: 54%;
        /* border: solid 1px red; */
        margin-top: 10px;
        border-radius: 20px;
        text-indent: 10px;
    }

    .diaocha-lie input {
        width: 100%;
        height: 10px;
        font-size: 17px;
        border: solid 1px #EBEBEB;
        border-radius: 20px;
    }

    .lie-kc {
        display: flex;
        flex-direction: column;
        font-size: 17px;
    }

    .radio-group{
        font-size: 15px;
    }

    .radio-group-lie{
        display: flex;
        flex-direction: column;
    }
</style>