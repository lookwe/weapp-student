import keyObj from './custom'
import {
    captureName
} from '@/util/utils'

const getters = {
    getUser: state => state.user.userInfo,
    getToken: state => state.user.token,
}

// 生成 school.js 对应 getters
for (const [key] of Object.entries(keyObj)) {
    console.log(`get${captureName(key)}`);
    getters[`get${captureName(key)}`] = state => state.school[key]
}
export default getters