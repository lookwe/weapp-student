/**
 * 请求拦截
 * @param {Object} http
 */
module.exports = (vm) => {
    uni.$u.http.interceptors.request.use((config) => {
            // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
            config.data = config.data || {}


            // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
            config.header['token'] = vm.$store.state.user.token || ''
            return config
        }, (config) =>
        Promise.reject(config))
}