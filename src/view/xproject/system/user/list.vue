<template>
	<div>
		<div class="v-title1">用户管理</div>	
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
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" @row-dblclick="showRole">
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" :index="indexMethod">
		    </el-table-column>
		    <el-table-column label="账号" prop="name" width="100" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="电话" prop="phone"  width="120" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="邮件" prop="email"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="状态"  prop="status"   width="50"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column type="expand" label="详细" width="100px">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" >
		          <el-form-item label="姓名">
		            <span>{{props.row.name}}</span>
		          </el-form-item>
		          <el-form-item label="邮箱">
		            <span>{{props.row.email}}</span>
		          </el-form-item>
		          <el-form-item label="电话">
		            <span>{{props.row.phone}}</span>
		          </el-form-item>
		          <br />
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">
		      	<el-button  @click="openShow(scope.row)" type="text" size="small">查看</el-button>  
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
				<el-form-item label="用户名"  >
					<el-input v-model="item.name"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="密码"  >
					<el-input v-model="item.password"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="邮件"  >
					<el-input v-model="item.email"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="手机号"  >
					<el-input v-model="item.phone"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="状态"  >
					<el-input v-model="item.status"  style="width: 220px" ></el-input>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialog.showDialog=false">取 消</el-button>
		    <el-button type="primary" @click="save()">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog :title="dialog1.title" :visible.sync="dialog1.showDialog" width="68%" >
			<el-form :model="item"  label-width="100px":inline="true" :disabled="dialog1.readonly">
				<el-form-item label="现有角色"  >
					<el-tag v-for="role in userRoleList"  @close="deleteParam(role)"  class="xspace" closable  :key="role.id">
						<span>{{role.name}}</span>
						<span style="margin-left: 20px;">{{role.value}}</span>
					</el-tag>
				</el-form-item>
				<br />
				<el-form-item label="角色"  >
				  <el-select v-model="addUserRole.roleId" placeholder="分类" style="width: 150px">
				    <el-option v-for="role in allRoleList" :key="role.id" :label="role.name"  :value="role.id">
				  	</el-option>
				  </el-select>
				</el-form-item>
				<el-form-item >
 					<el-button type="primary" @click="saveUserRole()">添加</el-button>
				</el-form-item>
			</el-form>
		  <span slot="footer" class="dialog1-footer">
		    <el-button @click="dialog1.showDialog=false">取 消</el-button>
		    <el-button type="primary" @click="dialog1.showDialog=false">确 定</el-button>
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
	    selectionList:[],
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
    		getPage:this.$C.xproject+'/user/getUserPage',
    		save:this.$C.xproject+'/user/saveUser',
    		getPageOnRoleAll:this.$C.xproject+"/system/getPageOnRoleAll",
    		getUserRole:this.$C.xproject+'/system/getUserRole',
    		saveUserRole:this.$C.xproject+'/system/saveOneUserRole',
    	},
    	
        page:{
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
         total:0,
		
		
	    dialog1:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
	    
	    allRoleList:[],
	    userRoleList:[],
	    
	    addUserRole:{
	    	roleId:'',
	    	userId:'',
	    }
	    
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
	  	//post(地址，参数，当前对象，成功方法，失败方法)
	  	this.$T.post(this.url.getPage,this.page,"",this.success);
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
	  clear(){//清空
		 this.$refs.multipleTable.clearSelection();
	  },
	  //打开添加模态框
	  openAdd(){
	  	this.dialog.readonly=false;
	  	this.dialog.showDialog=true;
	  	this.$G.emptyFrame(this.item);
	  },
	  save(){
	  		this.$T.post(this.url.save,this.item,"",this.saveSuccess);
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
	  showRole(row){
	  	console.log(row.id);
	  	this.dialog1.showDialog=true;
	  	this.dialog1.readonly=false;
	  	this.getUserRole(row.id)
	  },
	  
	  getPageOnRoleAll(){
	  	let token =this.$G.getCookie("token");
		this.$T.request(this.url.getPageOnRoleAll,'',token,this.getPageOnRoleAllSuccess);
	  },
	  getUserRole(id){
	  	this.addUserRole.userId=id;
	  	let token =this.$G.getCookie("token");
	  	let param={
	  		userId:id,
	  	}
		this.$T.request(this.url.getUserRole,param,token,this.getUserRoleSuccess);
	  },
	  getPageOnRoleAllSuccess(res){ 
	  	if(res.code=="200"){
	  		this.allRoleList=res.data;
	  	}
	  },
	  getUserRoleSuccess(res){ 
	  	if(res.code=="200"){
	  		this.userRoleList=res.data;
	  	}
	  },
	  saveUserRole(){
	  	let token =this.$G.getCookie("token");
		this.$T.request(this.url.saveUserRole,this.addUserRole,token,this.saveSuccess);
	  },
	},
	mounted() {
		this.getPage();
		this.getPageOnRoleAll()
	},
}
</script>

<style>
</style>
