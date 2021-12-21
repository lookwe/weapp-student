// 公共接口

import apis from './api/courses'
const {
    http
} = uni.$u


class publicApi {
    /**
     * 获取单科课程详情(单)
     * @author huangzhongfei
     * @date 2021-11-1
     * @param {any} schoolCourseId 网校上架课程id 
     * @returns {any}
     */
    static getDownloadSignedUrl({
        schoolCourseId
    }) {
        return http.get(apis.getCourseDetail, {
            params: {
                schoolCourseId
            }
        })
    }

    /**
     * 获取全科课程详情(全)
     * @author huangzhongfei
     * @param {any} schoolCourseId 网校上架课程id 
     * @date 2021-11-5
     * @returns {any}
     */
    static getGeneralInfo({
        schoolCourseId
    }) {
        return http.get(apis.getGeneralPracticeCourseDetail, {
            params: {
                schoolCourseId
            }
        })
    }

    /**
     * 获取全科课程详情(全)
     * @author huangzhongfei
     * @param {any} schoolCourseId 网校上架课程id 
     * @date 2021-11-5
     * @returns {any}
     */
    static getGeneralInfoV2({
        schoolCourseId,
        classTypeNo
    }) {
        return http.get(apis.getGeneralPracticeCourseDetailV2, {
            params: {
                schoolCourseId,
                classTypeNo
            }
        })
    }

    /**
     * 获取能够使用哪些功能的权限
     * @author huangzhongfei
     * @param {any} classTypeNo  班型编号
     * @date 2021-11-10
     * @returns {any}
     */
    static getClassTypeModule({
        classTypeNo
    }) {
        return http.get(apis.getClassTypeModule, {
            params: {
                classTypeNo
            }
        })
    }

    /**
     * 获取录播视频
     * @author huangzhongfei
     * @param {any} courseNo  课程编号
     * @param {any} recordingType  录播类型 1: 章节录播 2: 基础课录播 3:进阶课录播
     * @date 2021-11-10
     * @returns {any}
     */
    static getRecordingCourseDutyList({
        courseNo,
        recordingType
    }) {
        return http.post(apis.getRecordingCourseDutyList, {
            courseNo,
            recordingType
        })
    }

    /**
     * 获取习题
     * @author huangzhongfei
     * @param {any} courseNo  课程编号
     * @param {any} type  类型（1=章节综合习题，2=进阶综合习题）
     * @date 2021-11-10
     * @returns {any}
     */
    static getExams({
        courseNo,
        type
    }) {
        return http.post(apis.getExams, {
            courseNo,
            type
        })
    }

    /**
     * 获取资料
     * @author huangzhongfei
     * @param {any} courseNo  课程编号
     * @param {any} type  类型（1=基础资料，2=进阶资料）
     * @date 2021-11-10
     * @returns {any}
     */
    static getMaterials({
        courseNo,
        type
    }) {
        return http.post(apis.getMaterials, {
            courseNo,
            type
        })
    }

    /**
     * 根据课程编号，查询课程介绍
     * @author huangzhongfei
     * @param {any} courseNo  课程编号
     * @date 2021-11-23
     * @returns {any}
     */
    static getCourseInfoById(courseNo) {
        return http.get(apis.getCourseInfo, {
            params: {
                courseNo
            }
        })
    }


}
export default publicApi