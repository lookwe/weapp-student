/** 根据配置 自动生成 Vuex 3个步骤
 * 【mutations】使用：根据定义 keyObj 的key值，加上SET 全部大写；例如：userInfo 则 SET_USERINFO
 * 【actions】  使用：根据定义 keyObj 的key值，加上set 驼峰命名；例如：userInfo 则 setUserInfo 
 * 【getters】  使用：根据定义 keyObj 的key值，加上get 驼峰命名；例如：userInfo 则 getUserInfo 
 */
const keyObj = {
    schoolInfo: '网校信息',
    courseInfo: '课程详情',
    videoInfo: '课程视频',
};

export default keyObj