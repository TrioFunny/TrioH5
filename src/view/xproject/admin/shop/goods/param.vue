<template>
	<div>
		<div class="v-title1" style="padding:0px 0 10px ;">参数管理</div>	
		<!--搜索功能-->
		<el-card shadow="always" >
			  <el-row >
			    <div style="float: right;padding-right:10px;">
				    <i class="el-icon-arrow-up" v-if="cardShow" @click="cardShow=false"></i>
				    <i class="el-icon-arrow-down" v-if="!cardShow"   @click="cardShow=true"></i>
			    </div>
			  </el-row>
				<!--操作-->
				<el-row v-if="cardShow" >
					<el-form ref="form" :model="item"  :rules="rules":inline="true" class="demo-form-inline" >
					  <el-form-item  prop="typeId">
						  <el-select v-model="item.typeId" placeholder="分类" style="width: 150px">
						    <el-option v-for="type in paramType" :key="type.id" :label="type.name"  :value="type.id">
						  	</el-option>
						  </el-select>
					  </el-form-item>
					  <el-form-item label="" prop="name">
					    <el-input v-model="item.name" placeholder="属性"></el-input>
					  </el-form-item>
					  <el-form-item label=""  prop="value">
					    <el-input v-model="item.value" placeholder="值"></el-input>
					  </el-form-item>
					  <el-form-item label="">
					     <el-button type="primary" size="small" @click="save">添加</el-button>
					  </el-form-item>
					</el-form>
				</el-row>
			
		</el-card>
		<br />
		<!--表格-->
		<el-card style="padding: 0px 20px;" >
			  <el-alert v-for="type in params" :title="type.type_name"   type="success" :closable="false"  :key="type.id">
					<el-tag v-for="param in type.list"  @close="deleteParam(param)"  class="xspace" closable  :key="param.id">
						<span>{{param.name}}</span>
						<span style="margin-left: 20px;">{{param.value}}</span>
					</el-tag>
			  </el-alert>
			  <br />
		</el-card>


  </div>
</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
    	This:this,
    	cardShow:true,
	    list: [],//
	    
	    item:{
	    	id:'',
	    	typeId:'',
	    	name:'',
	    	value:'',
	    	goodsCode:'',
	    },
    	//验证
    	rules: {
    		name:[ { required: true, message: '请输入参数名称', trigger: 'blur' }],
    		value:[ { required: true, message: '请输入参数值', trigger: 'blur' }],
    	},
    	url:{//请求地址统一管理
    		getPage:this.$C.xproject+'/mall/getGoodsPage',
    		save:this.$C.xproject+'/mall/saveGoodsParam',
    		getParamType:this.$C.xproject+'/mall/getParamType',
    		deleteParam:this.$C.xproject+'/mall/deleteGoodsParam',
    	},
        page:{//请求分页的数据
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
        total:0,//总数
		
		paramType:[],
    }
  },
   props: ['params','spu'],
	components: {
	},
	methods: {
		
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
	  	//post(地址，参数，当前对象，成功方法，失败方法)
	  	this.$T.post(this.url.getPage,this.page,"",this.success);
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data.data;
	  		this.total=res.data.total;
	  	}
	  },
	  //保存
	  save(){
		this.$refs["form"].validate((e) => {
          if (e) {
          	this.item.goodsCode=this.spu.spuNo,
          	this.$T.post(this.url.save,this.item,"",this.saveSuccess);
          } else {
            return false;
          }
        });
	  	
	  },
	  
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		this.$message.success('提交成功');
	  		this.$emit('refresh');
	  	}
	  },
	  //获取下拉框
	  getParamType(){
	  		this.$T.post(this.url.getParamType,this.page,"",this.getParamTypeSuccess);
	  },
	  getParamTypeSuccess(res){
		  	if(res.code=='200'){
		  		this.paramType=res.data;
		  	}
	  },
	  //删除参数
	  deleteParam(item){
	  	this.$T.post(this.url.deleteParam,{id:item.id},"",this.saveSuccess);
	  },
	},
	mounted() {
		this.getPage();
		this.getParamType();
		console.log(this.params)
	},
}
</script>

<style scoped="">
	.xspace{
		margin:5px 10px ;
	}
</style>
