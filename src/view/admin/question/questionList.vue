<template>
	<div>
		<div class="v-title1">试题管理</div>

		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item label="">
			  	 <el-button @click="$G.goToByName(This,'questionInfo')">+</el-button>
			  </el-form-item>
			  
			  <el-form-item label="">
			    <el-select v-model="page.type" placeholder="类型">
			      <el-option label="DICS"  value="1"></el-option>
			      <el-option label="单选题" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.title" placeholder="题目"></el-input>
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
		<div style="padding: 0px 20px;">
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection">
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" :index="indexMethod">
		    </el-table-column>
		    <el-table-column label="类型" prop="type" width="100px" show-overflow-tooltip>
		    	 <template slot-scope="props">
		    	 	<el-tag :type="props.row.type==1 ? 'success' : ''">{{(props.row.type==1 ? 'DICS' : '单选题')}}</el-tag>
		    	</template>
		    </el-table-column>
		    <el-table-column label="题目"show-overflow-tooltip>
		    	 <template slot-scope="props">
		    	 	{{(props.row.type==1 ? '（编号'+props.row.id+")" : props.row.title)}}
		    	</template>
		    </el-table-column>
		    
		    <el-table-column label="选项" show-overflow-tooltip>
		    	 <template slot-scope="props">
		            <span v-for=" (item,index) in JSON.parse(props.row.options) ":key="item.id">
		            	{{ item.option }}-{{ item.text }}
		            </span>
		          </el-form-item>
		    	</template>
		    </el-table-column>
		    
		    <el-table-column type="expand" label="详细" width="100px">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" label="选项">
		          <el-form-item label="类型">
		            <span><el-tag :type="props.row.type==1 ? 'success' : ''">{{(props.row.type==1 ? 'DICS' : '单选题')}}</el-tag></span>
		          </el-form-item>
		          <el-form-item label="答案">
		            <span> <el-tag type="danger" >{{props.row.answer}}</el-tag> </span>
		          </el-form-item>
		          <el-form-item label="题目" v-if="props.row.type==2">
		            <span>{{ props.row.title }}</span>
		          </el-form-item>
		          <br />
		          <el-form-item :label="item.option" v-for=" (item,index) in JSON.parse(props.row.options) ":key="item.id">
		            <span><el-tag type="danger" v-if="props.row.type==1">{{props.row.answer[index]}}</el-tag>-{{ item.text }}</span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>

		    <el-table-column label="答案" width="150px" show-overflow-tooltip>
		    	 <template slot-scope="props">
		    	 	<el-tag type="danger" >{{props.row.answer}}</el-tag>
		    	</template>
		    </el-table-column>
		    
		    <el-table-column label="操作" >
		      <template slot-scope="scope">  
		    	<el-button v-if="false" @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>   
		    	<el-button type="text" size="small" @click="isDelete(scope.row.id)">删除</el-button>
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
        	type:'',
        	title:'',
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
		selectionList:[],
		
		tipsShow:false,
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
	  	let url=this.this.$C.solo+"/admin/getChoicePage";
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
	  isDelete(id){
	 	this.$confirm('此操作将删除该此项, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          this.deleteQuestion(id);
	        }).catch(() => {
	          this.$message({ type: 'info', message: '已取消删除' });          
	        });
	  },
	  deleteQuestion(id){
	  	let url=this.this.$C.solo+"/admin/deleteChoice";
	  	let data={id:id}
	  	this.$T.post(url,data,"",this.deleteSuccess);
	  },
	  deleteSuccess(res){
	 	console.log(res);
	  	if(res.code=="200"){
	  		this.$message({type: 'success',message: '删除成功!'});
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
