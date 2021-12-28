import CoursesModel from '@/models/coursesModel'
export default {
    data() {
        return {
            classTypeNavlist: [],

        }
    },
    methods: {
        /** 
         * 根据版型号 获取该课程对应的资源菜单
         * 参数1： { 版型号 }
         * 参数2:  成功之后回调函数
         *  */
        fetchClassTypeNavlist({
            classTypeNo
        }, callBack) {
            this.classTypeNavlist = []
            CoursesModel.getClassTypeModule({
                classTypeNo
            }).then((data) => {
                this.classTypeNavlist = data
                callBack && callBack()
            })
        }
    }
}