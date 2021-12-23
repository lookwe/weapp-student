// 用户数据模块
const state = {
    /** 网校 */
    schoolInfo: uni.getStorageSync('schoolInfo') ? uni.getStorageSync('schoolInfo') : {},

    /** 课程详情 */
    courseInfo: uni.getStorageSync('courseInfo') ? uni.getStorageSync('courseInfo') : {},

}
// 同步修改
const mutations = {
    SET_SCHOOLINFO: (state, schoolInfo) => {
        state.schoolInfo = schoolInfo
    },
    SET_COURSEINFO: (state, courseInfo) => {
        state.courseInfo = courseInfo
    },
}

// 异步
const actions = {
    // 保存网校
    setSchoolInfo({
        commit
    }, schoolInfo) {
        return new Promise((resolve, reject) => {
            // 保存
            commit('SET_SCHOOLINFO', schoolInfo)
            uni.setStorageSync('schoolInfo', schoolInfo)
            resolve()
        })
    },

    // 保存课程
    setCourseInfo({
        commit
    }, courseInfo) {
        return new Promise((resolve, reject) => {
            // 保存
            commit('SET_COURSEINFO', courseInfo)
            uni.setStorageSync('schoolInfo', courseInfo)
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