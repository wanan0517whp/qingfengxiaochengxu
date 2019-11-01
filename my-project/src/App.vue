

<script>


   
    const urls = "http://192.168.50.192:8080/hp-hd/applet/activity/"

    const getActivityList = urls + "getActivityList"   //活动456
    const playerRank = urls + "playerRank"  //排行榜 选手排名
    const giftList = urls + "giftList"      //礼物列表
    const list = urls + "list"              //获取报名 总票数 浏览量
    const activityPlayer = urls + "activityPlayer"  //活动详情页 选手列表
    const player = urls + "player"      //选手详情页
    const groupList = urls + "groupList"       //分组下拉框回显
    const vote = urls + "vote"      //点击投票
    const getAppid = urls +"getAppid"   //获取code openid
    const add = urls + "add"  //图片上传

    export default {
        getActivityList,
        playerRank,
        giftList,
        list,
        activityPlayer,
        player,
        groupList,
        vote,
        getAppid,
        add
    }
</script>
<style>
    /*引入阿里字体图标*/
    @import"../static/fonts/iconfont.css";
</style>