export default {
    // 视频
    RECORD: {
        name: ['录播', '基础课'],
        api: 'getRecordingCourseDutyList',
        parmas: {
            recordingType: 2,
        }
    },
    ADVANCED_RECORD: {
        name: ['进阶课'],
        parmas: {
            recordingType: 3,
        },
        api: 'getRecordingCourseDutyList',
    },


    // 题目
    EXERCISE: {
        name: ['章节习题', '综合习题'],
        parmas: {
            type: 1,
        },
        api: 'getExams',
    },
    ADVANCED_EXERCISE: {
        name: ['进阶习题'],
        parmas: {
            type: 2,
        },
        api: 'getExams',
    },


    // 资料
    MATERIAL: {
        name: ['资料'],
        parmas: {
            type: 1,
        },
        api: 'getMaterials',
    },
    ADVANCED_MATERIAL: {
        name: ['进阶资料'],
        parmas: {
            type: 2,
        },
        api: 'getMaterials',
    }
}