// 退出登录
function LogBackIn() {
    setTimeout(() => {
        uni.$u.route({
            url: 'pages/login/login',
            params: {
                toPage: 'lisa'
            }
        })
    }, 1000)
}

/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
    uni.$u.http.interceptors.response.use((response) => {
        const data = response.data || {}
        // 自定义参数，设置动画logding
        //const custom = response.config ? .custom

        if (data.code !== 200) {
            // 不是200 则标识失败
            console.log(123411111);
            uni.$u.toast(data.text)

            // ['强制退出', 'token过期', '无效token']
            if ([5003, 5002, 5001].includes(data.code)) {
                LogBackIn()
            }
        }
        return data.data
    }, (response) => {
        /*  对响应错误做点什么 （statusCode !== 200）*/
        let {
            statusCode = 404, message = '请求异常'
        } = response.data || {}

        switch (statusCode) {
            case 400:
                message = response.data.title || '请求失败'
                break

            case 401:
                message = '授权失败，请检查token'
                break

            case 403:
                message = '拒绝访问'
                break

            case 404:
                message = `请求${response.config.url
				.split('/')
				.pop()
				.replace(/\.html/, '')}接口出错`
                break

            case 408:
                message = '请求超时'
                break

            case 500:
                message = '服务器内部错误'
                break

            case 501:
                message = '服务未实现'
                break

            case 502:
                message = '网关错误'
                break

            case 503:
                message = '服务不可用'
                break

            case 504:
                message = '网关超时'
                break

            case 505:
                message = 'HTTP版本不受支持'
                break

            default:
        }

        uni.$u.toast(message)
        return Promise.reject(response)
    })
}