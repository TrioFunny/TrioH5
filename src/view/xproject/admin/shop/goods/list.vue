<template>
	<div>
		<div class="v-title1">商品管理</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item label="">
			  	 <el-button @click="openAdd()">+</el-button>
			  </el-form-item>
			  <el-form-item  >
				  <el-select v-model="page.categoryId" placeholder="分类" style="width: 150px">
				    <el-option v-for="category in categoryList" :key="category.id" :label="category.categoryName"  :value="category.id">
				  	</el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item   >
				  <el-select v-model="page.brandId" placeholder="品牌" style="width: 150px">
				    <el-option v-for="barnd in brandList" :key="barnd.id" :label="barnd.brandName"  :value="barnd.id">
				  	</el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.goodsName" placeholder="商品名称"></el-input>
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
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" @row-dblclick="openShow">
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" :index="indexMethod">
		    </el-table-column>
		    <el-table-column label="商品名称" prop="goodsName"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="品牌"  show-overflow-tooltip>
		      <template slot-scope="props">  
		      	{{getValueByKey(props.row.brandId,brandList).brandName }}
		      </template>
		    </el-table-column>
		    <el-table-column label="类型" show-overflow-tooltip>
		      <template slot-scope="props">  
		      	{{ getValueByKey(props.row.categoryId,categoryList).categoryName }}
		      </template>
		    </el-table-column>
		    <el-table-column label="价格" prop="lowPrice"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="更新时间"  width="200" show-overflow-tooltip >
		      <template slot-scope="props">  
		      	{{ $G.formatDate(props.row.updatedTime)}}
		      </template>
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">  
		      	<el-button  @click="openShow(scope.row)" type="text" size="small">查看</el-button> 
		    	<el-button  @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>   
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
		<el-dialog :title="dialog.title" :visible.sync="dialog.showDialog" width="50%" >
			<div>
			<el-form ref="form" :model="item"  label-width="100px":inline="true"  :rules="rules" :disabled="dialog.readonly">
				<el-form-item label="商品名称"  prop="goodsName">
					<el-input v-model="item.goodsName"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="价格"  >
					<el-input v-model="item.lowPrice" type="number" style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="分类"  prop="categoryId">
					  <el-select v-model="item.categoryId" placeholder="请选择" style="width: 220px">
					    <el-option v-for="category in categoryList" :key="category.id" :label="category.categoryName"  :value="category.id">
					  	</el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="品牌"  prop="brandId">
					  <el-select v-model="item.brandId" placeholder="请选择" style="width: 220px">
					    <el-option v-for="barnd in brandList" :key="barnd.id" :label="barnd.brandName"  :value="barnd.id">
					  	</el-option>
					  </el-select>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialog.showDialog=false">取 消</el-button>
		    <el-button type="primary" @click="save()">确 定</el-button>
		  </span>
		</el-dialog>
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
	    list: [],//
	    selectionList:[],//选中的项
	    
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
	    item:{
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
    		goodsName:[ { required: true, message: '请输入答案', trigger: 'blur' }],
    		categoryId:[{ required: true,  message: '请输入答案', trigger: 'blur' }], 
    		brandId:[ { required: true, message: '请输入答案', trigger: 'blur' }],
    	},
    	url:{//请求地址统一管理
    		getPage:this.$C.xproject+'/mall/getGoodsPage',
    		save:this.$C.xproject+'/mall/saveGoods',
    		getBrand:this.$C.xproject+'/mall/getAllBrand',
    		getCategory:this.$C.xproject+'/mall/getAllCategory',
    	},
        page:{//请求分页的数据
        	goodsName:'',
        	brandId:'',
        	categoryId:'',
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
        total:0,//总数
		
		//下拉框
		brandList:"",
		categoryList:"",
    }
  },
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
	  reset(){//重置信息
	  	let page={
	  		categoryName:'',
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
          	this.$T.post(this.url.save,this.item,"",this.saveSuccess);
          } else {
            return false;
          }
        });
	  	
	  },
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		this.dialog.showDialog=false;
	  		this.$message('提交成功');
	  		this.getPage();
	  	}
	  },
	  openAdd(){
	  	this.dialog.readonly=false;
	  	this.dialog.showDialog=true;
	  	this.$G.emptyFrame(this.item);
	  },
	  openShow(row){
	  	this.dialog.showDialog=true;
	  	this.dialog.readonly=true;
	  	this.item=this.$G.clone(row);
	  	this.item.categoryId=row.categoryId+"";
	    this.item.brandId=row.brandId+"";
	  },
	  handleClick(row) {//对应事件
	  	this.dialog.showDialog=true;
	  	this.dialog.readonly=false;
	  	this.item=this.$G.clone(row);
	  	this.item.categoryId=row.categoryId+"";
	    this.item.brandId=row.brandId+"";
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
	  //获取数组中的字段
	  getValueByKey(id,list){
	  	for(let i=0;i<list.length;i++){
	  		if(id==list[i].id){
	  			return list[i];
	  		}
	  	}
	  },
	},
	mounted() {
		this.getPage();
		this.getBrand();
		this.getCategory();
	},
}
</script>

<style>
</style>
