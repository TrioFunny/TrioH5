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
		 		 <el-button type="primary">登录</el-button>
		 		 <el-button type="success">注册</el-button>
	 		 </div>
  	</div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    	userName:'',
      password: '',
    }
  },
    methods:{
    	
    },
}
</script>

<style scoped>
</style>
