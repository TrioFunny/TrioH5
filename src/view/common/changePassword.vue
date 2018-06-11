<template>
	<div id="CP">
		<div style="width: 30%;margin: 5% 35%; border: solid cornflowerblue 2px;border-radius: 15px;">
			<div>
				<h1>修改密码</h1></div>
			<img src="../../assets/Resources/loginico.png" width="50%" style="border: solid cornflowerblue 2px; border-radius:50% ;margin:5% 0%;" />
			<div style="padding: 5% 20%;">
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
					<el-form-item label="旧密码" prop="oldpass">
						<el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="pass">
						<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码" prop="checkPass">
						<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
						<el-button @click="resetForm('ruleForm2')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>

	</div>
</template>

<script>
	import Common from '../../interface/common'
	export default {
		name: 'changePassword',
		data() {
			var checkOldPass = (rule, value, callback) => {
				if(value === '') {
					return callback(new Error('请输入密码'));
				}

			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入新密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入新密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				//				oldpass: '',
				//				pass: '',
				//				checkPass:'',
				ruleForm2: {
					pass: '',
					checkPass: '',
					oldPass: ''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					oldPass: [{
						validator: checkOldPass,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let param = {
							pass: this.ruleForm2.pass,
							oldPass: this.ruleForm2.oldPassass
						}
						Common.changePassword.post(param, this)
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			changePasswordCallback(res) {
				if(res.code == "200") {
					this.$message.success(res.data);
				} else if(res.code == "230") {
					this.$message.error(res.error_msg);
					this.ruleForm2.pass = '';
				} else if(res.code == "231") {
					this.$message.error(res.error_msg);
				} else if(res.code == "400") {
					this.$message.error(res.error_msg);
					this.$router.push('/login');
				}
			}
		}
	}
</script>

<style>

</style>