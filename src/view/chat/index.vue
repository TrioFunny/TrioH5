<template>
	<div class="hello" >
		<div style="height: 60px;width: 100%;background-color:#00B8EC;"></div>
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
			}
		},
		methods: {
			threadPoxi() { // 实际调用的方法
				//参数
				const agentData = "mymessage";
				//若是ws开启状态
				if(this.websock.readyState === this.websock.OPEN) {
					this.websocketsend(agentData)
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
				this.websock = new WebSocket('ws://127.0.0.1:8080/barrage/init');
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			},
			websocketonmessage(e) { //数据接收
//				const redata = JSON.parse(e.data);
				console.log(e.data);
			},
			websocketsend(agentData) { //数据发送
				this.websock.send(this.msg);
			},
			websocketclose(e) { //关闭
				console.log("connection closed (" + e.code + ")");
			}
		},
		created() {
			this.initWebSocket()
		}
	}
</script>

<style>

</style>