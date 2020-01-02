<template>
	<div>
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item label="">
			  	 <el-button  @click="openAdd()">+</el-button>
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
		    <el-table-column label="收货人" prop="name" width="100" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="电话" prop="phone"  width="120" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="地址" prop="address"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="详细地址"  prop="detailedAddress"    show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="标签"  prop="tag"   width="50"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="是否默认"  prop="isDefault"   width="50"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">
		      	<el-button  @click="openShow(scope.row)" type="text" size="small">查看</el-button>  
		    	<el-button v-if="!isAdmin" @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>   
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
		<el-dialog :title="dialog.title" :visible.sync="dialog.showDialog" width="40%" >
			<div>
			<el-form ref="form" :model="item"  label-width="100px":inline="true"  :disabled="dialog.readonly">
				<el-form-item label="收货人名称"  prop="goodsName">
					<el-input v-model="item.name"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="电话"  >
					<el-input v-model="item.phone" type="number" style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="地址"  >
					<el-input v-model="item.address" style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="详细地址"  >
					<el-input v-model="item.detailedAddress"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="标签"  >
					<el-input v-model="item.tag"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="是否默认"  >
					<el-input v-model="item.isDefault" style="width: 220px" ></el-input>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialog.showDialog=false">取 消</el-button>
		    <el-button type="primary" @click="save()" :disabled="dialog.readonly">确 定</el-button>
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
	    isAdmin:false,
	    userCode:'',
	    item:{
	    	id:'',
	    	userCode:'',//用户编号
	    	name:'',//收货人姓名
	    	phone:'',//电话
	    	address:'',//地址
	    	detailedAddress:'',//详细地址
	    	tag:'',//标签
	    	isDefault:'',//是否默认
	    },
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
    	url:{
    		getPage:this.$C.xproject+'/user/getUserAddress',
    		save:this.$C.xproject+'/user/saveUserAddress',
    		getPageByAdmin:this.$C.xproject+'/user/getUserAddressByAdmin',
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
	  getToken(){
		return this.$G.getCookie("token");
	  },
      indexMethod(index) {//自动生成index
        return index +1;
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
	  		this.$G.Resource.addressList=this.list;
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
