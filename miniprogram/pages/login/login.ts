interface LoginData {
    data: {
        canIUse: boolean
    }
}
const get_app = getApp();
export {}
Page(<LoginData>{
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },

    onLoad() {

    },

    getUserInfo() {
        wx.getUserProfile({
            desc: '获取你的昵称',
            success: res=> {
                console.log(res)
                let userMsg = {
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl
                }
                wx.setStorageSync('userMsg', userMsg);
                wx.reLaunch({
                    url: '/pages/home/home'
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})