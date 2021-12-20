const getters = {
    getUser: state => state.user.userInfo,
    getToken: state => state.user.token,
    getSchool: state => state.school.schoolInfo,
    getCourse: state => state.school.courseInfo,
}
export default getters