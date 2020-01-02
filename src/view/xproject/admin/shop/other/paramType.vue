<template>
	<div>
		<div class="v-title1" style="padding:0px 0 10px ;">商品参数类型管理</div>	
		<!--搜索功能-->
		<el-card shadow="always" >
			  <el-row >
			    <span>功能</span>
			    <div style="float: right;padding-right:10px;">
				    <i class="el-icon-arrow-up" v-if="cardShow" @click="cardShow=false"></i>
				    <i class="el-icon-arrow-down" v-if="!cardShow"   @click="cardShow=true"></i>
			    </div>
			  </el-row>
			  <div v-if="cardShow">
				<el-form ref="form" :model="item"  :rules="rules" :inline="true" class="demo-form-inline" style="padding: 0px 40px;">
				  <el-form-item prop="name">
					<el-input v-model="item.name" placeholder="类型名称"></el-input>
				  </el-form-item>
				  <el-form-item label="">
				     <el-button type="primary" size="small" @click="save">添加</el-button>
				     <el-button type="info" size="small" @click="reset">清空</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-card>
		<br />
		<!--表格-->
		<el-card style="padding: 0px 20px;" >
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" >
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" :index="indexMethod">
		    </el-table-column>
		    <el-table-column label="类型名" prop="name"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="标签" prop="sign"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">  
		      	<el-button  @click="openShow(scope.row)" type="text" size="small">查看</el-button> 
		    	<el-button  @click="alter(scope.row)" type="text" size="small">编辑</el-button>   
		      </template>
		    </el-table-column>
		  </el-table>
		</el-card>

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
    	cardShow:true,
	    list: [],//
	    selectionList:[],//选中的项
	    
	    item:{
	    	id:'',//主键
	    	name:'',
	    	sign:'',
	    },
    	//验证
    	rules: {
    		name:[{required: true, message: '请输入类型名称', trigger: 'blur' }],
    	},
    	url:{//请求地址统一管理
    		getAll:this.$C.xproject+'/mall/getParamType',
    		save:this.$C.xproject+'/mall/saveParamType',
    	},
        page:{//请求分页的数据
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
    }
  },
	components: {
	},
	methods: {
		
      indexMethod(index) {//自动生成index
        return index +1;
      },
	  getPage(){//获取信息（刷新）
	  	this.$T.fool(this.url.getAll,this.page,this.success);
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data;
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
	  //保存
	  save(){
		this.$refs["form"].validate((e) => {
          if (e) {
          	this.$T.fool(this.url.save,this.item,this.saveSuccess);
          } else {
            return false;
          }
        });
	  },
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		this.$message.success('提交成功');
	  		this.getPage();
	  	}
	  },
	  openShow(res){},
	  alter(res){},
	},
	mounted() {
		this.getPage();
	},
}
</script>

<style>
</style>
