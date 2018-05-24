<template>
  <div id='PersonalInfo' style="background-color:white;width: 80%;height: 80%;padding: 30px;border-radius: 5px;">
  	
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
		    	<el-date-picker	v-model="user.birthday"	type="date"	placeholder="选择日期" :picker-options="pickerOptions"> </el-date-picker>
		    </div>
		  </el-form-item>
		  
		 <el-form-item label="个人签名：">
				<el-input
				  type="textarea"	:autosize="{ minRows: 2, maxRows: 4}"	placeholder="请输入内容"
				  v-model="introduce" >
				</el-input>
		 </el-form-item>


		</el-form>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: '个人信息',
				//表单信息
				nickname:'',
				user:{
					id:'',
					username:'',
					password:'',
					lastlogintime:'',
					lastloginip:'',
					isban:'',
					banreason:'',
					
					nickname:'',
					gender:'1',
					introduce:'',
					school:'',
					
					age:'',
					headportrait:'',
					qq:'',
					email:'',
					emailconfirm:'',
					github:'',
					phone:'',
					phoneconfirm:'',
					exp:'',
					wealth:'',
				},
        
        //页面控制

			}
		},
		methods: {
		},
	}
</script>

<style >

</style>