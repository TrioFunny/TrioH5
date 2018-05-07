<template>
	<div class="hello">
		<div>
			<h1>注册</h1>
		</div>
		<div style="width: 80%;margin: 10% 10%; border: solid cornflowerblue 2px;border-radius: 15px;">
			<div style="padding: 10%;">
				<el-input v-model="userName" v-bind:style="borderStyle1" placeholder="请输入账号" @blur="checkUserName" @focus="Onfocus('name')" clearable></el-input>
				<el-input v-model="password" v-bind:style="borderStyle2" placeholder="请输入密码" @blur="checkPassword" @focus="Onfocus('pwd1')" type="password" clearable></el-input>
				<el-input v-model="password1" v-bind:style="borderStyle3" placeholder="请再次输入密码" @blur="checkPasswordSame" type="password" @focus="Onfocus('pwd2')" clearable></el-input>
				<!--				<el-input v-model="code" placeholder="请输入验证码"></el-input><img src="" style="width:100px;height:50px;" />-->
				<br />
				<br />
				<el-button type="primary" :disabled="isdis" @click="regist">注册</el-button>
				<el-button type="success" @click="login">返回登陆</el-button>
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
				borderStyle1: '',
				borderStyle2: '',
				borderStyle3: '',
				errorStyle: {
					border: 'solid red 1px',
					borderRadius: '5px',
					outline: 'none'
				},
				isdis: false,
				allowUserName: false,
			}
		},
		methods: {
			checkUserName() {
				let param = {
					userName: this.userName
				}
				Common.registCheckUserName.post(param, this);
			},
			checkUserNameCallback(res) {
				if(res.code == "200") {
					//this.$message.success(res.data + '!');
					this.allowUserName = true;
					//this.isdis = false;

				} else {
					this.$message.error(res.error_msg);
					this.borderStyle1 = this.errorStyle;
					this.allowUserName = false;
				}
			},
			regist() {
				this.isdis = true;
				let cp = this.checkPassword();
				let cps = this.checkPasswordSame();
				this.checkUserName();
				//console.log('cp:' + cp + '---' + 'cps:' + cps + '---')
				if(cp && cps && this.allowUserName) {
					let param = {
						userName: this.userName,
						password: this.password
					}
					Common.regist.post(param, this);
				}
				this.isdis = false;
			},
			registCallback(res) {
				if(res.code == '200') {
					this.$message.success("注册成功，请重新登录！");
					this.$router.push('/Login');
				} else {
					this.$message.error(res.error_msg + "，请联系管理员！");
				}
			},
			checkPassword() {
				if(this.password == "" || this.password == null) {
					this.$message.error('密码不能为空！');
					this.borderStyle2 = this.errorStyle;
					return false;
				}
				return true;
			},
			checkPasswordSame() {
				if(this.password1 == "" || this.password1 == null) {
					this.$message.error('再次输入密码不能为空！');
					return false;
				} else if(this.password1 != this.password) {
					this.$message.error('两次密码输入不一样！');
					this.borderStyle3 = this.errorStyle;
					return false;
				} else if(this.userName == null || this.userName == "") {
					this.$message.error('用户名不能为空！');
					this.borderStyle1 = this.errorStyle;
					return false;
				} else {
					//this.isdis = false;
					return true;
				}
			},
			Onfocus(param) {
				if(param == 'name') {
					this.borderStyle1 = {}
				} else if(param == 'pwd1') {
					this.borderStyle2 = {}
				} else if(param == 'pwd2') {
					this.borderStyle3 = {}
				}

			},
			login() {
				this.$router.push('/Login');
			}

		}
	}
</script>

<style scoped>

</style>