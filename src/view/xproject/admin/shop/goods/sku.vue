<template>
		<div style="padding: 20px 10%;">
			<!--功能-->
			<div style="text-align: center;padding: 10px;">
			  <el-button type="primary" @click="openAddSku" :disabled="spu.state=='1'">添加价格</el-button>
			</div>
			<!--展示-->
			<div>
				  <el-table :data="skuList"  ref="multipleTable"   >
					<el-table-column type="selection" width="55">
				    </el-table-column>
				    <el-table-column :label="spec.info.SPEC_NAME" :key="index" v-for="(spec,index) in specList" show-overflow-tooltip >
				      <template slot-scope="props">  
				      	{{ getSpecValue(props.row.value[index])}}	
				      </template>
				    </el-table-column>
				    <el-table-column label="名称"  show-overflow-tooltip>
				      <template slot-scope="props">  
				      	{{props.row.info.skuName}}	
				      </template>
				    </el-table-column>
				    <el-table-column label="价格"  show-overflow-tooltip>
				      <template slot-scope="props">  
				      	{{props.row.info.price}}￥
				      </template>
				    </el-table-column>
				    <el-table-column label="操作"  >
				      <template slot-scope="scope">  
				      	<el-button v-if="spu.state=='-1'"  @click="deleteGoodsSku(scope.row)" type="text" size="small">删除</el-button>
				    	<!--<el-button v-if="spu.state=='-1'"   @click="" type="text" size="small">编辑</el-button>-->  
				    	<el-button  @click="" type="text" size="small">购买</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
			</div>
			<div style="width: 100%;position: absolute;padding: 50px;"></div>
			<!--弹出模态框栏-->
			<div>
				<el-dialog :title="skuDialog.title" :visible.sync="skuDialog.showDialog" width="48%" >
					<div>
					<el-form :model="sku"  label-width="100px":inline="true" :disabled="skuDialog.readonly">
						<el-form-item label="价格名称"  >
							<el-input v-model="sku.skuName"  style="width: 220px" ></el-input>
						</el-form-item>
						<div style="border: solid lightskyblue 2px;padding: 10px;margin-bottom: 5px;">
							<div>规格信息：</div>
						<el-form-item :label="spec.info.SPEC_NAME"  v-for=" (spec,index) in specList" :key="spec.info.SPEC_NO">
							 <el-select v-model="sku.specValueId[index]" placeholder="请选择" style="width: 220px">
							    <el-option v-for="value in spec.value"  :value="value.id+''"  :label="value.specValue+''" :key="value.id"> <!-- v-model="sku.specValueId" :key="val.id" :label="val.specValue+''"  :value="val.specId+''"-->
							    </el-option>
							  </el-select>
						</el-form-item>
						</div>
						<el-form-item label="价格"  >
							<!--<el-input v-model="sku.price"  style="width: 220px" ></el-input>-->
							<el-input-number v-model="sku.price" style="width: 220px"></el-input-number>
						</el-form-item>
						<el-form-item label="库存"  >
							<!--<el-input v-model="sku.stock"  style="width: 220px" ></el-input>-->
							<el-input-number v-model="sku.stock" style="width: 220px"></el-input-number>
						</el-form-item>
						<el-form-item label="商店id"  >
							<el-input v-model="sku.shopId"  style="width: 220px" ></el-input>
						</el-form-item>
					</el-form>
					</div>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="skuDialog.showDialog=false">取 消</el-button>
				    <el-button type="primary" @click="saveGoodsSku">确 定</el-button>
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
    	url:{//请求地址统一管理
    		saveGoodsSku:this.$C.xproject+'/mall/saveGoodsSku',
    		deleteGoodsSku:this.$C.xproject+'/mall/deleteGoodsSku',
    	},
		//规格信息栏
		//specList:[],
		//当前展开项
		activeNames:[],
		
		//spec 模态框对象
		skuDialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
		},
		sku:{
			id:'',
			skuNo:'',
			spuId:'',
			skuName:'',
			price:'',
			stock:'',
			shopId:'',
			specValueId:[],  
		},
		//用来储存select 选择的规格值
		specValueId:[],
    }
  },
    props: ['specList','spu','skuList'],
	methods: {
	getSelect(e,index){
		console.log(index);
	},
	getSpecValue(row){
		if(row==undefined||row==""){
			return "";
		}
		return row.SPEC_VALUE;
	},
	  //添加规格信息
	  saveGoodsSku(){
	  	console.log(this.sku);
	  	this.$T.request(this.url.saveGoodsSku,this.sku,this.token,this.success);
	  },
	  success(res){
	  	if(res.code=="200"){
	  		this.skuDialog.showDialog=false;
	  		this.$message.success('提交成功');
	  		this.$emit('refresh');
	  	}else{
	  		this.$message.error(res.error_msg);
	  	}
	  	
	  },
	  openAddSku(){
	  	this.skuDialog.showDialog=true;
	  	this.$G.emptyFrame(this.sku);
	  	this.sku.specValueId=[];
	  	this.sku.spuId=this.spu.id;
	  },
	  openUpdateSku(item){
	  	this.skuDialog.showDialog=true;
	  },
	  deleteGoodsSku(item){
	  	console.log(item)
	  	let param={
	  		skuId:item.info.id,
	  		spuId:this.spu.id,
	  	}
	  	this.$T.request(this.url.deleteGoodsSku,param,this.token,this.success);
	  },
	},
	mounted() {
		this.token=this.$G.getCookie("token");
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
