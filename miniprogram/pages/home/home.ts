interface dataType {
    bottomHeight: string | number;
    scrollTop: number;
    keyBordHeight: string;
    userInfo: object;
    weChartHead: any;
    hasUserInfo: boolean;
    inputValue: string;
    listId: number;
    conversationList: any;
}
const get_app = getApp();
export {}
Page({
    data: <dataType>{
        bottomHeight: 0,
        scrollTop: 0,
        keyBordHeight: '104rpx',
        userInfo: {},
        weChartHead: null,
        hasUserInfo: false,
        inputValue: '',
        listId: 0,
        conversationList: []
    },
    inputFocus(e: any) {
        this.setData({
            bottomHeight: (e.detail.height*2 - 83) + 'rpx',
            keyBordHeight: e.detail.height === 0 ? '104rpx' : (e.detail.height*2 + 23) + 'rpx'
        })
    },
    inputBlur() {
        this.setData({
            bottomHeight: 0,
            keyBordHeight: '104rpx'
        })
    },
    bindInputValue(e: any) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    getDisplayArea() {
        let query = wx.createSelectorQuery();
        query.select('.display-area').boundingClientRect(res=> {
            this.setData({
                scrollTop: res.height * 100
            })
        })
        query.exec(res=> {})
    },
    sendMsg() {
        let value = this.data.inputValue;
        this.setData({
            inputValue: ''
        })
        let obj = {
            id: Math.random(),
            request:  value,
            response: [{
                res: '正在思考中...'
            }] 
        }
        let isThink = true;
        let arr = this.data.conversationList;
        arr.push(obj)
        this.setData({
            conversationList: arr
        })
        let socketTask = wx.connectSocket({
            url: 'ws://172.16.218.62:8080/websocket',
            success: (res)=> {
                console.log(res, '发送成功了1')
            },
            fail: err=> {
                console.log(err, '发送失败了')
            }
        })
        socketTask.onOpen(res=> {
            socketTask.send({
                data: value,
                success: res=> {
                    console.log(res, '发送成功了2')
                },
                fail: err=> {
                    console.log(err, '发送失败了')
                }
            })
        })
        socketTask.onMessage(res=> {
            //监听 WebSocket 接受到服务器的消息事件
            let arrRes:any = this.data.conversationList;
            let findIndex = arrRes.findIndex((v:any)=> {
                return v.id === obj.id
            })
            if(isThink) {
                arrRes[findIndex].response = [];
                isThink = false;
            }
            let objj = {
                keyId: Math.random(),
                res: res.data
            }
            arrRes[findIndex].response.push(objj);
            this.setData({
                conversationList: arrRes
            })
            this.getDisplayArea();
        })
    },

    onLoad() {
        this.setData({
            weChartHead: wx.getStorageSync('userMsg').avatarUrl
        })
    },

    onReady() {

    },

    onShow() {
        
    },

    onHide() {

    },

    onUnload() {

    },

    onPullDownRefresh() {

    },

    onReachBottom() {

    },

    onShareAppMessage() {

    }
})