const {
    http
} = uni.$u
import apis from './api/homePage.js'

// APP首页模块
class homePageModel {

    /**
     * 首页获取 课程列表(分页)
     * @author huangzhongfei
     * @date 2021-11-2
     * @returns {any}
     */
    static getCourses(params) {
        return http.get(apis.getCourses, {
            params
        })
    }

    /**
     * 课程列表
     * @author huangzhongfei
     * @date 2021-11-2
     * @returns {any}
     */
    static findCourseByName(params) {
        return http.get(apis.getCourseList, {
            params
        })
    }


    /**
     * 首页获取 轮播图
     * @author huangzhongfei
     * @param {any} positionType 是否VIP， [1=非VIP， 2=VIP]
     * @date 2021-11-2
     * @returns {any}
     */
    static getBanners(positionType = 1, config) {
        return http.get(apis.getBanners, {
            params: {
                positionType
            }
        }, config)
    }

    /**
     * 首页获取 网校消息
     * @author huangzhongfei
     * @date 2021-11-2
     * @returns {any}
     */
    static getSchoolInfo() {
        return http.get(apis.getSchoolInfo, {})
    }

    /**
     * 首页获取 课程菜单树
     * @author huangzhongfei
     * @date 2021-11-2
     * @returns {any}
     */
    static getCouresTree() {
        return http.get(apis.getCouresTree, {})
    }
}
export default homePageModel