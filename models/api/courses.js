// 课程API
const BASE_URL = 'netschool'
export default {
    getGeneralPracticeCourseDetail: BASE_URL + '/app/index/getGeneralPracticeCourseDetail', // 获取全科课程详情
    getGeneralPracticeCourseDetailV2: BASE_URL + '/app/index/getWebGeneralPracticeCourseDetail', // 获取全科课程详情V2

    getCourseDetail: BASE_URL + '/app/index/getCourseDetail', // 获取单科课程详情

    getClassTypeModule: BASE_URL + '/app/index/getClassTypeModule', // 获取能够使用哪些功能的权限

    getRecordingCourseDutyList: BASE_URL + '/app/index/getRecordingCourseDutyList', // 获取录播【视频】
    getExams: BASE_URL + '/app/index/getExams', // 获取【习题】
    getMaterials: BASE_URL + '/app/index/getMaterials', // 获取【资料】

    getCourseInfo: BASE_URL + '/app/study/getCourseInfo', // 获取课程富文本介绍
}