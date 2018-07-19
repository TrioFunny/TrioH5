<template>
	<div v-drag="greet">
		<content>
			<div class="msg-item">
				<!--头像-->
				<span class='user left'>
					<img  src="../../assets/portrait.jpg"  />
				</span>
				<!--名字/信息-->
				<span class='msg-span left'>
					<span class='user-name left'>无事，无趣，无聊</span>
					<span class="msg left">
						<span class='msg-content left'>
							hello word <br />hello c 娃哈哈  hello c 多C 多漂亮
						</span>
					</span>
				</span>
			</div>

			<div class="msg-item">
				<!--头像-->
				<span class='user right'>
					<img  src="../../assets/portrait.jpg"  />
				</span>
				<!--名字/信息-->
				<span class='msg-span right'>
					<span class='user-name right'>无事，无趣，无聊</span>
					<span class="msg right">
						<span class='msg-content right'>
							hello word <br />hello c 娃哈哈  hello c 多C 多漂亮
						</span>
					</span>
				</span>
			</div>
			<div class="msg-item">
				<!--头像-->
				<span class='user right'>
					<img  src="../../assets/portrait.jpg"  />
				</span>
				<!--名字/信息-->
				<span class='msg-span right'>
					<span class='user-name right'>无事，无趣，无聊</span>
					<span class="msg right">
						<span class='msg-content right'>
							hello word <br />hello c 娃哈哈  hello c 多C 多漂亮
						</span>
					</span>
				</span>
			</div>
			<div class="msg-item">
				<!--头像-->
				<span class='user right'>
					<img  src="../../assets/portrait.jpg"  />
				</span>
				<!--名字/信息-->
				<span class='msg-span right'>
					<span class='user-name right'>无事，无趣，无聊</span>
					<span class="msg right">
						<span class='msg-content right'>
							hello word <br />hello c 娃哈哈  hello c 多C 多漂亮
						</span>
					</span>
				</span>
			</div>
			<div class="msg-item">
				<!--头像-->
				<span class='user right'>
					<img  src="../../assets/portrait.jpg"  />
				</span>
				<!--名字/信息-->
				<span class='msg-span right'>
					<span class='user-name right'>无事，无趣，无聊</span>
					<span class="msg right">
						<span class='msg-content right'>
							hello word <br />hello c 娃哈哈  hello c 多C 多漂亮
						</span>
					</span>
				</span>
			</div>
			<div class="msg-item">
				<!--头像-->
				<span class='user right'>
					<img  src="../../assets/portrait.jpg"  />
				</span>
				<!--名字/信息-->
				<span class='msg-span right'>
					<span class='user-name right'>无事，无趣，无聊</span>
					<span class="msg right">
						<span class='msg-content right'>
							hello word <br />hello c 娃哈哈  hello c 多C 多漂亮
						</span>
					</span>
				</span>
			</div>
			<p></p>
			<hr />
		</content>
		<footer >
			<el-input v-model="msg" placeholder="" style="width: 78%;float: left;"></el-input>
			<el-button style="width: 22%;float: left;padding:12px 0px;" type="primary" plain @click="sendMsg()">发送</el-button>
		</footer>
	</div>
</template>

<script>
	import Tool from '@/util/tool';
	import io from 'socket.io-client';
	import { mapState,mapActions} from 'vuex'
	
	export default {
		name: 'chat',
		data() {
			return {
				msg: '',
				socket: '',
			}
		},
		  props: ['parent'],
		computed:{
			...mapState(['websock']),
		},
		//自定义 事件标签
		directives: {
			drag: {
				bind: function(el, binding) {
					let oDiv = el; //当前元素
					let self = this; //上下文
					oDiv.onmousedown = function(e) {
						//鼠标按下，计算当前元素距离可视区的距离
						let disX = e.clientX - oDiv.offsetLeft;
						let disY = e.clientY - oDiv.offsetTop;

						document.onmousemove = function(e) {
							//通过事件委托，计算移动的距离 
							let l = e.clientX - disX;
							let t = e.clientY - disY;
							//移动当前元素  
							oDiv.style.left = l + 'px';
							oDiv.style.top = t + 'px';
							//将此时的位置传出去
							binding.value({
								x: e.pageX,
								y: e.pageY
							})
						};
						document.onmouseup = function(e) {

							document.onmousemove = null;
							document.onmouseup = null;
						};
					};
				}
			}
		},
		methods: {
			...mapActions(['initChatSocket']),
			greet(val) {//接受传来的位置数据，并将数据绑定给data下的val
				this.val = val;
			},
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
				if(this.websock==null||this.websock==''){
					console.log("初始化WebSocket");
					this.initChatSocket(this.websocketonmessage,this.websocketclose);
				}else{
					console.log(this.websock);
				}
			},
			test(){
				
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			},
			websocketonmessage(e) { //数据接收
				console.log("接收消息：");
				console.log(e.data);
				var date = JSON.parse(e.data);
				if(date.common=='Login'){
					this.chatLogin(date.data.ssid);
				}
			},
			websocketsend(agentData) { //数据发送
				this.websock.send(this.msg);
			},
			websocketclose(e) { //关闭
				console.log("connection closed (" + e.code + ")");
			},
			//////////////////////////////////////////////上面是socket方法//////////////////////////////////////////////////

			chatLogin(uuid){//聊天确认登陆
				let data={
					uid:this.userId,//用户id
					uuid:uuid,//服务器返回ID
				};
				let info={
					common:'Login',
					data:data,
				};
				let infoStr=JSON.stringify(info);
				console.log(infoStr);
				//最后发送
				this.websock.send(infoStr);
			},
			sendMsg(){//发送消息
				let data={
					ssid:'',//唯一标识
					type:'Single',//
					message:this.msg,//信息
					sendTime:new Date(),
					sendId:this.userId,//发送用户ID
					toId:'1',//接受用户ID
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
		},
		mounted() {
			this.userId=Tool.getCookie('userId');
			this.initWebSocket()
		},
	}
</script>

<style>
	.trio-i {
		font-size: 20px;
		border: solid 1px white;
		padding: 5px;
		border-radius: 5px;
	}
	
	/*聊天框*/
	.trio-chat-div {
		position: absolute;
		background-color: white;
		width: 300px;
		height: 500px;
		z-index: 999;
		top: 80px;
		right: 100px;
		border: solid 2px white;
		border-radius: 8px;
		box-shadow: 0px 0px 20px gold;
	}
	
	/*聊天框-头部信息*/
	.trio-chat-div header {
		float: right;
		width: 100%;
		height: 30px;
		text-align:center;
		background-color: #409EFF;
		line-height: 30px;
		border-radius: 5px;
		color: whitesmoke;
	}
	.trio-chat-div header span{
		line-height: 30px;font-size: 20px;
		padding:0px 5px;
	}

	/*聊天框-主体显示*/
	.trio-chat-div content {
		float: right;
		width: 100%;
		height: 420px;
		background-color: white;
		overflow-y: scroll;
		/*margin-right: -15px;*/
	}
	/*滚动条*/
	content::-webkit-scrollbar {
	    width: 0px;
	}
	content::-webkit-scrollbar-thumb{
	    border-radius: 5px;
	    background: cornflowerblue;
	}
	content::-webkit-scrollbar-track {
	    border-radius: 5px;
	    background-color: #eee;
	}
	/*聊天框-脚部发送*/
	.trio-chat-div footer {
		float: right;
		height: 50px;
		width: 100%;
		border-top: solid darkgray 1px;
		padding-top: 1px;
	}
	
	
	/*聊天框-信息条目*/
	.trio-chat-div .msg-item {
		width: 100%;
		float: left;
		padding-top: 10px;
		/*background: #088cb7;*/
	}
	
	/*聊天框-信息条目  头像框*/
	.msg-item .user {
		float: inherit;
		width: 50px;
		padding: 3px;
	}
	.msg-item .user.left{
		float: left;
	}
	.msg-item .user.right{
		float: right;
	}
	
	/*聊天框-信息条目  头像 图片*/
	.msg-item .user img {
		/**/
		border-radius: 50%;
		border: solid gold 1px;
		width: 45px;
		height: 45px;
	}
	.msg-item .user.left img {
		float: left;
	}
	.msg-item .user.right img {
		float: right;
	}
	
	/*聊天框-信息条目  信息框*/
	.msg-item .msg-span {
		width: 240px;
		display: inline-block;
		text-align: left;
		margin-top: 8px;
		margin-left: -2px;
		font-size: 13px;
		color: gray;
	}
	.msg-item .msg-span.left{
		float: left;
	}
	.msg-item .msg-span.right{
		float: right;
	}	
	
	/*聊天框-信息条目  用户名*/
	.msg-item .msg-span .user-name {
		padding:0px 12px;
	}
	.msg-item .msg-span .user-name.left{
		float: left;
	}
	.msg-item .msg-span .user-name.right{
		float: right;
	}	

	
	/*聊天框-信息条目  内容气泡*/
	.msg-item .msg-span .msg {
		position: relative;
		display: block;
		color: white;
		padding-left: 10px;
	}
	.msg-item .msg-span .msg.left{
		width: 100%;height: 100%;
	}
	.msg-item .msg-span .msg.right{
		width: 100%;height: 100%;
	}
	
	.msg-item .msg-span .msg-content {
		display: inline-block;
		width: 220px;
		margin:3px 0px;
		padding: 8px;
		font-size: 15px;
		background-color: lightskyblue;
		-moz-border-radius: 12px;
		-webkit-border-radius: 12px;
		border-radius: 12px;
	}

	.msg-item .msg-span .msg-content.left {
		display: inline-block;
		width: 220px;
		margin:3px 0px;
		padding: 8px;
		font-size: 15px;
		background-color: lightskyblue;
		-moz-border-radius: 12px;
		-webkit-border-radius: 12px;
		border-radius: 12px;		
	}
	.msg-item .msg-span .msg-content.right {
		display: inline-block;
		width: 220px;
		margin:3px 0px;
		padding: 8px;
		font-size: 15px;
		background-color: lightskyblue;
		-moz-border-radius: 12px;
		-webkit-border-radius: 12px;
		border-radius: 12px;
	}
	.msg-item .msg-span .msg-content.left:before {
		position: absolute;
		left: 0px;
		content: "";
		left: 0px;
		border-top: 8px solid transparent;
		border-bottom: 15px solid transparent;
		border-right: 15px solid lightskyblue;
	}
	
	.msg-item .msg-span .msg-content.right:after {
		position: absolute;
		content: "";
		right: 0px;
		top: 29px;
		border-top: 8px solid transparent;
		border-bottom: 15px solid transparent;
		border-left: 15px solid lightskyblue;
	}


</style>