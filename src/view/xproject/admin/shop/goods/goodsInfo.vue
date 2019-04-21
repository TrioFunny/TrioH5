<template>
	<div style="overflow-y: scroll;height: 800px;padding: 20px 0px;">
	  <el-tabs v-model="tabs" >
	    <el-tab-pane label="基本信息" name="first">
	    	<div style="text-align: center;">
				<div class="v-title1" >商品信息</div>
				<el-form ref="form" :rules="rules"  :model="form" label-width="85px"  :inline="true" :disabled="isEdit">
					<el-form-item label="商品名称"  prop="goodsName">
						<el-input v-model="form.goodsName"  style="width: 220px" ></el-input>
					</el-form-item>
					<el-form-item label="价格"  >
						<el-input v-model="form.lowPrice" type="number" style="width: 220px" ></el-input>
					</el-form-item>
					<br />
					<el-form-item label="分类"  prop="categoryId">
						  <el-select v-model="form.categoryId" placeholder="请选择" style="width: 220px">
						    <el-option v-for="category in categoryList" :key="category.id" :label="category.categoryName"  :value="category.id">
						  	</el-option>
						  </el-select>
					</el-form-item>
					<el-form-item label="品牌"  prop="brandId">
						  <el-select v-model="form.brandId" placeholder="请选择" style="width: 220px">
						    <el-option v-for="barnd in brandList" :key="barnd.id" :label="barnd.brandName"  :value="barnd.id">
						  	</el-option>
						  </el-select>
					</el-form-item>
				</el-form>
				<div style="text-align: center;padding:30px;">
					<el-button  style="width: 300px;" type="primary" size="medium">提交</el-button>
				</div>

	    	</div>
	    </el-tab-pane>
	    <el-tab-pane label="参数信息" name="second">
	    	<div></div>
	    	参数信息
	    </el-tab-pane>
	    <el-tab-pane label="规格信息" name="third">
	    	<div style="padding: 20px 20%;">
				<el-collapse  >
				  <el-collapse-item title="颜色" name="1">
				  	<div>
						<el-tag
						  v-for="tag in tags"
						  :key="tag.name"
						  closable
						  :type="tag.type">
						  {{tag.name}}
						</el-tag>
				  	</div>
				  </el-collapse-item>
				  <el-collapse-item title="RAM" name="2">
				  </el-collapse-item>
				  <el-collapse-item title="ROM" name="3">
				  </el-collapse-item>
				  <el-collapse-item title="可控 Controllability" name="4">
				  </el-collapse-item>
				</el-collapse>
	    		
	    	</div>
	    	规格信息
	    </el-tab-pane>
	    <el-tab-pane label="价格信息" name="fourth">
	    	<div></div>
	    	价格信息
	    </el-tab-pane>
	  </el-tabs>
		

	
	
	
	<div style="width: 100%;position: absolute;padding: 50px;"></div>
	</div>
</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
    	//表单
        form: {
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
    		getBrand:this.$C.xproject+'/mall/getAllBrand',
    		getCategory:this.$C.xproject+'/mall/getAllCategory',
    	},
    	isEdit:false,//是否修改
		tabs:'first',//目前选项卡
		
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ],
		
		
		//下拉框
		brandList:"",
		categoryList:"",
    }
  },
	methods: {
	  //获取下拉框
	  getBrand(){
	  		this.$T.post(this.url.getBrand,"","",this.getBrandSuccess);
	  },
	  getBradnSuccess(res){
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
	},
	mounted() {
		this.getBrand();
		this.getCategory();
	},
}
</script>

<style scoped>
.v-title1{
	text-align: center;padding: 20px 30px;color: lightskyblue;font-size: 22px;
}
.v-title2{
	text-align: left;padding: 10px 20px;color: lightskyblue;font-size: 18px;
}
</style>
