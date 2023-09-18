const { baseUrl } = require('./env').dev

const interceptors: any = [];

const request = (options: any) => {
    const defaultOptions ={
        url: `${baseUrl}`,
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    }

    const requestOptions = Object.assign(defaultOptions, options);
    requestOptions.interceptors = interceptors;

    return new Promise((resolve: any, reject: any) => {
        wx.request({
            ...requestOptions,
            success: ({ statusCode, data }) => {
                if(statusCode >= 200 && statusCode < 300) {
                    resolve(data)
                }else{
                    reject(data)
                }
            },
            fail: reject
        })
    })
}

request.requestInterceptor = (fn: any)=> {
    interceptors.push(fn)   
}

const tokenInterceptor = async(options: any) => {
    if(!options.noAuth) {
        const token = wx.getStorageSync('key');
        if(!token) {
            wx.redirectTo({
                url: '/pages/login/login'
            })
            return
        }else{
            options.header.Authorization = ``
        }
    }
    return options
}

request.requestInterceptor(tokenInterceptor);

module.exports = {
    request
}

