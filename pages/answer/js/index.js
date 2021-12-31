// 负责 后端数据结构 转 前端使用
const {
    http
} = uni.$u
import myCourse from '@/models/myCourseModel'

import $store from "@/store";


/**
 * 读取进度 并解析 接口进度成JSON格式
 * @param {string} params 获取进度接口参数
 * @param {Function} callback 请求完成回调函数
 * @param {boolean} isReset 是否重做，用默认试卷(不带答题记录)
 * @returns {Object} 成功返回正常数据 失败则返回null {not: true} 则表示没有进度
 */
export function readTxtFile(params, list, isReset) {
    return new Promise((resolve) => {
        const defaultObj = {
            index: 0,
            list: listSaveAnswer(list)
        }

        // 不获取答题记录，直接返回 新试卷 并附加 answer 答题卡类
        if (isReset) {
            resolve(defaultObj)
            return
        }

        // 获取用户答题记录
        myCourse.getExerciseSchedule(params).then((data) => {
            console.log('历史记录文件：', data);
            if (!data) {
                resolve(defaultObj)
            } else {
                // $store.getters.getToken,
                http.get(data.exerciseSnapshotUrl, {
                    custom: {
                        backRespon: true
                    },
                    header: {
                        'content-type': ' ',
                    },
                }).then((data) => {
                    console.log('有、答题记录----------');
                    console.log(data);
                })

                // resolve({
                //     list: list,
                //     index: 0,
                // })

                resolve(defaultObj)

            }
        }).catch(e => {
            console.error(e);
            resolve(defaultObj)
        })
    })
}

// 为试卷每道题加入 answer 对象
function listSaveAnswer(list = []) {
    return list.map(item => {
        return {
            isShowAnalysis: false, // todo, 判断是否显示解析
            ...item,
            answer: getAnswer()
        }
    })
}

// 返回一个完整的 答题卡类
function getAnswer() {
    const answer = {
        judge: -1, // 0:错误,1：正确,-1：未判断（简答题，填空题需要用户自行判断正确）
        id: 0,
        parentId: 0,
        answer: [{
            content: '',
            id: ''
        }]
    }
    return answer
}