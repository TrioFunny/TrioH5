<template>
	<div v-if="isShowChat" class="trio-chat-div" id='main' v-drag="greet">
<<<<<<< HEAD
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
=======
		<Chat></Chat>
  </div>
</template>

<script>
	import Chat from '@/view/chat/chat';
export default {
  name: 'friend',
  data () {
    return {
    	isShowChat: false,
    }
  },
 	props: ['parent'],
	components: {
		Chat,
	},
		//自定义 事件标签
>>>>>>> 11a9f9c68049f22c2e0e310e0eb2139bec7094d7
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
<<<<<<< HEAD
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
=======
  methods: {
>>>>>>> 11a9f9c68049f22c2e0e310e0eb2139bec7094d7
			showChat(){//关闭显示
				if(this.isShowChat){
					this.isShowChat=false;
				}else{
					this.isShowChat=true;
				}
			},
<<<<<<< HEAD
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
=======
  },
		created() {
		},
		mounted() {
>>>>>>> 11a9f9c68049f22c2e0e310e0eb2139bec7094d7
		},
}
</script>

<style>
</style>
