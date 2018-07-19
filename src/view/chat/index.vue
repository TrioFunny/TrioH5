<template>
	<div v-if="isShowChat" class="trio-chat-div" id='main' v-drag="greet">
		<header id='title'>
			<span title="好友列表" style="float: left;" class="el-icon-tickets" @click="changeFlag()"></span>聊天
			<span @click="close()" title="关闭" style="float: right;" class="el-icon-circle-close-outline"></span>
		</header>
		<div style="height: 470px;">
			<friendsDiv v-if="flag=='friends'"></friendsDiv>
			<chatDiv v-if="flag=='chat'"></chatDiv>
		</div>

	</div>
</template>

<script>
	import Tool from '@/util/tool';
	import friendsDiv from '@/view/chat/friends'
	import chatDiv from '@/view/chat/chat'
	
	export default {
		name: 'chat',
		data() {
			return {
				isShowChat: true,
				flag:'chat',//  chat   friends
				
			}
		},
		  props: ['parent'],
		computed:{
		},
		components: {
			friendsDiv,chatDiv,
		},
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
			changeFlag(){
				if(this.flag=='chat'){
					this.flag='friends';
				}else{
					this.flag='chat';
				}
				
			},
			greet(val) {//接受传来的位置数据，并将数据绑定给data下的val
				this.val = val;
			},
			showChat(){//关闭显示
				if(this.isShowChat){
					this.isShowChat=false;
				}else{
					this.isShowChat=true;
				}
			},
			close(){//关闭聊天显示
				if(this.isShowChat){
					this.isShowChat=false;
				}else{
					this.isShowChat=true;
				}
			},
		},
		created() {
		},
		mounted() {
			this.userId=Tool.getCookie('userId');
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