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
            index: 1,
            list
        }

        if (isReset) {
            resolve(defaultObj)
            return
        }

        myCourse.getExerciseSchedule(params).then((data) => {
            console.log('历史记录文件：', data);
            if (!data) {
                resolve(defaultObj)
            } else {
                http.get(data.exerciseSnapshotUrl, {
                    custom: {
                        backRespon: true
                    },
                    header: {
                        'Content-Type': ''
                    },
                    //responseType: 'text',

                }).then((data) => {
                    // resolve(formatJSON(data, list))
                    console.log('有、答题记录---');
                    console.log(data);
                    resolve({
                        list: list,
                        index: 0,
                        isInit: false,
                    })
                })
            }
        }).catch(e => {
            console.error(e);
            resolve(defaultObj)
        })
    })
}