import Vue from 'vue';
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex);

// 2.创建Vuex对象store
const store = new Vuex.Store({
	state: {
		loginStatus: false // false 未登录，true 已登录
	},
	getters: {},
	mutations: {
		changeLoginStatus(state,{num}) {
			// state.loginStatus = true;
			state.loginStatus = num;
		}
	},
	actions: {},
	modules: {}
	
})

// 3.导出store对象，用于挂载到vue实例上
export default store;

// 4.在main.js文件中引入store并挂载

// export default new Vuex.Store({
// 	state: {
// 		loginStatus: false
// 	}
// })