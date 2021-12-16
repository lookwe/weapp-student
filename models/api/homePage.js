
// APP首页接口

const BASE_URL = 'netschool'
export default {
    getCourseList: BASE_URL + '/app/index/getCourses', //获取课程
    getCourses: BASE_URL + '/app/index/getCoursesPage', //获取课程(分页)
    getBanners: BASE_URL + '/app/index/getBanner', // 轮播

    getSchoolInfo: BASE_URL + '/app/index/getSchoolInfo', // 获取log、网校

    getCouresTree: BASE_URL + '/app/index/getShopwindowTree',    // 获取首页课程菜单
}