/**
 * @copyright
 * @description 全局变量配置
 */
module.exports = {
    // baseURL: 'http://nsapi.sxmaps.com/services/',
    // 开发环境接口Url
    devUrl: 'http://nsapi.sxmaps.com/services/',
    // 线上环境接口Url
    prodUrl: 'http://nsapi.sxmaps.com/services/',

    // 应用名
    name: 'Saas网校',

    // 版本号
    version: '1.0.0',

    // 配后端数据的接收方式application/json;charset=UTF-8 或者 application/x-www-form-urlencoded;charset=UTF-8
    contentType: 'application/json;charset=UTF-8',

    // 后端返回状态码，如code,status
    codeName: 'code',

    // 是否显示请求中loading
    showLoading: true,

    // 请求loading的文字提示
    loadingText: '请求中...',

    // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    loadingMask: true,

    // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    loadingTime: 800,

    // 是否在拦截器中返回服务端的原始数据
    originalData: false,

    // 公众号appid
    wechatAppId: 'wxaab7c9d05615853f',
    // 公众号授权方式snsapi_base或snsapi_userinfo
    wechatScope: 'snsapi_userinfo',
}