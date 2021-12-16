import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// import user from './modules/user.js'
// import school from './modules/school.js'

import user from '@/store/modules/user'
import school from '@/store/modules/school'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		user,
		school
	},
	getters
})

export default store