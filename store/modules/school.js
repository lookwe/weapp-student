/** 根据配置 自动生成 Vuex 3个步骤
 * 【mutations】使用：根据定义 keyObj 的key值，加上SET 全部大写；例如：userInfo 则 SET_USERINFO
 * 【actions】  使用：根据定义 keyObj 的key值，加上set 驼峰命名；例如：userInfo 则 setUserInfo 
 */
const keyObj = {
    schoolInfo: '网校信息',
    courseInfo: '课程详情',
    videoInfo: '课程视频',
};


// 用户数据模块
const state = {}
// 同步修改
const mutations = {}
// 异步
const actions = {}

for (const [key] of Object.entries(keyObj)) {
    // state 模块
    state[key] = uni.getStorageSync(key) ? uni.getStorageSync(key) : {}

    // mutations 模块
    const mutationName = `SET_${key.toUpperCase()}`
    mutations[mutationName] = (state, obj) => {
        state[key] = obj
    }

    // actions 模块
    const actionName = `set${captureName(key)}`
    actions[actionName] = ({
        commit
    }, obj) => {
        return new Promise((resolve) => {
            // 保存
            commit(mutationName, obj)
            uni.setStorageSync(key, obj)
            resolve()
        })
    }
}

function captureName(name) {
    name = name.substring(0, 1).toUpperCase() + name.substring(1);
    return name;
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}