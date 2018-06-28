<template>
	<div v-if="isShowChat" class="trio-chat-div">
		<header>聊天</header>
		<content>
			<div class="msg-item">
				<!--头像-->
				<span class='user'>
					<img  src="../../assets/portrait.jpg"  />
				</span>
				<!--名字/信息-->
				<span class='msg-span'>
					<span class='user-name'>无事，无趣，无聊</span>
					<span class="msg">
						<span class='msg-content'>
							hello word<br />hello c
						</span>
					</span>
				</span>
			</div>
		</content>
		<footer >
			<el-input v-model="msg" placeholder="" style="width: 78%;float: left;"></el-input>
			<el-button style="width: 22%;float: left;padding:12px 0px;" type="primary" plain @click="sendMsg()">发送</el-button>
			<button @click="test()">测试</button>
		</footer>
	</div>
</template>

<script>
	import io from 'socket.io-client';
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: '',
				socket: '',
				isShowChat: true,
			}
		},
		  props: ['parent'],
		methods: {
			threadPoxi() { // 实际调用的方法
				//参数
				const agentData = "mymessage";
				//若是ws开启状态
				if(this.websock.readyState === this.websock.OPEN) {
					this.websocketsend("abcd")
				}
				// 若是 正在开启状态，则等待300毫秒
				else if(this.websock.readyState === this.websock.CONNECTING) {
					let that = this; //保存当前对象this
					setTimeout(function() {
						that.websocketsend(agentData)
					}, 300);
				}
				// 若未开启 ，则等待500毫秒
				else {
					this.initWebSocket();
					let that = this; //保存当前对象this
					setTimeout(function() {
						that.websocketsend(agentData)
					}, 500);
				}
			},
			initWebSocket() { //初始化weosocket
				this.websock = new WebSocket('ws://127.0.0.1:8080/chatwebsocket');
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			},
			websocketonmessage(e) { //数据接收
				console.log(e.data);
				if(e.common=='Login'){
					this.chatLogin(e.data.uuid);
				}
			},
			websocketsend(agentData) { //数据发送
				this.websock.send(this.msg);
			},
			websocketclose(e) { //关闭
				console.log("connection closed (" + e.code + ")");
			},
			//////////////////////////////////////////////上面是socket方法//////////////////////////////////////////////////
			
			showChat(){
				if(this.isShowChat){
					this.isShowChat=false;
				}else{
					this.isShowChat=true;
				}
			},
			//聊天确认登陆
			chatLogin(uuid){
				let data={
					uid:'',//用户id
					uuid:uuid,//服务器返回ID
				};
				let info={
					common:'Login',
					data:data,
				};
				let infoStr=JSON.stringify(info);
				//最后发送
				this.websock.send(infoStr);
			},
			//发送消息
			sendMsg(){
				let data={
					ssid:'',//唯一标识
					type:'',//
					message:this.msg,//信息
					sendTime:'',
					sendId:'',//发送用户ID
					toId:'',//接受用户ID
				};
				let info={
					common:'Message',
					data:data,
				};
				
				let infoStr=JSON.stringify(info);
				console.log(infoStr);
				//最后发送
				this.websock.send(infoStr);
			},
		},
		created() {
			this.initWebSocket()
		}
	}
</script>

<style>
	.trio-i {
		font-size: 20px;
		border: solid 1px white;
		padding: 5px;
		border-radius: 5px;
	}
	
	.trio-chat-div {
		position: absolute;
		background-color: white;
		width: 300px;
		height: 500px;
		z-index: 999;
		top: 80px;
		right: 10px;
		border: solid 2px white;
		border-radius: 8px;
	}
	
	.trio-chat-div header {
		float: right;
		width: 100%;
		height: 30px;
		background-color: #409EFF;
		line-height: 30px;
		border-radius: 10px;
	}
	
	.trio-chat-div content {
		float: right;
		width: 100%;
		height: 420px;
		background-color: white;
		padding-top:10px ;
	}
	
	.trio-chat-div footer {
		float: right;
		height: 50px;
		width: 100%;
		border-top: solid darkgray 1px;
		padding-top: 1px;
	}
	
	.trio-chat-div .msg-item {
		width: 100%;
		float: left;
		/*background: #088cb7;*/
	}
	
	.msg-item .user {
		float: left;
		width: 60px;
		padding: 3px;
	}
	
	.msg-item .user img {
		/**/
		border-radius: 50%;
		border: solid gold 1px;
		float: left;
		width: 50px;
		height: 50px;
	}
	
	.msg-item .msg-span {
		width: 200px;
		display: inline-block;
		float: left;
		text-align: left;
		margin-top: 8px;
		margin-left: -2px;
		font-size: 13px;
		color: gray;
	}
	
	.msg-item .user-name {}
	
	.msg-item .msg {
		position: relative;
		padding-left: 10px;
		color: white;
	}
	
	.msg-item .msg-content {
		display: inline-block;
		width: 200px;
		padding: 10px;
		font-size: 15px;
		background-color: lightskyblue;
		-moz-border-radius: 12px;
		-webkit-border-radius: 12px;
		border-radius: 12px;
	}
	
	.msg-item .msg-content:before {
		position: absolute;
		left: 0px;
		content: "";
		border-top: 8px solid transparent;
		border-right: 15px solid lightskyblue;
		border-bottom: 15px solid transparent;
	}
</style>