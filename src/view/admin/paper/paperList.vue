<template>
	<div>
		<div class="v-title1">试卷管理</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item label="">
			  	 <el-button @click="$G.goToByName(This,'paper')">+</el-button>
			  </el-form-item>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.title" placeholder="题目"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.text" placeholder="说明"></el-input>
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
		    <el-table-column label="题目" prop="title" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="说明" prop="text" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="题目数量" width="150px" show-overflow-tooltip >
		    	 <template slot-scope="props">
		    	 	{{props.row.questionId.split(',').length}}
		    	</template>
		    </el-table-column>
		    
		    <el-table-column label="操作" >
		      <template slot-scope="scope">  
		    	<el-button  @click="handleClick(scope.row)" type="text" size="small" v-if="false">编辑</el-button>   
		    	<el-button type="text" size="small" @click="deletePaper(scope.row.id)">删除</el-button>
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
	    total:0,
        page:{
        	text:'',
        	title:'',
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
		selectionList:[],
    }
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
	  	let url=this.$G.server+"/admin/getPaperPage";
	  	let data=this.page;
	  	this.$T.post(url,data,"",this.success);
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data.data;
	  		this.total=res.data.total;
	  	}
	  },
	  reset(){//重置信息
	  	let page={
        	type:'',
        	title:'',
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
	  goShow(row){
	  	this.$G.goTo(this,'/admin/showPaper',{id:row.id})
	  },
	  deletePaper(id){
	  	let url=this.$G.server+"/admin/deletePaper";
	  	let data={id:id}
	  	this.$T.post(url,data,"",this.deleteSuccess);
	  },
	  deleteSuccess(res){
	  	if(res.code=="200"){
	  		this.$message('删除成功');
	  		this.getPage();
	  	}
	  },
	},
	mounted() {
		this.getPage();
	},
}
</script>

<style>
</style>
