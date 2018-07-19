import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

//静态全局数据储存地方
const state={
	//用户信息
	userInfo:{
		userId:'-1',
		userName:'没有1',
	},
	
	tonken:{
		
	},
	//聊天webSocket
	chatSocket:'',
	websock:'',
	
	//地图定位
	
	
}


//唯一数据源（单一状态树）
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})