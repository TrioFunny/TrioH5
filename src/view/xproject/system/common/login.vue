<template>
	<div class="hello" style="text-align: center;width: 100%;">
			<span class="x-login-div">
				<div style="">
					<div><h1>登录</h1></div>
					<img src="@/assets/Resources/loginico.png"  width="50%" style="border: solid cornflowerblue 2px; border-radius:50% ;margin:5% 0%;"/>
					<div style="padding: 5% 10%;">
						<!--<el-input v-model="item.userName" placeholder="请输入账号" style="padding: 10px 0;"></el-input>
						<el-input v-model="item.password" type='password' placeholder="请输入密码" style="padding: 10px 0;"></el-input>
						<div id="">
							<el-button type="primary" @click="login" style="margin: 10px 10px;">登录</el-button>
							<el-button type="success" @click="regist" style="margin: 10px 10px;">前往注册</el-button>	
						</div>-->
				<el-form  :inline="true" ref="form" :model="item" :rules="rules">
					<el-form-item prop="userName"  style="margin-bottom:20px">
						<el-input v-model="item.userName" placeholder="请输入账号" style="width: 280px;"></el-input>
					</el-form-item>
					<el-form-item prop="password"  style="margin-bottom:20px;">
						<el-input v-model="item.password" type='password' placeholder="请输入密码" style="width: 280px;"></el-input>
					</el-form-item>
					<el-form-item  >
							<el-button type="primary" @click="login" style="margin: 10px 10px;">登录</el-button>
							<el-button type="success" @click="regist" style="margin: 10px 10px;">前往注册</el-button>	
					</el-form-item>
				</el-form>
					</div>
				</div>
			</span>
	</div>
</template>

<script>
	
	export default {
		name: 'login',
		data() {
			return {
		    	url:{
		    		login:this.$C.xproject+'/user/login',
		    	},
				item:{
					userName: '',
					password: '',
				},
		    	//验证
		    	rules: {
		    		userName:[ { required: true, message: '账号不能为空', trigger: 'blur' }],
		    		password:[{ required: true,  message: '密码不能为空', trigger: 'blur' }], 
		    	},
			}
		},
	  	computed:{
	  	},
	  	methods: {
			login() {
				this.$refs["form"].validate((e) => {
		          if (e) {
		          	this.$T.post(this.url.login,this.item,"",this.success);
		          } else {
		            return false;
		          }
		        });
			},
			success(res) {//登录成功
				if(res.code == "200") {
					//把数据存到cookie中
					this.$G.setCookie("token",res.data,24);
					this.$router.push('/xproject/admin');
				} else {
					this.$message.error(res.error_msg);
				}
			},
			regist() {
				this.$router.push('/xproject/register');
			},

		},
		created() {
		},
		mounted() {
//			let falg=this.$G.getCookie("code").length;
//			if(falg>0){
//				this.$router.push('/xproject/admin');
//			}
		},
	}
</script>

<style scoped>
.x-login-div{
	display:block;max-width: 600px;margin: auto; border: solid cornflowerblue 2px;border-radius: 15px;margin-top:1% ;
}
</style>