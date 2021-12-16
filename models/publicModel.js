const { http } = uni.$u
import apis from './api/public.js'


/*
 * 全局公共API接口
 * @Author: 2726768601@qq.com
 * @Date: 2021-11-39 09:59:28
 * @LastEditTime: 2021-11-30 09:59:28
 */
class publicModel {
   /**
       * 文件解密
       * @author huangzhongfei
       * @date 2021-11-1
       * @param {Array[]} objectKeys 文件名称 字符串数组
       * @returns {any}
       */
      static getDownloadSignedUrl({ objectKeys }) {
          return http.post(apis.getDownloadSignedUrl, { objectKeys })
      }
  
  
      /**
       * 获取文件上传API接口
       * @author huangzhongfei
       * @date 2021-11-1
       * @param {Array[]} objectKeys 文件名称 字符串数组
       * @returns {any}
       */
      static getUploadSignedUrl({ objectKeys }) {
          return http.post(apis.getUploadSignedUrl, { objectKeys })
      }
}
export default publicModel