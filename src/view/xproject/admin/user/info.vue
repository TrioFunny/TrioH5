<template>
	<div style="overflow-y: scroll;height: 900px;padding: 20px 0px;">
	  <el-tabs v-model="tabs" >
	    <el-tab-pane label="用户基本信息" name="first">
	    	<div style="text-align: center;">
				<div class="v-title1" >商品信息</div>
				<el-form ref="spuForm" label-width="85px"  :inline="true" >
					<el-form-item label="用户名称"  prop="goodsName">
						<el-input v-model="info.name"  style="width: 220px" ></el-input>
					</el-form-item>
					<el-form-item label="地址"  >
						<el-input v-model="info.address"  style="width: 220px" ></el-input>
					</el-form-item>
					<br />
					<el-form-item label="头像"  prop="categoryId">
						<el-upload
						  class="avatar-uploader"
						  name="photofile"
						  :action="uploadUrl()"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-form>
				<div style="text-align: center;padding:30px;" >
					<el-button @click="saveUserInfo()"  style="width: 300px;" type="primary" size="medium">提交</el-button>
				</div>
	    	</div>
	    </el-tab-pane>
	    <el-tab-pane label="地址信息" name="second">
	    	<Address ></Address>
	    </el-tab-pane>
	    <!--规格信息-->
	    <el-tab-pane label="购物车信息" name="third">
	    	<ShopCart ></ShopCart>
	    </el-tab-pane>
	    
	    <el-tab-pane label="订单信息" name="fourth">
	    	<Order ></Order>
	    </el-tab-pane>
	    
	    <el-tab-pane label="收藏信息"  name="five">
	    	<Collect></Collect>
	    </el-tab-pane>
	    
	    <el-tab-pane label="历史记录" name="six">
	    </el-tab-pane>
	    
	    <el-tab-pane label="登陆记录" name="seven">
	    </el-tab-pane>
	  </el-tabs>
	</div>
</template>

<script>
import Address from './address'
import ShopCart from './shoppingCart'
import Order from './order'
import Collect from './collect'

export default {
  name: 'admin',
  data () {
    return {
		tabs:'first',
		info:{
			name:"",
			address:'',
			img:'',
		},
    	url:{//请求地址统一管理
    		getUserInfo:this.$C.xproject+'/user/getUserInfo',
    		getUserInfoByCode:this.$C.xproject+'/user/getUserInfoByAdmin',
    		saveUserInfo:this.$C.xproject+'/user/saveUserInfo',
    	},
		imageUrl:'',
		userCode:'',
    }
  },
	components: {
		Address,ShopCart,Order,Collect,
	},
	methods: {
		//上传路径
		uploadUrl(){
			return this.$C.xproject+'/upload/img?type=user&code=1';
		},
		//图片上传成功
	    handleAvatarSuccess(res, file) {
	    	console.log(res)
	    	if(res.code=="200"){
	    		this.info.img=res.data;
	    	}
	      this.imageUrl = URL.createObjectURL(file.raw);
	    },
        //图片上传前验证
      	beforeAvatarUpload(file) {
      		console.log(file.type);
        	const isJPG = file.type === 'image/jpeg';
        	const isLt2M = file.size / 1024 / 1024 < 2;
        	const isPNG = file.type === 'image/png';
			
        	if (!isJPG&&!isPNG) {
         	 this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
        	}
        	if (!isLt2M) {
        	  this.$message.error('上传头像图片大小不能超过 2MB!');
        	}
        	return (isJPG||isPNG) && isLt2M;
      	},
	  //获取用户信息
	  getUserInfo(){
	  	if(this.userCode!=''){
	  		this.$T.fool(this.url.getUserInfoByCode,{userCode:this.userCode},this.getInfoSuccess);
	  	}else{
	  		this.$T.fool(this.url.getUserInfo,"",this.getInfoSuccess);
	  	}
	  },
	  getInfoSuccess(res){
	  	if(res.code=='200'){
	  		if(res.data!=null){
		  		this.info=res.data;
		  		this.imageUrl=res.data.img;
	  		}
	  	}
	  },
	  saveUserInfo(){
	  	this.$T.fool(this.url.saveUserInfo,this.info,this.saveSuccess);
	  },
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		if(res.data!=null){
			this.$message.success('操作成功');
	  		}
	  	}else{
	  		this.$message(res.error_msg);
	  	}
	  },
	  
	},
	mounted() {
		if(this.$route.query.userCode!=undefined){
			this.userCode=this.$route.query.userCode;
			this.isAdmin=true;
		}
		this.getUserInfo();
	},
}
</script>

<style scoped>
.x-spec{
	margin: 5px; font-size: 10px;
}
.x-title{
	text-align: center;width: 100%;font-size: 20px;color: lightseagreen;font-weight: 550;
}
.v-title1{
	text-align: center;padding: 20px 30px;color: lightskyblue;font-size: 22px;
}
.v-title2{
	text-align: left;padding: 10px 20px;color: lightskyblue;font-size: 18px;
}

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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
