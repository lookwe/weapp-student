import keyObj from '../custom'
import {
    captureName
} from '@/util/utils'

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

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}