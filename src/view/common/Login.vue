<template>
	<div class="hello">

		<div style="width: 30%;margin: 5% 35%; border: solid cornflowerblue 2px;border-radius: 15px;text-align: center;">
			<div><h1>登录</h1></div>
			<img src="../../assets/Resources/loginico.png"  width="50%" style="border: solid cornflowerblue 2px; border-radius:50% ;margin:5% 0%;"/>
			<div style="padding: 5% 20%;">
				<el-input v-model="userName" placeholder="请输入账号" style="padding: 10px 0;"></el-input>
				<el-input v-model="password" type='password' placeholder="请输入密码" style="padding: 10px 0;"></el-input>
				<div id="">
					<el-button type="primary" @click="login" style="margin: 10px 10px;">登录</el-button>
					<el-button type="success" @click="regist" style="margin: 10px 10px;">注册</el-button>	
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import Common from '@/interface/common'
	import Util from '@/util/my/util';
	import { mapState,mapActions} from 'vuex'
	
	export default {
		name: 'login',
		data() {
			return {
				userName: '',
				password: '',
			}
		},
	  	computed:{
	 	 	...mapState(['rememberUser']),
	  	},
	  	methods: {
			login() {
				let param = {
					userName: this.userName,
					password: this.password,
				}
				Common.login.post(param, this);
			},
			loginCallback(res) {//登录成功
				if(res.code == "200") {
					//储存在Vuex全局变量中
					this.$router.push('/user/personalSpace');
				} else {
					this.$message.error(res.error_msg);
				}

			},
			regist() {
				this.$router.push('/Register');
			},

		},
		created() {
		},
		mounted() {
			console.log(Util.getCookie("userId"));
			//自动登录
			if(Util.getCookie("userId").length>0&&this.rememberUser){
				this.$router.push('/user/personalSpace');
			}
		},
	}
</script>

<style scoped>

</style>