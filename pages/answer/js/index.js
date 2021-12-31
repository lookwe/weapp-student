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
            // console.log('历史记录文件：', data);
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

                    if (!data) {
                        resolve(defaultObj)
                    } else {
                        resolve(historyListFormat(data))
                    }
                }).catch(e => {
                    console.error(e);
                    resolve(defaultObj)
                })
            }
        }).catch(e => {
            console.error(e);
            resolve(defaultObj)
        })
    })
}

// 把历史答题试卷，加入答题类，
function historyListFormat({
    lastDoneQuestionId = 0,
    questions = []
}) {
    let lastIndex = 0; // 上一次答题位置
    const newHistoryList = questions.map((item, index) => {
        if (item.id == lastDoneQuestionId) {
            lastIndex = index;
        }

        // 如果历史记录没有答题 则创建一个新的
        if (!item.answer) {
            item.answer = getNewAnswer(item)
        } else {
            console.log(index, item);
        }

        // 判断是否 [综合题]特殊处理
        const {
            childExercises = []
        } = item
        if (item.exerciseType == 6 && childExercises.length > 0) {
            childExercises.forEach((childItem) => {
                if (!childItem.answer) {
                    childItem.web = getNewAnswer(childItem)
                }
            })
            item.childExercises = childExercises;
        }
        return item
    })

    return {
        list: htmlFormat(newHistoryList),
        index: lastIndex
    }
}

// html 试题格式&img 转为 H5小程序识别代码
function htmlFormat(data) {
    let dataStr = JSON.stringify(data)
    dataStr = dataStr
        .replace(/<\$\$>.*?<\/\$\$>/g, '')
        .replace(
            /<image>(.*?)<\/image>/g,
            '<view class=\\"cursor-p\\"> <image mode=\\"scaleToFill\\" src=\\"data:image/png;base64,$1\\"></image> </view>'
        )
    return JSON.parse(dataStr)
}


// 为试卷每道题加入 answer 对象
function listSaveAnswer(list = []) {
    const anserList = list.map(item => {
        return {
            isShowAnalysis: false, // todo, 判断是否显示解析
            ...item,
            answer: getNewAnswer(item)
        }
    })
    return htmlFormat(anserList)
}

// 返回一个完整的 答题卡类
function getNewAnswer(item = {}) {
    const answer = {
        judge: -1, // 0:错误,1：正确,-1：未判断（简答题，填空题需要用户自行判断正确）
        id: 0,
        parentId: 0,
        answer: [{
            content: '',
            id: ""
        }]
    }

    // 判断是否 填空题 需要对应个输入框
    if (item.exerciseType == 5) {
        answer.answer = []

        const options = item.exerciseOptionVOS || []
        options.forEach(_item => {
            answer.answer.push({
                content: '',
                id: _item.id
            })
        })
    }

    return answer
}