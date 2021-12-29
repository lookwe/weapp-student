// 引入配置
import {
    baseURL,
    devUrl,
    prodUrl,
    showLoading,
    loadingText,
    loadingTime,
    originalData,
    loadingMask,
    contentType
} from '@/common/config'

module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((defaultConfig) => {
        /* defaultConfig 为默认全局配置 */
        const config = {
            ...defaultConfig,
            baseURL: process.env.NODE_ENV === 'development' ? devUrl : prodUrl,

            showLoading,
            loadingText,
            loadingTime,
            originalData,
            loadingMask,

            // 默认请求头
            header: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': contentType,
                'authority': 'edu.juhezaixian.cn',
            }
        }
        console.log(config);
        return config
    })
    require('./requestInterceptors')(vm)
    require('./responseInterceptors')(vm)
}