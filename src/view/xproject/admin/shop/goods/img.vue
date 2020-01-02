<template>
	<div style="padding: 20px ">
			<!--展示-->
			<div>
				<el-row>
				  <el-col :span="5">
					<el-card class="box-card" style="margin: 10px;">
					  <div slot="header" > 
					  	<span>缩略图</span> 
						<el-button class="x-button" type="text"  @click="openAddImg(1)" :disabled="spu.state=='1'">添加图片</el-button>
					  </div>
					  <div v-for="item in goodsImgs.thum" :key="item.id"  >
					   <img :src="item.path" width="100%" @click="openChangeImg(item)"></img>
					  </div>
					</el-card>
				  </el-col>
				  <el-col :span="10">
					<el-card class="box-card" style="margin: 10px;">
					  <div slot="header" > 
					  	<span>展示图</span> 
					  <el-button class="x-button" type="text"  @click="openAddImg(2)" :disabled="spu.state=='1'">添加图片</el-button>
					  </div>
						  <el-carousel indicator-position="outside" height="600px">
						    <el-carousel-item v-for="item in goodsImgs.show" :key="item.id">
						      <img :src="item.path" width="100%" @click="openChangeImg(item)"></img>
						    </el-carousel-item>
						  </el-carousel>
					</el-card>
				  </el-col>
				  <el-col :span="8" style="margin: 10px;">
					<el-card class="box-card" >
					  <div slot="header" > 
					  	<span>详情图</span> 
						<el-button class="x-button" type="text"  @click="openAddImg(3)" :disabled="spu.state=='1'">添加图片</el-button>
					  </div>
					  <div class="x-item"  >
					    <img :src="item.path" width="100%" @click="openChangeImg(item)"  v-for="item in goodsImgs.detailed"  :key="item.id"/>
					  </div>
					</el-card>
				  	
				  </el-col>
				</el-row>
			</div>

			<!--<div style="width: 100%;position: absolute;padding: 50px;"></div>-->
			<!--功能-->
			<div style="text-align: center;padding: 10px;"></div>
			<!--弹出模态框栏-->
		<div>
			<el-dialog :title="dialog.title" :visible.sync="dialog.showDialog" width="50%" >
				<div>
				<el-form ref="form" :model="item"  label-width="100px":inline="true"  :rules="rules" :disabled="dialog.readonly">
					<el-form-item label="标题"  >
						<el-input v-model="item.title"  style="width: 220px" ></el-input>
					</el-form-item>
					<br />
					<el-form-item label="排序号"  >
	  					<el-input-number v-model="item.sort"   label="">
	  					</el-input-number>
					</el-form-item>
					<el-form-item label="分类"  prop="type">
						  <el-select v-model="item.type" placeholder="请选择" style="width: 220px">
						    <el-option  label="缩略图"  value="1"></el-option>
						    <el-option  label="展示图"  value="2"></el-option>
						    <el-option  label="详情图"  value="3"></el-option>
						  </el-select>
					</el-form-item>
					<br />
					<el-form-item label="图片"  prop="type">
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
				</div>
			  <span slot="footer" class="dialog-footer">
			  	<el-button v-if="spu.state=='-1'" type="danger" @click="deleteGoodsImg()" >删除</el-button>
			    <el-button v-if="spu.state=='-1'" type="primary" @click="saveGoodsImg()">确 定</el-button>
			    <el-button @click="dialog.showDialog=false">返回</el-button>
			  </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
    	url:{//请求地址统一管理
    	},
		//规格信息栏
		//specList:[],

		item:{
			id:'',//id
			spuId:'',//商品id
			type:'',//类型
			path:'',//路径
			sort:'',//排序
			title:'',//标题
		},
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
    	//验证
    	rules: {
    		goodsName:[ { required: true, message: '请输入答案', trigger: 'blur' }],
    		categoryId:[{ required: true,  message: '请输入答案', trigger: 'blur' }], 
    		brandId:[ { required: true, message: '请输入答案', trigger: 'blur' }],
    	},
    	//uploadUrl:this.$C.xproject+'/upload/goodsImg?type=goods&goodsCode='+this.spu.spuNo,
    	imageUrl: '',
    	url:{//请求地址统一管理
    		saveGoodsImg:this.$C.xproject+'/mall/saveGoodsImg',
    		deleteGoodsImg:this.$C.xproject+'/mall/deleteGoodsImg',
    	},
    }
  },
    props: ['goodsImgs','spu'],
	methods: {
		//上传路径
		uploadUrl(){
			return this.$C.xproject+'/upload/img?type=goods&code='+this.spu.spuNo;
		},
		//打开添加栏
		openAddImg(type){
		  	this.dialog.readonly=false;
		  	this.dialog.showDialog=true;
		  	this.imageUrl="";
		  	this.$G.emptyFrame(this.item);
		  	this.item.spuId=this.spu.id;
			if(type==1){
				this.item.type='1';
			}
			if(type==2){
				this.item.type='2';
			}
			if(type==3){
				this.item.type='3';
			}
		},
		
		//保存图片
		saveGoodsImg(){
			this.$T.request(this.url.saveGoodsImg,this.item,this.token,this.saveGoodsSuccess);
		},
		saveGoodsSuccess(res){
		  	if(res.code=='200'){
		  		this.dialog.showDialog=false;
		  		this.$message.success('提交成功');
		  		this.$emit('refresh');
		  	}else{
	  		this.$message.error(res.error_msg);
	  		}
		},
		//
		openChangeImg(item){
			if(this.spu.state=='-1'){
				this.dialog.readonly=false;
			}else{
				this.dialog.readonly=true;
			}
		  	this.dialog.showDialog=true;
			this.item=item
			this.imageUrl=item.path;
		},
		//图片上传成功
	    handleAvatarSuccess(res, file) {
	    	console.log(res)
	    	if(res.code=="200"){
	    		this.item.path=res.data;
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
      	deleteGoodsImg(){
      		let param={
      			id:this.item.id,
      			spuId:this.spu.id,
      		}
      		this.$T.request(this.url.deleteGoodsImg,param,this.token,this.saveGoodsSuccess);
      	},
      	
	},
	mounted() {
		this.token=this.$G.getCookie("token");
	},
}
</script>

<style scoped>
.x-button{
	float: right; padding: 3px 0
}
.x-item{
	overflow-y: scroll;width: 100%; height:600px;padding:13px 20px;
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
