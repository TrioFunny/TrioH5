<template>
	<div>
		<div class="v-title1">角色管理</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 20px;">
			  <el-form-item label="">
			  	 <el-button @click="openAdd()">+</el-button>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.code" placeholder="编码"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.name" placeholder="名称"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.type" placeholder="类型"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.summary" placeholder="介绍"></el-input>
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
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" @row-dblclick="openPermit">
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column label="编码" prop="code" width="100" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="姓名" prop="name"  width="120" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="类型" prop="type"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="状态" prop="status"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="是否参加工作流" prop="inWorkFlow" width="80"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="排序号" prop="sortCode"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">  
		      	<el-button  @click="openAlter(scope.row)" type="text" size="small">查看</el-button> 
		      	<el-button  @click="deleteItem(scope.row)" type="text" size="small">删除</el-button> 
		    	<el-button v-if="false" @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>   
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


	<!--权限-->
	<div>
		<el-dialog :title="dialog1.title" :visible.sync="dialog1.showDialog" width="60%" >
			   <el-checkbox-group v-model="userPermit" >
			   		<br />
				    <el-checkbox class="x-checkbox" v-for="permit in permitList"  :label="permit.name" :key="permit.code" border  ></el-checkbox>
			    </el-checkbox-group>
		  <span slot="footer" class="dialog1-footer">
		    <el-button @click="dialog1.showDialog=false">取 消</el-button>
		    <el-button type="primary" @click="">确 定</el-button>
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
    	This:this,

	    list: [],
	    item:{
	    	id:'',
	    	code:'',
	    	name:'',
	    	type:'',
	    	status:'',
	    	summary:'',
	    	sortCode:'',
	    	inWorkFlow:'',
	    },

    	url:{
    		getPage:this.$C.xproject+'/system/getPageOnRole',
    		save:this.$C.xproject+'/system/saveRole',
    		delete:this.$C.xproject+'/system/getGoodsPage',
    		getAllPermint:this.$C.xproject+'/system/getPageOnPermitAll',
    		getRolePermint:this.$C.xproject+'/system/getRolePermint',
    	},
        page:{
        	summary:'',
        	status:'',
        	type:'',
        	name:'',
        	code:'',
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
         total:0,
         
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
	    
	    //权限设置
	    dialog1:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
	    //用户拥有的权限
	    userPermit:[],
	    //所有权限
	    permitList:[],
    }
  },
	components: {
	},
	methods: {
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

	  reset(){//重置信息
	  	let page={
        	summary:'',
        	status:'',
        	type:'',
        	name:'',
        	code:'',
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
	  //TODO :页面事件
	  //添加
	  openAdd(){
	  	this.dialog.readonly=false;
	  	this.dialog.showDialog=true;
	  	this.$G.emptyFrame(this.item);
	  },
	  //修改
	  openAlter(item){
	  	this.dialog.readonly=false;
	  	this.dialog.showDialog=true;
	  	this.$G.emptyFrame(this.item);
	  },
	  //设置权限
	  openPermit(item){
	  	console.log(item);
	  	this.dialog1.readonly=false;
	  	this.dialog1.showDialog=true;
	  },
	  // TODO  请求事件
	  //保存 事件
	  save(){
	  	let token =this.$G.getCookie("token");
		this.$T.request(this.url.save,this.item,token,this.saveSuccess);
	  			  	
	  },
	  //删除事件
	  deleteItem(item){
	  	let token =this.$G.getCookie("token");
	  	let param={
	  		id:[item.id],
	  	}
		this.$T.request(this.url.delete,param,token,this.saveSuccess);
	  },
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		this.dialog.showDialog=false;
	  		this.$message('提交成功');
	  		this.getPage();
	  	}
	  },
	  //获取页面事件
	  getPage(){//获取信息（刷新）
	  	let token =this.$G.getCookie("token");
	  	this.$T.request(this.url.getPage,this.page,token,this.success);
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data.data;
	  		this.total=res.data.total;
	  	}
	  },
	  //删除事件
	  getAllPermint(){
	  	let token =this.$G.getCookie("token");
		this.$T.request(this.url.getAllPermint,'',token,this.getAllPerminSuccess);
	  },
	  getAllPerminSuccess(res){ //成功回调
	  	if(res.code=="200")
	  	this.permitList=res.data;
	  },

	},
	mounted() {
		this.getPage();
		this.getAllPermint();
	},
}
</script>

<style scoped>
	.x-checkbox{
		width: 80%;
		margin:8px 10% !important;
		display: block;
	}
</style>
