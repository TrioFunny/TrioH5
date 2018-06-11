<template>
  <div id='PersonalInfo' style="background-color:white;width: 80%;height: 80%;padding: 30px;border-radius: 5px;" >
  	
		<el-form ref="user" :model="user" label-width="100px" style="width: 60%;">
			
		  <el-form-item label="昵称：">
		    <el-input v-model="user.nickname"></el-input>
		  </el-form-item>
		  <el-form-item label="性别：">
			    <el-radio v-model="user.gender" label="1" border size="medium">男</el-radio>
			    <el-radio v-model="user.gender" label="2" border size="medium">女</el-radio>
			    <el-radio v-model="user.gender" label="3" border size="medium">保密</el-radio>
		  </el-form-item>

		  <el-form-item label="生日：">
		  	<div class="block">
		    	<el-date-picker	v-model="birthday"	type="date"	placeholder="选择日期" :picker-options="pickerOptions"> </el-date-picker>
		    </div>
		  </el-form-item>
		  
		 <el-form-item label="个人签名：">
				<el-input
				  type="textarea"	:autosize="{ minRows: 2, maxRows: 4}"	placeholder="请输入内容"
				  v-model="user.introduce" >
				</el-input>
		 </el-form-item>
		  <el-form-item label="电话号码：">
		    <el-input v-model="user.phone"></el-input>
		  </el-form-item>
		  <el-form-item label="qq：">
		    <el-input v-model="user.qq"></el-input>
		  </el-form-item>
		  <el-form-item label="email：">
		    <el-input v-model="user.email"></el-input>
		  </el-form-item>
		  <el-form-item label="github：">
		    <el-input v-model="user.github"></el-input>
		  </el-form-item>
	
		</el-form>
		 <el-button type="primary" plain  @click="alterUserInfo()">提交</el-button>
	</div>
</template>

<script>
	import User from '@/interface/user';
	export default {
		data() {
			return {
				msg: '个人信息',
				//表单信息
				nickname:'',
				user:{
					id:'2a9650307d2f44398a3474a3245fd861',
					username:'',
					password:'',
					lastlogintime:'',
					lastloginip:'',
					isban:'',
					email:'',
					emailconfirm:'',
					github:'',
					phone:'',
					phoneconfirm:'',
					nickname:'',
					banreason:'',
					introduce:'',
					qq:'',
					gender:'',
					school:'',
					age:'',
					exp:'',
					wealth:'',
					headportrait:'',
				},
				birthday:'',
        
        //页面控制
			pickerOptions:'',
			}
		},
		methods: {
      alterUserInfo(){
      	let param={
					id:this.user.id,
					email:this.user.email,
					github:this.user.github,
					phone:this.user.phone,
					nickname:this.user.nickname,
					banreason:this.user.banreason,
					introduce:this.user.introduce,
					qq:this.user.qq,
					gender:this.user.gender,
					school:this.user.school,
					age:this.user.age,
					exp:this.user.exp,
					wealth:this.user.wealth,
					headportrait:this.user.headportrait,
      	}
      	User.alterUserInfo.Post(param,this);
      },
      callback(res){
      	
      },
		},
	}
</script>

<style >

</style>