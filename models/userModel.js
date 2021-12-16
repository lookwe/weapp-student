const { http } = uni.$u
import apis from './api/user'


/*
 * @Author: 2726768601@qq.com
 * @Date: 2021-11-39 09:59:28
 * @LastEditTime: 2021-11-30 09:59:28
 */
class UserModel {
  /**
   * 用户登录
   * @author Joshua
   * @date 2021-11-1
   * @param {any} password 账号
   * @param {any} {username} 密码
   * @returns {any}
   */
  static login(params, config) {
      return http.post(apis.login, params, config)
  }


  /**
   * 退出登录
   * @author Joshua
   * @date 2021-11-1
   * @returns {any}
   */
  static logout(params, config) {
    return http.post(apis.logout, params, config)
  }
}
export default UserModel