<template>
	<div>
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item label="">
			  	 <el-button @click="openAdd()">+</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" size="small" @click="getPage">查询</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="info" size="small" @click="reset">重置</el-button>
			  </el-form-item>
			  <el-form-item>
				  <el-select v-model="order.addressId" placeholder="地址" style="width: 150px">
				    <el-option v-for="item in $G.Resource.addressList" :key="item.id" :label="item.name"  :value="item.id">
				  	</el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" size="small" @click="newOrders">批量结算</el-button>
			    <el-button type="primary" size="small" @click="buyGoods">直接购买</el-button>
			    
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
		    <el-table-column label="商品名称" prop="GOODS_NAME" width="100" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="价格" prop="PRICE"  width="120" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="规格名称" prop="SKU_NAME"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="数量"  prop="COUNT"    show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">
		      	<el-button  @click="deleteGoodsInCart(scope.row)" type="text" size="small">删除</el-button>
		      	<!--<el-button  @click="newOrder(scope.row)" type="text" size="small">下单</el-button>-->   
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
		<el-dialog :title="dialog.title" :visible.sync="dialog.showDialog" width="40%" >
			<div>
			<el-form ref="form" :model="item"  label-width="100px":inline="true"  :disabled="dialog.readonly">
				<el-form-item label="商店id"  prop="goodsName">
					<el-input v-model="item.shopId"  style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="skuId"  >
					<el-input v-model="item.skuId" type="number" style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="spuId"  >
					<el-input v-model="item.spuId" style="width: 220px" ></el-input>
				</el-form-item>
				<el-form-item label="数量"  >
					<el-input v-model="item.count"  style="width: 220px" ></el-input>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialog.showDialog=false">取 消</el-button>
		    <el-button type="primary" @click="save()" :disabled="dialog.readonly">确 定</el-button>
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
	    selectionList:[],
	    item:{
	    	code:'',
			count:'',
			shopId:'',
			skuId:'',
			spuId:'',
	    },
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
	    //请求地址
    	url:{
    		getAll:this.$C.xproject+'/user/getUserCart',
    		save:this.$C.xproject+'/user/addGoodsInCart',
    		newOrder:this.$C.xproject+'/order/newOrderByCart',
    		deleteCartGoods:this.$C.xproject+'/user/deleteGoodsInCart',
    		newOrderByGoods:this.$C.xproject+'/order/newOrderByGoods',
    	},
        page:{
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
         total:0,
		
		order:{
			addressId:'',
			cartGoodsId:[],
			info:'用户备注信息',
		}
    }
  },
	components: {
	},
	methods: {
	  getToken(){
		return this.$G.getCookie("token");
	  },
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
	  	let token =this.$G.getCookie("token");
	  	//this.$T.post(this.url.getUserAddress,this.page,"",this.success);
	  	this.$T.request(this.url.getAll,"",token,this.success);
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
	  //打开添加模态框
	  openAdd(){
	  	this.dialog.readonly=false;
	  	this.dialog.showDialog=true;
	  	this.$G.emptyFrame(this.item);
	  },
	  save(){
	  		let token =this.$G.getCookie("token");
	  		this.$T.request(this.url.save,this.item,token,this.saveSuccess);
	  },
	  saveSuccess(res){
	  	if(res.code=='200'){
	  		this.dialog.showDialog=false;
	  		this.$message('提交成功');
	  		this.getPage();
	  	}
	  },
	  //编辑事件
	  handleClick(row) {
	    console.log(row);
	  	this.dialog.showDialog=true;
	  	this.dialog.readonly=false;
	  	//填充对象
	  	this.item.code=row.ID;
		this.item.count=row.COUNT;
		this.item.skuId=row.SKU_ID;
		this.item.spuId=row.SPU_ID;
	  },
	   //打开展示模态框
	  openShow(row){
	  	console.log(row);
	  	this.dialog.showDialog=true;
	  	this.dialog.readonly=true;
	  	//填充对象
	  	this.item.code=row.ID;
		this.item.count=row.COUNT;
		this.item.skuId=row.SKU_ID;
		this.item.spuId=row.SPU_ID;
	  },
	  //跳转到详细页面
	  goShow(row){
	  	console.log(row);
	  },
	  newOrders(){
	  	if(this.order.addressId==""){
	  		this.$message('地址未选择');
	  		return;
	  	}
	  	if(this.selectionList.length<=0){
	  		this.$message('商品未选择');
	  		return;
	  	}
		for(let i=0;i<this.selectionList.length;i++){
			this.order.cartGoodsId.push(this.selectionList[i].ID);
		}
	  	
	  	this.$T.request(this.url.newOrder,this.order,token,this.newOrderSuccess);
	  	
	  },
	  newOrderSuccess(res){
	  	if(res.code=='200'){
	  		this.$message('提交成功');
	  		this.getPage();
	  	}
	  },
	  deleteGoodsInCart(item){
	  	let token =this.$G.getCookie("token");
	  	this.$T.request(this.url.deleteCartGoods,{ids:[item.ID]},token,this.newOrderSuccess);
	  	
	  },
	  buyGoods(){
		  	if(this.order.addressId==""){
		  		this.$message('地址未选择');
		  		return;
		  	}
			let token =this.$G.getCookie("token");
			let param={
				skuId:this.selectionList[0].SKU_ID,
				addressId:this.order.addressId,
				count:"1",
			}
			console.log(param);
	  		this.$T.request(this.url.newOrderByGoods,param,token,this.saveSuccess);
	  },
	  
	},
	mounted() {
		this.getPage();
	},
}
</script>

<style>
</style>
