const BASE_URL = 'netschool'

/*
 * 公共接口模块
 * @Author: 2726768601@qq.com
 * @Date: 2021-12-39 17:59:28
 * @LastEditTime: 2021-12-39 17:59:28
 */
export default {
    getUploadSignedUrl: BASE_URL + '/app/file/getUploadSignedUrl', // 获取华为云文件上传地址
    getDownloadSignedUrl: BASE_URL + '/app/file/getDownloadSignedUrl', // 解密文件获取 网络链接地址
}