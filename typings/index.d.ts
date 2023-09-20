/// <reference path="./types/index.d.ts" />
interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo | null,
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}