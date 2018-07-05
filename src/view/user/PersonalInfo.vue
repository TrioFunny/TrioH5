<template>
  <div id='PersonalInfo' style="background-color:white;width: 80%;height: 80%;padding: 30px;border-radius: 5px;" >
  	
		<el-form ref="user" :model="user" label-width="100px" style="width: 60%;">
			
		  <el-form-item label="头像：">
				<el-upload class="avatar-uploader" name="photofile" style="float: left;background: white;" :action="uploadUrl" :on-error="error" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
		  </el-form-item>
		  
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
	import Config from '@/util/config';
	import { mapState,mapActions} from 'vuex'
	
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
        
        //头像图片
				imageUrl: '',
				//图片上传路径
        //页面控制
			pickerOptions:'',
			}
		},
		computed:{
			...mapState(['userId']),
			uploadUrl:function(){
				return Config.uploadServerUrl+"?userId="+this.userId;
			},
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
			handleAvatarSuccess(res, file) {
				if(res.code == '400') {
					this.$message.error(res.error_msg);
					this.$router.push('/login');
					return;
				}
				if(res.code == '500') {
					this.$message.error('上传失败，请稍后再试....');
					return;
				}
				this.$message.success('更换头像成功');
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			error(res,file){
				console.log(res);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
      
		},
		created(){
			this.userId=Util.getCookie("userId");
		},
	}
</script>

<style >
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 128px;
		height: 128px;
		line-height: 128px;
		text-align: center;
	}
	
	.avatar {
		width: 128px;
		height: 128px;
		display: block;
	}
</style>