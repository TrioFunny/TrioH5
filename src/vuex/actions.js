export default {
	setUserInfo({commit,state},data){
		state.userInfo = data;
	},
	initChatSocket({commit,state},onmessage,onclose){
		state.websock = new WebSocket(window.chatUrl+'/chatwebsocket');
		state.websock.onmessage = onmessage;
		state.websock.onclose = onclose;
	},
}