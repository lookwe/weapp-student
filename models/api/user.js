const BASE_URL = 'netschool'

/*
 * 学员接口
 * @Author: 2726768601@qq.com
 * @Date: 2021-11-39 09:59:28
 * @LastEditTime: 2021-11-30 09:59:28
 */
export default {
    logout: '',
    getInfo: '',
    login: BASE_URL + '/app/member/login',

    getRegisterAgreement: BASE_URL + '/app/member/getRegisterAgreement',  // 注册前相关协议
    updateMemberInfo: BASE_URL + '/app/member/updateMemberInfo', // 修改用户信息
    resetPasswrod: BASE_URL + '/app/member/resetPasswrod',   // 重置密码

}
