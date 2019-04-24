<template>
	<div style="overflow-y: scroll;height: 800px;padding: 20px 0px;">
	  <el-tabs v-model="tabs" >
	    <el-tab-pane label="基本信息" name="first">
	    	<div style="text-align: center;">
				<div class="v-title1" >商品信息</div>
				<el-form ref="spuForm" :rules="rules"  :model="spu" label-width="85px"  :inline="true" :disabled="isEdit">
					<el-form-item label="商品名称"  prop="goodsName">
						<el-input v-model="spu.goodsName"  style="width: 220px" ></el-input>
					</el-form-item>
					<el-form-item label="价格"  >
						<el-input v-model="spu.lowPrice" type="number" style="width: 220px" ></el-input>
					</el-form-item>
					<br />
					<el-form-item label="分类"  prop="categoryId">
						  <el-select v-model="spu.categoryId" placeholder="请选择" style="width: 220px">
						    <el-option v-for="category in categoryList" :key="category.id" :label="category.categoryName"  :value="category.id+''">
						  	</el-option>
						  </el-select>
					</el-form-item>
					<el-form-item label="品牌"  prop="brandId">
						  <el-select v-model="spu.brandId" placeholder="请选择" style="width: 220px">
						    <el-option v-for="barnd in brandList" :key="barnd.id" :label="barnd.brandName"  :value="barnd.id+''">
						  	</el-option>
						  </el-select>
					</el-form-item>
				</el-form>
				<div style="text-align: center;padding:30px;" >
					<el-button @click="saveGoodSup"  style="width: 300px;" type="primary" size="medium">提交</el-button>
				</div>

	    	</div>
	    </el-tab-pane>
	    <el-tab-pane label="参数信息" name="second">
	    	<div></div>
	    	参数信息
	    </el-tab-pane>
	    
	    <!--规格信息-->
	    <el-tab-pane label="规格信息" name="third">
				<Spec></Spec>
	    </el-tab-pane>
	    
	    
	    <el-tab-pane label="价格信息" name="fourth">
	    </el-tab-pane>
	  </el-tabs>
		

	
	
	
	<div style="width: 100%;position: absolute;padding: 50px;"></div>
	</div>
</template>

<script>
 import Spec from "./spec";
	
export default {
  name: 'admin',
  data () {
    return {
    	
    	code:'1dc9b98d130e47fe84ef563c6253babd',
    	//表单
        spu: {
	    	id:'',//主键
	    	spuNo:'',//商品编号
	    	goodsName:'',//商品名称
	    	lowPrice:'',//最低价格
	    	categoryId:'',//分类名称
	    	brandId:'',//品牌ID
	    	gmtCreate:'',//创建时间
	    	gmtUpdate:'',//更新时间
	    	revision:'',
        },
      
    	//验证
    	rules: {
    		goodsName:[ { required: true, message: '请输入名称', trigger: 'blur' }],
			categoryId:[ { required: true, message: '请选择分类', trigger: 'blur' }],
			brandId:[ { required: true, message: '请选择品牌', trigger: 'blur' }],
    	},
    	url:{//请求地址统一管理
    		getBrand:this.$C.xproject+'/mall/getAllBrand',						//获取可用的品牌
    		getCategory:this.$C.xproject+'/mall/getAllCategory',				//获取可用的类型
    		getGoodsInfo:this.$C.xproject+'/mall/getGoodsInfo',					//获取商品信息
    		saveGoodsSpec:this.$C.xproject+'/mall/saveGoodsSpec',				//添加商品规格
    		saveSpecValue:this.$C.xproject+'/mall/getGoodsInfo',				//添加商品规格值
    	},
    	isEdit:false,//是否修改
		tabs:'first',//目前选项卡
		
		//规格信息栏
		specList:[],
		spec:"",
		
		//下拉框
		brandList:"",
		categoryList:"",
    }
  },
	components: {
		Spec,
	},
	methods: {
	  //
	  getTagType(index){
	  	switch(index){
	  		case 0:
	  			return ""; break;
	  		case 1:
	  			return "success"; break;
	  		case 2:
	  			return "info"; break;
	  		case 3:
	  			return "warning"; break;
	  		case 4:
	  			return "danger"; break;
	  		default:
				return ""; break;
	  	}
	  },
	  //获取下拉框
	  getBrand(){
	  		this.$T.post(this.url.getBrand,"","",this.getBrandSuccess);
	  },
	  getBrandSuccess(res){
		  	if(res.code=='200'){
		  		this.brandList=res.data;
		  	}
	  },
	  getCategory(){
	  	this.$T.post(this.url.getCategory,"","",this.getCategorySuccess);
	  },
	  getCategorySuccess(res){
		  	if(res.code=='200'){
		  		this.categoryList=res.data;
		  	}
	  },
	  //获取商品信息
	  getGoodsInfo(){
	  	let param={code:this.code}
	  	this.$T.post(this.url.getGoodsInfo,param,"",this.getInfoSuccess);
	  },
	  getInfoSuccess(res){
		  	if(res.code=='200'){
		  		this.spu=res.data.spu;
		  		this.specList=res.data.spec;
//		  		this.spu.categoryId=parseInt(res.data.spu.categoryId);
//		  		this.spu.brandId=parseInt(res.data.spu.brandId);
		  	}
	  },
	  success(res){
	  	console.log(res)
	  },
	  //添加规格信息
	  saveGoodsSpec(){
	  	this.$T.post(this.url.saveGoodsSpec,this.code,"",this.success);
	  },
	  //tag 删除
	  tagClose(index){
	  	console.log(index);
	  	this.tags.splice(index);
	  },
	  //跟新sup
	  saveGoodSup(){
	  	console.log(this.spu);
		this.$refs["spuForm"].validate((e) => {
          if (e) {
          	//this.$T.post(this.url.save,this.item,"",this.saveSuccess);
          } else {
            return false;
          }
        });
	  },
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		this.$message('提交成功');
	  	}
	  },
	  
	},
	mounted() {
		this.getBrand();
		this.getCategory();
		this.getGoodsInfo();
		
	},
}
</script>

<style scoped>
.x-spec{
	margin: 5px; font-size: 10px;
}
.x-title{
	text-align: center;width: 100%;font-size: 20px;color: lightseagreen;font-weight: 550;
}
.v-title1{
	text-align: center;padding: 20px 30px;color: lightskyblue;font-size: 22px;
}
.v-title2{
	text-align: left;padding: 10px 20px;color: lightskyblue;font-size: 18px;
}
</style>
