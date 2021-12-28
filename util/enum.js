export default {
    // 视频
    RECORD: {
        name: '基础课',
        typeName: '视频',
        api: 'getRecordingCourseDutyList',
        parmas: {
            recordingType: 2,
        }
    },
    ADVANCED_RECORD: {
        name: '进阶课',
        typeName: '视频',
        parmas: {
            recordingType: 3,
        },
        api: 'getRecordingCourseDutyList',
    },


    // 题目
    EXERCISE: {
        name: '章节习题',
        typeName: '题库',
        parmas: {
            type: 1,
        },
        api: 'getExams',
    },
    ADVANCED_EXERCISE: {
        name: '进阶习题',
        typeName: '题库',
        parmas: {
            type: 2,
        },
        api: 'getExams',
    },


    // 资料
    MATERIAL: {
        name: '资料',
        typeName: '资料',
        parmas: {
            type: 1,
        },
        api: 'getMaterials',
    },
    ADVANCED_MATERIAL: {
        name: '进阶资料',
        typeName: '资料',
        parmas: {
            type: 2,
        },
        api: 'getMaterials',
    }
}