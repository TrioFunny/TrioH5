import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

//静态全局数据储存地方
const state={
	userId:'',
	//用户信息
	userInfo:{
<<<<<<< HEAD
		userId:'-1',
		userName:'没有1',
=======
		userName:'没有哦',
>>>>>>> 11a9f9c68049f22c2e0e310e0eb2139bec7094d7
	},
	
	tonken:{
		
	},
	//聊天webSocket
	chatSocket:'',
	websock:'',
	
	//地图定位
	
	//自动登录控制
	rememberUser:true,
}


//唯一数据源（单一状态树）
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})