<template>
  <div >
  	<!--
      	作者：598339963@qq.com
      	时间：2018-05-04
      	描述：
      -->
		  <el-header  v-if="sign == '1'" class="trio-head-div">
		  	<div class="trio-head-background">	
		  		<div class="trio-head-with">
		  			<span style="height: 42px;float: left;padding: 15px;">
							<i @click="back()" class="el-icon-back trio-i	"  
				  				style="border: solid 1px white;padding: 5px;border-radius: 5px;">
							</i>
		  			</span>
			  		<span style="line-height: 42px;font-size: 15px;">{{title}}</span>
		  			</span>
		  			<span style="height: 42px;float: right;padding: 15px;">
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
			  			<span style="line-height: 42px;font-size: 30px;">{{title}}</span>
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
.trio-head-div{
	padding:0px;height: 42px !important;
	min-width:1100px ;
}
.trio-head-background{
	background-color: cornflowerblue;
	height: 100%;
	color: white;
}
.trio-head-with{
	margin: auto;
	min-width:1100px ;
	max-width: 1280px;
	position: relative;
	text-align: center;
}
.trio-i {
	font-size: 10px;
	border: solid 1px white;
	padding: 5px;
	border-radius: 5px;
}
</style>

