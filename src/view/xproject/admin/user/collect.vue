<template>
	<div>
		<div class="v-title1">收藏管理</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item label="">
			  	 <el-button @click="openAdd()">+</el-button>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.name" placeholder="姓名"></el-input>
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
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" @row-dblclick="goShow">
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" :index="indexMethod">
		    </el-table-column>
		    <el-table-column label="图片"   show-overflow-tooltip  width="150">
		      <template slot-scope="props">  
		      	<img :src="props.row.image_Path"  width="100%"/>
		      </template>
		    </el-table-column>
		    <el-table-column label="商品名称" prop="goods_name" width="100" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="价格" prop="low_price"  width="120" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">
		      	<el-button  @click="" type="text" size="small">前往</el-button>  
		    	<el-button  @click="" type="text" size="small">删除</el-button>   
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


  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
    	This:this,

	    list: [],
	    selectionList:[],
	    userCode:'',
	    item:{
	    	id:'',
	    	code:'',
	    	name:'',
	    	password:'',
	    	email:'',
	    	phone:'',
	    	status:'',
	    },
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
    	url:{
    		getPage:this.$C.xproject+'/user/getUserCollect',
    		delete:this.$C.xproject+'/user/deleteUserCollect',
    		getPageByAdmin:this.$C.xproject+'/user/getUserCollectByAdmin',
    	},
        page:{
        	userCode:'',
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
         total:0,
		
    }
  },
	components: {
	},
	methods: {
      indexMethod(index) {//自动生成index
        return index +1;
      },
	  handleClick(row) {//对应事件
	    console.log(row);
	  },
	  handleSizeChange(val){//修改页面数量
	  	this.page.pageSize=val;
	  	this.getPage();
	  },
	  handleCurrentChange(val){//点击页码
	  	this.page.page=val;
	  	this.getPage();
	  },
	  getPage(){//获取信息（刷新）
	  	if(this.userCode!=''){
	  		this.page.userCode=this.userCode
	  		this.$T.fool(this.url.getPageByAdmin,this.page,this.success);
	  	}else{
	  		this.$T.fool(this.url.getPage,this.page,this.success);
	  	}
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data.data;
	  		this.total=res.data.total;
	  	}
	  },
	  reset(){//重置信息
	  	let page={
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
	  //打开添加模态框
	  openAdd(){
	  	this.dialog.readonly=false;
	  	this.dialog.showDialog=true;
	  	this.$G.emptyFrame(this.item);
	  },
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
	  //编辑事件
	  handleClick(row) {
	    console.log(row);
	  	this.dialog.showDialog=true;
	  	this.dialog.readonly=false;
	  	//填充对象
	  	this.item=row;
	  },
	   //打开展示模态框
	  openShow(row){
	  	this.dialog.showDialog=true;
	  	this.dialog.readonly=true;
	  	//填充对象
	  	this.item=row;
	  },
	  //跳转到详细页面
	  goShow(row){
	  	console.log(row.code);
	  	let query={code:row.code}
	  	this.$router.push({ path: '/xproject/admin/userInfo', query})
	  },
	},
	mounted() {
		if(this.$route.query.userCode!=undefined){
			this.userCode=this.$route.query.userCode;
			this.isAdmin=true;
		}
		this.getPage();
	},
}
</script>

<style>
</style>
