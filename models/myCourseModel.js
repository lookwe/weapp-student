// 学习中心

import apis from './api/myCourse'


const {
    http
} = uni.$u

class myCourse {
    /**
     * 获取课程列表
     * @author huangzhongfei
     * @date 2021-11-12
     * @returns {any}
     */
    static getAllCourse() {
        return http.get(apis.getAllCourse, {})
    }

    /**
     * 获取能够使用哪些功能的权限
     * @author huangzhongfei
     * @param {any} ordersItemNo 子订单编号 
     * @date 2021-11-1
     * @returns {any}
     */
    static getClassTypeModule(ordersItemNo) {
        return http.get(apis.getClassTypeModule, {
            params: {
                ordersItemNo
            }
        })
    }

    /**
     * 获取全科课程详情
     * @author huangzhongfei
     * @param {any} ordersItemNo 子订单编号 
     * @date 2021-11-1
     * @returns {any}
     */
    static getGeneralPracticeCourseDetail({
        ordersItemNo
    }) {
        return http.get(apis.getGeneralPracticeCourseDetail, {
            params: {
                ordersItemNo
            }
        })
    }

    /**
     * 获取学习资料
     * @author huangzhongfei
     * @param {any} ordersItemNo 子订单编号 
     * @param {any} courseNo 课程编号 
     * @param {any} type 类型（1=基础资料，2=进阶资料）
     * @date 2021-11-1
     * @returns {any}
     */
    static getMaterials({
        ordersItemNo,
        courseNo,
        type
    }) {
        return http.get(apis.getMaterials, {
            params: {
                ordersItemNo,
                courseNo,
                type
            }
        })
    }

    /**
     * 获取习题
     * @author huangzhongfei
     * @param {any} ordersItemNo 子订单编号 
     * @param {any} courseNo 课程编号 
     * @param {any} exerciseSource 习题来源 1:章节习题  2:综合题库
     * @param {any} chapterId 章节ID 
     * @param {any} examNo	 题库编号 
     * @date 2021-11-1
     * @returns {any}
     */
    static getExercises(params) {
        return http.post(apis.getExercises, params)
    }


    /**
     * 获取题库
     * @author huangzhongfei
     * @param {any} ordersItemNo 子订单编号 
     * @param {any} courseNo 课程编号 
     * @param {any} recordingType 类型（1=章节综合习题，2=进阶综合习题） 
     * @date 2021-11-1
     * @returns {any}
     */
    static getExamsList(params) {
        return http.get(apis.getExamsList, {
            params
        })
    }

    /**
     * 获取视频
     * @author huangzhongfei
     * @param {any} ordersItemNo 子订单编号 
     * @param {any} courseNo 课程编号 
     * @param {any} recordingType 录播类型 2: 基础课录播 3:进阶课录播 
     * @date 2021-11-1
     * @returns {any}
     */
    static getRecordingCourseDutyList({
        ordersItemNo,
        courseNo,
        recordingType
    }) {
        return http.get(apis.getRecordingCourseDutyList, {
            params: {
                ordersItemNo,
                courseNo,
                recordingType
            }
        })
    }

    /**
     * 获取习题进度
     * @author huangzhongfei
     * @param {any}  params {
     *  ordersItemNo: 子订单编号编号
     *  courseNo:课程编号 
     *  exerciseSource: 习题来源 1:章节习题  2:综合题库
     *  examNo: 题库编号
     * }
     * @returns {any}
     */
    static getExerciseSchedule(params) {
        return http.post(apis.getExerciseSchedule, params)
    }

    /**
     * 保存习题进度
     * @author huangzhongfei
     * @param {any}  params {
     *  ordersItemNo: 子订单编号编号
     *  courseNo:课程编号 
     *  exerciseSource: 习题来源 1:章节习题  2:综合题库
     *  examNo: 题库编号
     *  url: 地址快照
     * }
     * @returns {any}
     */
    static insertExerciseRecord(params) {
        return http.post(apis.insertExerciseRecord, params)
    }

    /**
     * 保存视频观看记录 地址: http://192.168.74.52:36953/project/244/interface/api/11978
     * @author huangzhongfei
     * @param {any}  params 
     * @returns {any}
     */
    static insertWatchLog(params) {
        return http.post(apis.insertWatchLog, params)
    }



}
export default myCourse