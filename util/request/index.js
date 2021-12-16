// 引入配置
import {
	baseURL,
	devUrl,
	prodUrl,
	contentType,
	showLoading,
	loadingText,
	loadingTime,
	originalData,
	loadingMask,
} from '@/common/config'

// 初始化请求配置
uni.$u.http.setConfig((defaultConfig) => {
	/* defaultConfig 为默认全局配置 */
	defaultConfig = {
		...defaultConfig,
		baseURL: process.env.NODE_ENV === 'development' ? devUrl : prodUrl,
		
		showLoading,
		loadingText,
		loadingTime,
		originalData, 
		loadingMask,
	}
	return defaultConfig
})

module.exports = (vm) => {
	require('./requestInterceptors')(vm)
	require('./responseInterceptors')(vm)
}
