// 我的学习中心 课程
const BASE_URL = 'netschool'
export default {
    // 获取所以课程
    getAllCourse: BASE_URL + '/app/study/getAllCourse',

    // 获取能够使用哪些功能的权限
    getClassTypeModule: BASE_URL + '/app/study/getClassTypeModule',

    // 获取全科课程详情
    getGeneralPracticeCourseDetail: BASE_URL + '/app/study/getGeneralPracticeCourseDetail',

    // --【
    // 获取学习资料
    getMaterials: BASE_URL + '/app/study/getMaterials',
    // 获取习题
    getExercises: BASE_URL + '/app/study/getExercises', // 做题
    getExamsList: BASE_URL + '/app/study/getExams', // 获取【题库】

    // 获取视频
    getRecordingCourseDutyList: BASE_URL + '/app/study/getRecordingCourseDutyList',
    // 插入视频观看记录
    insertWatchLog: BASE_URL + '/app/study/insertWatchLog',
    // --】

    // 保存习题
    insertExerciseRecord: BASE_URL + '/app/study/insertExerciseRecord',
    // 习题进度
    getExerciseSchedule: BASE_URL + '/app/study/getExerciseSchedule',
}