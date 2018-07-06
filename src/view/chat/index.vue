<template>
	<div v-if="isShowChat" class="trio-chat-div" id='main' v-drag="greet">
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
			showChat(){//关闭显示
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
		},
}
</script>

<style>
</style>
