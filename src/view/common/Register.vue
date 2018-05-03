<template>
	<div class="hello">
		<div>
			<h1>注册</h1>
		</div>
		<div style="width: 80%;margin: 10% 10%; border: solid cornflowerblue 2px;border-radius: 15px;">
			<div style="padding: 10%;">
				<el-input v-model="userName" placeholder="请输入账号" @blur="checkUserName"></el-input>
				<el-input v-model="password" placeholder="请输入密码"></el-input>
				<el-input v-model="password1" placeholder="请再次输入密码"></el-input>
				<el-input v-model="code" placeholder="请输入验证码"></el-input><img src="" style="width:100px;height:50px;" />
				<br />
				<br />
				<el-button type="primary" :disabled="isdis">注册</el-button>
				<el-button type="success">返回登陆</el-button>
			</div>
		</div>

	</div>
</template>

<script>
	import Common from '../../interface/common'
	export default {
		name: 'Register',
		data() {
			return {
				userName: '',
				password: '',
				password1: '',
				code: '',
				isdis: false,
			}
		},
		methods: {
			checkUserName() {
				let param = {
					userName: this.userName
				}
				Common.regist.post(param, this);
			},
			registCallback(res) {
				if(res.code == "200") {
					this.$message.success(res.data + '!');
					this.isdis = true;
				} else {
					this.$message.error(res.error_msg);
				}
			}

		}
	}
</script>

<style scoped>

</style>