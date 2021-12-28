import {
    WORD
} from './enumerate'
import {
    isUrl
} from '@/util/validator'
import publicApi from '@/models/publicModel'

// 数组里遍历出正确答案
export function getMultipleCorrect(arr = []) {
    const strArr = []
    arr.forEach((item) => {
        if (item.isCorrect == 1) {
            // exerciseOption 选项ID
            strArr.push(WORD[item.exerciseOption])
        }
    })
    return strArr.length > 0 && strArr.join()
}

// 遍历出填空题答案
export function getInputCorrect(arr = []) {
    const strArr = []
    arr.forEach((item, index) => {
        if (item.isCorrect == 1) {
            // exerciseOption 选项ID
            strArr.push(`${index + 1}: ${item.exerciseOptionContent} `)
        }
    })
    return strArr.length > 0 && strArr.join()
}


// 获取文件解密完整URL 并替换简写url名称
export function getFileDecryption(that, exerciseList, index) {
    const curretObj = exerciseList[index] || {}
    const {
        exerciseTitleImage = '', analysisAnswerImage = ''
    } = curretObj
    const objectKeys = []

    // 判断是否加入解析
    if (exerciseTitleImage && !isUrl(exerciseTitleImage)) {
        objectKeys.push(exerciseTitleImage)
    }
    if (analysisAnswerImage && !isUrl(analysisAnswerImage)) {
        objectKeys.push(analysisAnswerImage)
    }

    if (objectKeys.length === 0) return

    // 网络请求
    publicApi
        .getDownloadSignedUrl({
            objectKeys
        })
        .then((data) => {
            curretObj.exerciseTitleImage = data[exerciseTitleImage]
            curretObj.analysisAnswerImage = data[analysisAnswerImage]
            that.$set(exerciseList, index, curretObj)
        })
}


/**
 * 根据文件 获取华为云上传API
 * @param {[string]} names 字符串数组
 */
export function getUpdateFileUrl(names = []) {
    return publicApi.getUploadSignedUrl({
        objectKeys: names,
    }).then(data => {
        return data;
    })
}