<template>
	<div>
		<div class="v-title1">显示管理</div>	
		
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  </el-form-item>
			  <el-form-item label="">
			  	 <el-button @click="add()">+</el-button>
			  </el-form-item>
			  <el-form-item label="">
			  	 <el-button @click="$G.goToByName(This,'SMain')">查看主界面</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!--表格-->
		<div style="padding: 0px 20px;" >
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" >
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" :index="indexMethod">
		    </el-table-column>
		    <el-table-column label="类型" prop="type" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="描述" prop="tag" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="排序" prop="sort" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="试卷ID"  width="150px" show-overflow-tooltip >
		      <template slot-scope="props" >  
		      	{{getPaperName(props.row.showId)}}
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" >
		      <template slot-scope="scope" v-if="scope.row.type=='paper'">  
		    	<el-button  @click="update(scope.row)"  type="text" size="small" >修改</el-button>   
		    	<el-button type="text" size="small" @click="deletePaper(scope.row.id)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
		
	<!--添加显示-->
	<div>
		<el-dialog title="添加界面" :visible.sync="showDialog" width="68%" >
			<div>
			<el-form :model="showItem"  label-width="100px":inline="true">
				<el-form-item label="类型"  >
				    <el-select v-model="showItem.type" placeholder="选择类型">
				      <el-option label="paper" value="paper"></el-option>
				      <!--<el-option label="form" value="form"></el-option>-->
				    </el-select>
				</el-form-item>
				<el-form-item label="对应试卷"  >
				    <el-select v-model="showItem.showId" placeholder="选择对应试卷" @change="selectPaper">
				      <el-option :label="item.title" :value="item.id" v-for="(item,index) in pageList" :key="item.id"></el-option>
				    </el-select>
				</el-form-item>
				<br />
				<el-form-item label="排序"  >
					<el-input-number v-model="showItem.sort" :min="1" :max="10" ></el-input-number>
				</el-form-item>
				<el-form-item label="说明"  >
				  <el-input v-model="showItem.tag"  style="width: 220px" ></el-input> <!--disabled-->
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showDialog=false">取 消</el-button>
		    <el-button type="primary" @click="addShowItem()">确 定</el-button>
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
	    total:0,
		selectionList:[],
        page:{
        	text:'',
        	title:'',
        	page:1,
        	pageSize:50,
        	sortWord:'',
        	isAsc:1,
        },
        showItem:{id:"",type:'paper',showId:"",sort:"",tag:""},
        showDialog:false,
        pageList:[],
    }
  },
	methods: {
	  getPaper(){//获取信息（刷新）
	  	let url=this.this.$C.solo+"/admin/getPaperPage";
	  	let data=this.page;
	  	this.$T.post(url,data,"",this.getPaperSuccess);
	  },
	  getPaperSuccess(res){ //成功回调
	  	if(res.code=="200"){
	  		this.pageList=res.data.data;
	  	}
	  	console.log(this.pageList);
	  },
		
      indexMethod(index) {//自动生成index
        return index +1;
      },
	  getPage(){//获取信息（刷新）
	  	let url=this.this.$C.solo+"/admin/getMain";
	  	let data=this.page;
	  	this.$T.post(url,data,"",this.success);
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data;
	  	}
	  },
	 addShowItem(){
	  	let url=this.this.$C.solo+"/admin/saveShow";
	  	let data=this.showItem;
	  	console.log(data);
	  	this.$T.post(url,data,"",this.addSuccess);
	 },
	 addSuccess(res){
	 	this.showDialog=false;
	  	if(res.code=="200"){
	  		this.$message('操作成功');
	  		this.getPage();
	  	}
	 },
	 add(){
	 	this.showDialog=true;
	 	this.showItem={id:"",type:'paper',showId:"",sort:this.list.length+1,tag:""};
	 },
	 update(item){
	 	this.showDialog=true;
	 	this.showItem=item;
	 	this.showItem.showId=parseInt(item.showId);
	 },
	 getPaperName(id){
	 	for(let i=0;i<this.pageList.length;i++){
	 		if(this.pageList[i].id==id){
	 			return this.pageList[i].title;
	 		}
	 	}
	 	
	 },
	 selectPaper(value){
	 	this.getPaperName(value);
	 },
	  selection(val){//选择
		 this.selectionList = val;
	  },
	  clear(){//清空
		 this.$refs.multipleTable.clearSelection();
	  },
	  deletePaper(id){
	  	let url=this.this.$C.solo+"/admin/deleteShow";
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
		this.getPaper();
	},
}
</script>

<style>
</style>
