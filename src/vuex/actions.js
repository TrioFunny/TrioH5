import config from '@/util/config';

export default {
	setUserId({commit,state},data){
		state.userId = data;
	},
	setUserInfo({commit,state},data){
		state.userInfo = data;
	},
	initChatSocket({commit,state},onmessage,onclose){
		state.websock = new WebSocket(config.chatServerUrl+'/chatwebsocket');
		state.websock.onmessage = onmessage;
		state.websock.onclose = onclose;
	},
}