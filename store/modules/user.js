// 用户数据模块
// import UserServe from '@/common/models/user.js'

const getDefaultState = () => {
	return {
		userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
		token: uni.getStorageSync('token') ? uni.getStorageSync('token') : {},
		name: '',
	}
}

const state = getDefaultState()

// 同步修改
const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
	}
}

// 异步
const actions = {
	// user login
	login({
		commit
	}, userInfo) {
		return new Promise((resolve, reject) => {
			if (!userInfo) {
				reject({ msg: '没有获取到内容~~'})
			}
			// 保存
			commit('SET_TOKEN', userInfo.token)
			uni.setStorageSync('token', userInfo.token)

			commit('SET_USERINFO', userInfo)
			uni.setStorageSync('userInfo', userInfo)

			resolve({ code: 200, msg: '成功'})
		})
	},

	logout({
		commit
	}) {
		return new Promise((resolve, reject) => {
			try {
				uni.removeStorageSync('userInfo')
				uni.removeStorageSync('token')
				commit('RESET_STATE')

				// 去首页
				// router.push({ path: '/' })

				resolve()
			} catch (error) {
				reject(error)
			}
		})
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
