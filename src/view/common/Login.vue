<template>
  <div class="hello">
  	<div>
  			<h1>登录</h1>
  	</div>
  	<div style="width: 80%;margin: 10% 10%; border: solid cornflowerblue 2px;border-radius: 15px;">
  		<div style="padding: 10%;">
		 		 <el-input v-model="userName" placeholder="请输入账号"></el-input>
		 		 <el-input v-model="password" placeholder="请输入密码"></el-input>
		 		 <br />
		 		 <br />
		 		 <el-button type="primary" @click="login">登录</el-button>
		 		 <el-button type="success">注册</el-button>
		 		 <el-button type="success" @click="test">测试</el-button>
	 		 </div>
  	</div>

  </div>
</template>

<script>
	import Common from '../../interface/common'
	
export default {
  name: 'HelloWorld',
  data () {
    return {
    	userName:'',
      password: '',
    }
  },
    methods:{
    	test(){
    		Common.test1();
    	},
    	login(){
    		let param={
    			userName:this.userName,
    			password:this.password,
    		}
    		Common.login.post(param,this);
    	},
    	loginCallback(res){
    		if(res.code=="200"){
    			this.$message.error('成功');
    		}else{
    			this.$message.error(res.error_msg);
    		}
    		
    	},
    	
    },
}
</script>

<style scoped>
</style>
