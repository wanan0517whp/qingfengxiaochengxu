<template>
    <div class="baoming">
        <div class="baoming-zaixian">
            <p>在线报名</p>
        </div>

        <!-- 报名信息列表 -->
        <div class="baoming-xinxi">
            <div class="xinxi-name">
                <p>选手名称</p>
                <p><input type="text" placeholder="请输入选手名称" v-model="userName" style="line-height: 80rpx;"></p>
            </div>

            <div class="xinxi-phone">
                <p>手机号</p>
                <p><input type="number" placeholder="请输入手机号" v-model="userPhone" maxlength="11"
                        style="line-height: 80rpx;"></p>
            </div>

            <div class="xinxi-fenzu">
                <p>分组</p>
                <p>
                    <picker class="grouping" @change="bindPickerChange" :value="index" :range="array">
                        <view class="picker">
                            {{array[index]}}
                            <i class="arrowDown"></i>
                        </view>
                    </picker>
                </p>
            </div>

            <div class="xinxi-miaoshu">
                <p>选手描述</p>
                <p><textarea placeholder="请输入选手描述" v-model="userDescribe"></textarea></p>
            </div>
        </div>


        <!-- 选择照片 -->
        <div class="weui-uploader__bd th-backwhite clearfix">
            <div class="weui-uploader__input-box">
                <div class="weui-uploader__files" id="uploaderFiles">
                    <block v-for="(item,index) in files" :key="index">
                        <div class="weui-uploader__file posi-rela" @click="predivImage" :id="item">
                            <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImg(index)" />
                            <image style="width: 100%;height: 100%;" class="weui-uploader__img" :src="item"
                                mode="aspectFill" />
                        </div>
                    </block>
                    <div class="weui-uploader__input" v-if="show">
                        <p @click="chooseImage">+</p>
                    </div>
                </div>

            </div>
        </div>

        <div class="th-submit-btn" @click="btnSubmission">提交</div>

    </div>

</template>

<script>
    import Flys from "../../App"
    export default {
        data() {
            return {
                array: [
                    "全部  ∨",
                    "分组1",
                    "分组2",
                    "分组3"
                ],
                files: [],
                filesOnline: [],

                index: 0,
                //用户名
                userName: '',
                //手机号
                userPhone: '',
                //默认下标为0
                indexs: 0,
                //选手描述
                userDescribe: '',
                //后台传至bs64
                base64: [],
                //判断分组
                grouping: false,
                //添加图片按钮
                show: true,
            }
        },
        created() {
            this.groupList()    //分组下拉列表
        },
        methods: {
            //选取图片
            chooseImage(e) {
                var _this = this;
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'], //原图和压缩图
                    sourceType: ['album', 'camera'],  //来源是相机还是相册
                    success: function (res) {
                        console.log(res, "weishenme")
                        let base64 = wx
                            .getFileSystemManager()     //获取全局唯一的文件管理
                            .readFileSync(res.tempFilePaths[0], "base64");  //异步读取文件
                        res.tempFilePaths.forEach(v => {    //循环遍历   tempFilePaths成功回调的数组字段
                            _this.files.push(v);    //将选择的图片添加到图片数组
                            _this.base64.push({ img: "data:image/png;base64," + base64 })   //将转换成base64的图片添加到本地
                        });
                        console.log(base64, "base64格式")
                        if (_this.files.length < 3) {
                            _this.show = true;  //当图片小于三张时 显示添加图片按钮
                        } else {
                            wx.showModal({
                                title: '提示',
                                content: '照片最多上传三张!',
                            })
                            _this.show = false;     //大于三张时 提示用户并隐藏添加图片按钮
                        }
                    }
                })
            },
            predivImage(e) {
                console.log(e);
                wx.previewImage({
                    current: e.currentTarget.id, // 当前显示图片的http链接
                    // current: this.files[index],
                    urls: this.files // 需要预览的图片http链接列表
                })
            },
            deletImg(index) {
                this.files.splice(index, 1)     //点击删除按钮时 删除图片
                this.filesOnline.splice(index, 1)   //点击删除按钮时删除选择的按钮
                if (this.files.length < 3) {
                    this.show = true;   //当图片小于3张 显示添加图片按钮
                }
            },

            //提交数据
            btnSubmission() {
                console.log(this.userInfo + "///")
                let slef = this;
                let phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
                var extend1;
                if (this.userInfo == 1) {
                    extend1 == 0;
                } else {
                    extend1 == 1;
                }
                console.log(extend1, 'extend1');
                if (slef.userName == "") {
                    wx.showToast({
                        title: '用户名不能为空',
                        icon: 'none',
                        duration: 1500
                    });
                } else if (slef.userPhone == "") {
                    wx.showToast({
                        title: '手机号不能为空',
                        icon: 'none',
                        duration: 1500
                    });
                } else if (!phonetel.test(slef.userPhone)) {
                    wx.showToast({
                        title: '手机号码有误',
                        icon: 'none',
                        duration: 1500
                    });
                }else if(this.index == 0){
                    wx.showToast({
                        title: '分组不能为空',
                        icon: "none",
                        duration: 1500
                    });
                }
                 else if (slef.base64 == "") {
                    wx.showToast({
                        title: '图片不能为空',
                        icon: "none",
                        duration: 1500
                    });
                } else {
                    wx.showLoading({
                        title: "正在提交...",
                        duration: 1500
                    });
                    let newBase64 = JSON.stringify(slef.base64);
                    if (this.grouping) {
                        this.$fly.post($Flys.add.userData, {     //提交数据的后台接口
                            activityID: this.globalData.actid,      //字段名
                            name: slef.userName,
                            tel: slef.userPhone,
                            describes: slef.userDescribe,
                            url: newBase64,
                            extend1: extend1,
                            groupID: this.groupID
                        })
                            .then(response => {
                                console.log(response.data, "response+++");
                                if (response.data.code == 0) {
                                    self.userName = "",
                                        self.userPhone = "",
                                        self.userDescribe = "",
                                        slef.files = [],
                                        slef.show = true,
                                        slef.base64 = []

                                    // wx.showToast({
                                    //   title: "提交成功...",
                                    //   icon: "success",
                                    //   duration: 2000
                                    // });

                                    // 判断报名是否需要审核
                                    if (this.userInfo == 1) {
                                        wx.showModel({
                                            title: '提交成功',
                                            content: "本活动报名需要进行资料审核，请您耐心等待",
                                            shoeCancel: false,
                                            success: function (res) {
                                                if (res.confirm) {
                                                    console.log("用户点击确定");
                                                    mpvue.reLaunch({
                                                        url: "../isindex.main"
                                                    });
                                                } else {
                                                    console.log("用户点击取消");
                                                }
                                            }
                                        });
                                    }
                                    if (this.userInfo == 0) {
                                        wx.showModel({
                                            title: "提示!",
                                            content: "报名成功!",
                                            shoseCancel: false,
                                            success: function (res) {
                                                if (res.confirm) {
                                                    console.log("用户点击确定")
                                                    mpvue.reLaunch({
                                                        url: "../isindex/main"
                                                    });
                                                }
                                                else (
                                                    console.log("用户点击取消")
                                                )
                                            }
                                        });
                                    }
                                } else {
                                    wx.showToast({
                                        title: response.data.msg,
                                        icon: "none",
                                        duration: 1500
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    } else {
                        this.$fly.post(Flys.add.userData, {
                            activityID: this.globalData.actid,
                            name: slef.userName,
                            tel: slef.userPhone,
                            describes: slef.userDescribe,
                            url: newBase64,
                            extend1: extend1,
                            groupID: ""
                        }).then(response => {
                            if (response.data.code == 0) {
                                self.userName = "",
                                    self.userPhone = "",
                                    self.userDescribe = "",
                                    slef.files = [],
                                    slef.show = true,
                                    slef.base64 = [];
                                wx.showToast({
                                    title: "提交成功",
                                    icon: "success",
                                    duration: 1500
                                });
                                setTimeout(function () {
                                    mpvue.reLaunch({
                                        url: "../isindex/main"
                                    });
                                }, 1000);
                            } else {
                                wx.showToast({
                                    title: response.data.msg,
                                    icon: "none",
                                    duration: 1500
                                });
                            }
                        })
                            .catch(error => {
                                console.log(error)
                            });
                    }
                }
            },

            //获取分组里面的内容
            // groups() {
            //     this.$fly
            //         .post(Apps.groupList, {
            //             activityId: this.globalData.actid
            //         })
            //         .then(response => {
            //             // console.log("=----------------------");
            //             for (var i = 0; i < response.data.data.groupList.length; i++) {
            //                 this.array.push(response.data.data.groupList[i].name);
            //                 this.arrayId.push(response.data.data.groupList[i].id);
            //             }
            //             this.userInfo = response.data.data.hdActivity.audit;
            //             // console.log(this.userInfo);
            //         })
            //         .catch(error => {
            //             console.log(error);
            //         });
            // },

            //分组方法
            bindPickerChange(e) {
                this.index = e.mp.detail.value;
            },
            groupList() {
                this.$fly.post(Flys.groupList).then(res => {
                    console.log(res, "分组下拉列表")
                    this.groupList = res.data.data  //分组下拉列表

                })
            },
            add() {
                this.$fly.post(Flys.add).then(res => {
                    console.log(res, "报名图片接口")
                    // this.Listofplayers = res.data.rows
                })
            }
        },
        bindTextAreaBlur: function (e) {
            console.log(e.detail.value);
            var that = this;
            that.setData({
                details: e.detail.value
            });
        }
    }


</script>


<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .baoming {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0 auto;
    }

    .baoming-zaixian {
        text-align: center;
        width: 94%;
        margin: 0 auto;
        height: 80rpx;
        margin-top: 3%;
        font-weight: 700;
        border-bottom: solid 1px #F1F1F2;
    }

    .baoming-xinxi {
        display: flex;
        flex-direction: column;
        width: 94%;
        height: 550rpx;
        margin: 0 auto;
    }

    .xinxi-name,
    .xinxi-phone,
    .xinxi-fenzu,
    .xinxi-miaoshu {
        display: flex;
        flex-direction: row;
        margin-top: 4%;
    }

    .xinxi-name p:nth-child(1),
    .xinxi-phone p:nth-child(1),
    .xinxi-fenzu p:nth-child(1),
    .xinxi-miaoshu p:nth-child(1) {
        width: 30%;
        font-size: 16px;
        color: #9BA7C1;
        line-height: 80rpx;
    }

    .xinxi-name p:nth-child(2),
    .xinxi-phone p:nth-child(2),
    .xinxi-fenzu p:nth-child(2),
    .xinxi-miaoshu p:nth-child(2) {
        width: 60%;
        height: 60rpx;
        font-size: 16px;
        background-color: #FAFBFD;
        /* text-indent: 20rpx; */
        padding-left: 20rpx;
        border: solid 1px #F1F1F2;
        padding-top: 2%;
    }

    .xinxi-miaoshu p:nth-child(2) {
        width: 60%;
        height: 150rpx;
    }

    .xinxi-miaoshu p textarea {
        width: 90%;
        height: 150rpx;
    }

    .baoming-photo {
        display: flex;
        flex-direction: column;
        width: 94%;
        height: 300rpx;
        margin: 0 auto;
    }

    .baoming-photo p:nth-child(1) {
        font-size: 15px;
        height: 40rpx;
        color: #B7BABB;
        margin-bottom: 3%;
    }

    .baoming-photo p:nth-child(2) {
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 30px;
        color: #B7BABB;
        border: solid 1px #B7BABB;
    }

    /* .baoming-tijiao {
        display: flex;
        position: fixed;
        bottom: 0;
        flex-direction: row;
        width: 94%;
        height: 80rpx;
        margin: 0 auto;
    }

    .baoming-tijiao button {
        width: 100%;
        height: 80rpx;
        border-radius: 0;
        background-color: #1AAD19;
        color: white;
        text-align: center;
        line-height: 80rpx;
        font-size: 15px;
    }
 */

    .th-icon-cancel {
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        right: -14rpx;
        top: -14rpx;
    }

    .weui-uploader__input {
        float: left;
        padding: 10rpx;
    }

    .weui-uploader__input p {
        width: 140rpx;
        height: 140rpx;
        border: dashed 1px #EADFDD;
        text-align: center;
        font-size: 30px;
        color: gray;
        line-height: 130rpx;

    }

    .weui-uploader__input-box {
        margin-right: 0;
    }

    .weui-uploader__bd {
        margin-bottom: 0;
    }

    .posi-rela {
        position: relative;
        overflow: visible;
        width: 140rpx;
        height: 140rpx;
        margin: 10rpx 10rpx;
        float: left;
    }

    .weui-uploader__file:nth-child(4n) {
        margin-right: 0;
    }

    .th-backwhite {
        width: 750rpx;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom: 4rpx solid #f5f5f5;
    }

    /* 绿色贯穿按钮 */
    .th-submit-btn {
        width: 690rpx;
        height: 90rpx;
        line-height: 90rpx;
        background-color: #18c136;
        margin: 50rpx auto;
        color: #fff;
        font-size: 34rpx;
        text-align: center;
        border-radius: 6rpx;
    }
</style>