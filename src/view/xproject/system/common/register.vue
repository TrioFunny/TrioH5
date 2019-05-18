<template>
	<div class="hello" style="text-align: center;width: 100%;">
			<span >
				<div class="x-login-div">
					<div><h1>登录</h1></div>
					<img src="@/assets/Resources/registerico.png"  width="50%" style="border: solid cornflowerblue 2px; border-radius:50% ;margin:5% 0%;"/>
					<div style="padding: 5% 10%;">
						<el-form  :inline="true" ref="form" :model="item" :rules="rules">
							<el-form-item prop="userName"  style="margin-bottom:20px">
								<el-input v-model="item.userName"  placeholder="请输入账号" @blur="checkUserName"  style="width: 280px;" clearable></el-input>
							</el-form-item>
							<el-form-item prop="password"  style="margin-bottom:20px;">
								<el-input v-model="item.password"  class='test' ref="password" id='password' placeholder="请输入密码"  type="password" style="width: 280px;" clearable></el-input>
							</el-form-item>
							<el-form-item prop="confirmPassword"  style="margin-bottom:20px;">
								<el-input v-model="item.confirmPassword"  placeholder="请再次输入密码" @blur="checkPasswordSame" type="password"  style="width: 280px;" clearable></el-input>
							</el-form-item>
							<el-form-item  >
								<el-button type="primary"  @click="regist">注册</el-button>
								<el-button type="success" @click="login">返回登陆</el-button>
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
		    		regist:this.$C.xproject+'/user/register',//注册接口
		    		checkUserName:'',
		    	},
				item:{
					userName: '',
					password: '',
					confirmPassword:'',
				},
				
		    	//验证
		    	rules: {
		    		userName:[ { required: true, message: '账号不能为空', trigger: 'blur' }],
		    		password:[{ required: true,  message: '密码不能为空', trigger: 'blur' }], 
		    		confirmPassword:[{ required: true,  message: '确认密码不能为空', trigger: 'blur' }], 
		    	},
			}
		},
	  	computed:{
	  	},
	  	methods: {
			login() {
				this.$router.push('/xproject/login');
			},
			regist() {
				if(this.item.password!=this.item.confirmPassword){
					this.$message.error("两次密码不一致");
					return ;
				}
				this.$T.post(this.url.regist,this.item,"",this.success);
			},
			success(res){
				if(res.code == "200") {
					this.$router.push('/xproject/login');
				} else {
					this.$message.error(res.error_msg);
				}
			},
			checkUserName(){},
			checkPasswordSame(){},
		},
		created() {
		},
		mounted() {

		},
	}
</script>

<style scoped>
.x-login-div{
	display:block;max-width: 600px;margin: auto; border: solid cornflowerblue 2px;border-radius: 15px;margin-top:10% ;
}
</style>