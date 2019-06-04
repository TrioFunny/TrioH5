<template>
	<div>
		<div class="v-title1">权限接口</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 20px;">
			  <el-form-item label="">
			  	 <el-button @click="openAdd()">+</el-button>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.name" placeholder="名称"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.code" placeholder="编码"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.path" placeholder="路径"></el-input>
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
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" @row-dblclick="">
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column label="名称" prop="name"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="编码" prop="code"  width="120" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="路径" prop="path"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">  
		      	<el-button  @click="openAlter(scope.row)" type="text" size="small">编辑</el-button> 
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

	<!--添加显示-->
	<div>
		<el-dialog :title="dialog.title" :visible.sync="dialog.showDialog" width="68%" >
			<div>
			<el-form :model="item"  label-width="100px":inline="true" :disabled="dialog.readonly">
				<el-form-item label="名称"  >
					<el-input v-model="item.name"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="路径"  >
					<el-input v-model="item.path"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="编码"  >
					<el-input v-model="item.code"  style="width: 220px" ></el-input>
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
export default {
  name: 'admin',
  data () {

    return {
    	This:this,
	    list: [],
	    item:{
	    	id:'',
	    	path:'',//标题
	    	name:'',//名字
	    	code:'',//访问地址
	    },

    	url:{
    		getPage:this.$C.xproject+'/system/getPageOnPermit',
    		save:this.$C.xproject+'/system/savePermit',
    		delete:this.$C.xproject+'/system/deletePermit',
    	},
        page:{
        	code:'',
        	name:'',
        	path:'',
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
	  //保存 事件
	  save(){
	  	let token =this.$G.getCookie("token");
		this.$T.request(this.url.save,this.item,token,this.saveSuccess);
	  			  	
	  },
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		this.dialog.showDialog=false;
	  		this.$message('提交成功');
	  		this.getPage();
	  	}
	  },
	  //删除事件
	  deleteItem(item){
	  	let token =this.$G.getCookie("token");
	  	let param={
	  		id:[item.id],
	  	}
		this.$T.request(this.url.delete,param,token,this.saveSuccess);
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
	  reset(){//重置信息
	  	let page={
        	code:'',
        	name:'',
        	path:'',
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




	},
	mounted() {
		this.getPage();
	},
}
</script>

<style>
</style>
