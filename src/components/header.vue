<template>
  <div >
  	<!--
      	作者：598339963@qq.com
      	时间：2018-05-04
      	描述：
      -->
		  <el-header  v-if="sign == '1'" style="padding:0px;">
		  	<div style="background-color: cornflowerblue;height: 100%;color: white;padding: 0 15%;">	
		  		<div style="min-width: 1100px; position: relative;text-align: center;">
		  			<span style="height: 60px;float: left;padding: 15px;">
							<i @click="back()" class="el-icon-back" 
				  				style="font-size: 20px;border: solid 1px white;padding: 5px;border-radius: 5px;">
							</i>
		  			</span>
			  		<span style="line-height: 60px;font-size: 30px;">{{title}}</span>
		  			</span>
		  			<span style="height: 60px;float: right;padding: 15px;">
			  			<i @click="goTo('/user/personalCenter')" class="el-icon-document trio-i"></i>
			  			<i  class="el-icon-message trio-i" @click="showChat()"></i>
		  			</span>
		  		</div>
		  	</div>
		  </el-header>
		  
		  <el-header  v-if="sign == '2'">
		  	<div style="background-color: #DD6161;width: 100%;height: 100%;color: white;padding: 0 15%;">	
		  		<div style="min-width: 1100px; position: relative;">
		  			<span >
			  			<span style="line-height: 60px;font-size: 30px;">{{title}}</span>
		  			</span>
		  		</div>
		  	</div>
		  </el-header>
		  

		  	<chatDiv  ref="chat" :parent="this"></chatDiv>
  </div>
</template>

<script>
import chatDiv from '@/view/chat/index';

export default {
  data () {
    return {
      msg: '',
      isShowChat:false,
    }
  },
  props: ['sign', 'title'],
	components: {
			chatDiv,
	},
  methods: {
		goTo(url) {
				this.$router.push({
					path: url,		
//					query:{'type': type} 参数
				});
			},
		back(){
			this.$router.go(-1);
		},
		showChat(){
			this.$refs.chat.showChat();
		},
		
	}
}
</script>

<style>
.trio-i{
		font-size: 20px;border: solid 1px white;padding: 5px;border-radius: 5px;
	}
.trio-chat-div{
	position: absolute;background-color:white;
	width: 300px;height: 500px;z-index: 999;
	top:80px; right: 10px;
	border: solid 2px white;
	border-radius:8px;
}
.trio-chat-div header{
	float: right;width: 100%;height: 30px;background-color:#409EFF;line-height: 30px;border-radius:10px;
}
.trio-chat-div content{
	float: right;width: 100%;height:420px;background-color:white;
}
.trio-chat-div footer{
	float: right;height: 50px;width: 100%;border-top:solid darkgray 1px;padding-top:1px ;
}
.trio-chat-div .msg-item{
	width: 100%;float: left; /*background: #088cb7;*/
}
.msg-item .user {
	float: left;width: 60px;padding: 3px;
}
.msg-item .user img{
	/**/
	 border-radius:50% ; border:solid gold 1px;float: left;width: 50px;height: 50px;
}
.msg-item .msg-span{
	width: 200px;display:inline-block;float: left;text-align: left;margin-top: 8px;margin-left: -2px;font-size: 13px;color: gray;
}
.msg-item .user-name{
	
}
.msg-item .msg{
	position: relative;padding-left: 10px;color: white;
}
.msg-item .msg-content{
	display:inline-block;
  width: 200px;
  padding: 10px;
 	font-size: 15px;
	background-color:lightskyblue;
  -moz-border-radius: 12px;
  -webkit-border-radius: 12px;
  border-radius: 12px;
}
.msg-item .msg-content:before{
	position: absolute;
	left: 0px;
  content: "";
  border-top: 8px solid transparent;
  border-right: 15px solid lightskyblue;
  border-bottom: 15px solid transparent;
}

</style>

