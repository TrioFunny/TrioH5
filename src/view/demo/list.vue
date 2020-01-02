<template>
	<div>
		<div class="v-title1">分类管理</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item label="">
			  	 <el-button @click="openAdd()">+</el-button>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.categoryName" placeholder="分类名称"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-select v-model="page.isBan" placeholder="状态">
			      <el-option label="启用" value="0"></el-option>
			      <el-option label="禁用"  value="1"></el-option>
			    </el-select>
			 </el-form-item>
			  <el-form-item>
			    <el-button type="primary" size="small" @click="getPage">查询</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="info" size="small" @click="reset">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	
		<!--表格-->
		<div style="padding: 0px 20px;" >
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" @row-dblclick="openShow">
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" :index="indexMethod">
		    </el-table-column>
		    <el-table-column label="分类名称" prop="categoryName"  show-overflow-tooltip>
		    </el-table-column>
  			<el-table-column label="排序" prop="sort"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="是否禁用"   show-overflow-tooltip>
		      <template slot-scope="props">  
		      	{{ props.row.isBan=='0'? '使用': '禁用'}}
		      </template>
		    </el-table-column>
		    <el-table-column label="图片"   show-overflow-tooltip>
		      <template slot-scope="props">  
		      	<img :src="props.row.img"  width="50px"/>
		      </template>
		    </el-table-column>
		    <el-table-column label="更新时间"  show-overflow-tooltip >
		      <template slot-scope="props">  
		      	{{ $G.formatDate(props.row.updatedTime)}}
		      </template>
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">  
		      	<el-button  @click="openShow(scope.row)" type="text" size="small">查看</el-button> 
		    	<el-button  @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>   
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
	  
		<div style="padding: 20px;">
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
		    	:current-page="page.page"  :page-size="page.pageSize" 	:total="total"
		      layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]"
		      	>
		    </el-pagination>
		</div>
		
	<!--添加显示-->
	<div>
		<el-dialog :title="dialog.title" :visible.sync="dialog.showDialog" width="68%" >
			<div>
			<el-form :model="item"  label-width="100px":inline="true" :disabled="dialog.readonly">
				<el-form-item label="分类名称"  >
					<el-input v-model="item.categoryName"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="排序号"  >
  					<el-input-number v-model="item.sort"   label="">
  					</el-input-number>
				</el-form-item>
				<br />
				<el-form-item label="图片"  >
					<el-upload
					  class="avatar-uploader"
					  name="photofile"
					  :action="uploadUrl()"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" style="width: 100px">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="状态"  >
			    <el-select v-model="item.isBan" placeholder="状态">
			      <el-option label="启用" value="0"></el-option>
			      <el-option label="禁用"  value="1"></el-option>
			    </el-select>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialog.showDialog=false">取 消</el-button>
		    <el-button type="primary" @click="save()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>

  </div>
</template>

<script>
import Main from "@/view/admin/main";
	
export default {
  name: 'admin',
  data () {
    return {
    	This:this,
	    list: [],//
	    selectionList:[],//选中的项
	    
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
	    item:{
	    	id:'',
	    	categoryName:'',
	    	parentId:'',
			img:'',
			sort:'',
			isBan:'',
	    },
    	url:{//请求地址统一管理
    		getPage:this.$C.xproject+'/mall/getCategoryPage',
    		save:this.$C.xproject+'/mall/saveCategory',
    	},
        page:{//请求分页的数据
        	categoryName:'',
        	isBan:'',
        	page:1,
        	pageSize:10,
        	sortWord:'sort',
        	isAsc:1,
        },
        total:0,//总数
		
		//上传图片
		imageUrl:'',
    }
  },
	components: {
	},
	methods: {
		//上传路径
		uploadUrl(){
			return this.$C.xproject+'/upload/img?type=brand&code='+this.item.id;
		},
	    handleAvatarSuccess(res, file) {
	    	console.log(res)
	    	if(res.code=="200"){
	    		this.item.img=res.data;
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
      	
      indexMethod(index) {//自动生成index
        return index +1;
      },
	  handleClick(row) {//对应事件
	    console.log(row);
	  	this.dialog.showDialog=true;
	  	this.dialog.readonly=false;
	  	//填充对象
	  	this.item=row;
	  	this.imageUrl=row.img;
	  	this.item.isBan=row.isBan+"";
	  },
	  handleSizeChange(val){//修改页面数量
	  	this.page.pageSize=val;
	  	this.getPage();
	  },
	  handleCurrentChange(val){//点击页码
	  	this.page.page=val;
	  	this.getPage();
	  },
	  getPage(){
	  	this.$T.fool(this.url.getPage,this.page,this.success);
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data.data;
	  		this.total=res.data.total;
	  	}
	  },
	  reset(){//重置信息
	  	let page={
	  		categoryName:'',
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        }
	  	this.page=page
		this.getPage();
	  },
	  selection(val){//选择
		 this.selectionList = val;
	  },
	  openAdd(){
	  	this.dialog.readonly=false;
	  	this.dialog.showDialog=true;
	  	this.$G.emptyFrame(this.item);
	  	this.imageUrl="";
	  	this.item.isBan='1';
	  },
	  //保存
	  save(){
	  		this.$T.fool(this.url.save,this.item,this.saveSuccess);
	  },
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		this.dialog.showDialog=false;
	  		this.$message('提交成功');
	  		this.getPage();
	  	}
	  },
	  openShow(row){
	  	this.dialog.showDialog=true;
	  	this.dialog.readonly=true;
	  	//填充对象
	  	this.item=row;
	  	this.imageUrl=row.img;
	  	this.item.isBan=row.isBan+"";
	  },

	},
	mounted() {
		this.getPage();
	},
}
</script>

<style scoped="">
	
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
