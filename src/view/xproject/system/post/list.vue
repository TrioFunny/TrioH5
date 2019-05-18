<template>
	<div>
		<div class="v-title1">接口管理</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 20px;">
			  <el-form-item label="">
			  	 <el-button @click="openAdd()">+</el-button>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.title" placeholder="标题"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.url" placeholder="地址"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.name" placeholder="名字"></el-input>
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
		    <el-table-column label="账号" prop="title" width="100" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="电话" prop="name"  width="120" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="邮件" prop="url"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">  
		      	<el-button  @click="goShow(scope.row)" type="text" size="small">查看</el-button> 
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
	    	title:'',//标题
	    	name:'',//名字
	    	url:'',//访问地址
	    	params:'',//参数
	    	paramsValue:'',//参数值
	    	type:'',//类型
	    	sign:'',//标记
	    },

    	url:{
    		getPage:this.$C.xproject+'/system/getGoodsPage',
    	},
        page:{
        	title:'',
        	name:'',
        	url:'',
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
        	title:'',
        	name:'',
        	url:'',
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



	},
	mounted() {
		this.getPage();
	},
}
</script>

<style>
</style>
