<template>
	<div>
		<div class="v-title1" style="padding:0px 0 10px ;">订单管理</div>
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item >
			    <el-input v-model="page.code" placeholder="商品名称"></el-input>
			  </el-form-item>
			  <el-form-item   >
				  <el-select v-model="page.sign" placeholder="Sign" style="width: 150px">
				    <el-option label="未付款"  value="unpaid"></el-option>
				    <el-option label="未发货"  value="unsent"></el-option>
				    <el-option label="配送中"  value="delivering"></el-option>
				    <el-option label="待评价"  value="comment"></el-option>
				    <el-option label="已完成"  value="complete"></el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item   >
				  <el-select v-model="page.state" placeholder="state" style="width: 150px">
				    <el-option label="未付款"  value="0"></el-option>
				    <el-option label="待接收"  value="1"></el-option>
				    <el-option label="待分配"  value="2"></el-option>
				    <el-option label="待确认"  value="3"></el-option>
				    <el-option label="待送达"  value="4"></el-option>
				   	<el-option label="待评价"  value="5"></el-option>
				   	<el-option label="已完成"  value="6"></el-option>
				  </el-select>
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
		    <el-table-column label="单号" prop="id"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="用户编码" prop="userCode"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="商店" prop="shopId" width="80"  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="状态" prop="state"  width="100"show-overflow-tooltip >
		    	<template slot-scope="props">
		    		<div> {{ state(props.row.state)}}</div>
		    	</template>
		    </el-table-column>
		    <el-table-column label="价格" prop="price" width="100" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="收件人"     width="100"  show-overflow-tooltip >
		    	<template slot-scope="props">
		    		<div> {{obj(props.row.addressInfo).name}}</div>
		    	</template>
		    </el-table-column>
		    <el-table-column label="电话"    width="120" show-overflow-tooltip >
		    	<template slot-scope="props">
		    		<div> {{obj(props.row.addressInfo).phone}}</div>
		    	</template>
		    </el-table-column>

		   <!-- <el-table-column label="操作" width="100" >
		      <template slot-scope="scope">
		      	<el-button v-if="scope.row.state=='0'"  @click="payment(scope.row)" type="text" size="small">支付</el-button> 
		      	<el-button v-if="scope.row.state=='1'"  @click="accept(scope.row)" type="text" size="small">接收</el-button> 
		      	<el-button v-if="scope.row.state=='2'" @click="allocation(scope.row)" type="text" size="small">分配</el-button> 
		      	<el-button v-if="scope.row.state=='3'" @click="shopAccept(scope.row)" type="text" size="small">店面确认</el-button> 
		      	<el-button v-if="scope.row.state=='4'" @click="receipt(scope.row)" type="text" size="small">确认送达</el-button> 
		      	<el-button v-if="scope.row.state=='5'" @click="evaluation(scope.row)" type="text" size="small">评价</el-button> 
		    	<el-button v-if="false" @click="handleClick(scope.row)" type="text" size="small"></el-button>   
		      </template>
		    </el-table-column>-->
		  </el-table>
		</div>
	  
		<div style="padding: 20px;">
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
		    	:current-page="page.page"  :page-size="page.pageSize" 	:total="total"
		      layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]"
		      	>
		    </el-pagination>
		</div>
		
		
	<div>
		<el-dialog title="订单详细" :visible.sync="dialog.showDialog" width="60%" >
			<div style="overflow-y: scroll;height: 600px; ">
				<el-form ref="form"   abel-width="100px" :disabled="dialog.readonly">
					<!--地址-->
					<el-form-item label="地址信息">
					  	<el-alert  type="warning" style="margin-top:10px ;" :closable="false" >
					   		<template slot="title">
				          		<div >
				          			收件人：{{orderInfo.addressInfo.name}}
				          			<span style="margin-left:50px ;">电话：{{orderInfo.addressInfo.phone}} </span>
				          		</div>
				          		<div >地址：{{orderInfo.addressInfo.address}}-{{orderInfo.addressInfo.detailedAddress}}</div>
					    	</template>
						</el-alert>
		          	</el-form-item>
		      
		      		<!--商品-->
		          	<el-form-item label="商品信息">
					  	<el-alert  type="success" style="margin-top:10px ;" :closable="false" 
					   	 v-for="goods  in orderInfo.goodsInfo" :key="goods.id">
					    	<template slot="title">
		            			<div style="font-weight: 700;font-size: 13px;line-height: 18px;">{{goods.goods_name}}
		            				<span style="margin-left:80px;color: #f56c6c">单价：￥{{goods.price}}</span>
		            				<span style="margin-left:80px ;color: #e6a23c">数量：{{goods.count}}</span> 
		            			</div>
		            			<div>
		            				<span >规格值名称:{{goods.sku_name}}</span>
		            				<span style="margin-left:50px ;">规格：
		            					<el-tag  v-for="tag in goods.spec_value.split(',')" 
		            						style="margin-left:5px ;" :key="tag">
		            						{{tag}}
		            					</el-tag>  
		            				</span>
		            			</div> 
					    	</template>
					 	 </el-alert>
		          	</el-form-item>
		          	
		          	<!--流程-->
		          	<el-form-item label="流程详细" > 
						<div style="margin-left:15%;">
						  <el-steps direction="vertical" :active="nodeInfoList.length" style="height: 800px;">
						    <el-step :title="node.nodeName" v-for="node in nodeInfoList" :key="node.id">
						    	<template slot="description">
						    		<div>操作人：{{node.userCode}}</div>
						    		<div>操作内容：{{node.info}}</div>
						    		<div>操作时间：{{node.cerateTime}}</div>
						    	</template>
						    </el-step>
						  </el-steps>
						</div>
		          	</el-form-item>
		        </el-form>	
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialog.showDialog=false">取 消</el-button>
		    <el-button type="primary" :disabled="dialog.readonly">确 定</el-button>
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
	    	id:'',
	    	userCode:'',//用户编号
			paymentId:'',
			shopId:'',
			state:'',
			goodsInfo:'',
			addressInfo:'',
			price:'',
			createTime:'',
			updateTime:'',
	    },
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
	    },
    	url:{
    		getPage:this.$C.xproject+'/order/getAllOrderPage',
    		orderGoNext:this.$C.xproject+'/order/orderGoNext',
    		getOrderNodeInfo:this.$C.xproject+'/order/getOrderNodeInfoA',
    	},
        page:{
        	code:'',
        	sign:'',
        	state:'',
        	shopId:'',
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
         total:0,
		
		
		orderInfo:{
			addressInfo:'',
			goodsInfo:'',
		},
		nodeInfoList:[],
		
    }
  },
	components: {
	},
	methods: {
	  state(state){
			switch (state){
				case '0':return "未支付";
				case '1':return "未接受";
				case '2':return "未分配";
				case '3':return "未确认";
				case '4':return "未送达";
				case '5':return "未评论";
				case '6':return "已完成";
				
			}
		},
	  obj(josn){
	  	return JSON.parse(josn);
	  },
	  getToken(){
		return this.$G.getCookie("token");
	  },
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
	  	this.$T.request(this.url.getPage,this.page,"",this.success);
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data.data;
	  		this.total=res.data.total;
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
	  //跳转到详细页面
	  goShow(row){
	  	console.log(row);
	  	this.dialog.showDialog=true;
	  	this.orderInfo.addressInfo=JSON.parse(row.addressInfo)
	  	this.orderInfo.goodsInfo=JSON.parse(row.goodsInfo)
	  	let param={
	  		orderId:row.id,
	  	}
	  	this.$T.request(this.url.getOrderNodeInfo,param,"",this.getOrderInfoSuccess);
	  },
	  getOrderInfoSuccess(res){
	  	if(res.code=='200'){
	  		this.$message('操作成功');
	  		this.nodeInfoList=res.data;
	  	}
	  },
	  orderGoNext(orderId,info,shopId){
	  		let token =this.$G.getCookie("token");
	  		let param={
	  			orderId:orderId,
	  			shopId:shopId,
	  			info:info,
	  		}
	  		this.$T.request(this.url.orderGoNext,param,token,this.gSuccess);
	  },
	  gSuccess(res){
	  	if(res.code=='200'){
	  		this.$message('操作成功');
	  		this.getPage();
	  	}
	  },
	  //支付
	  payment(row){
	  	console.log(row);
	  	this.orderGoNext(row.id,"用户支付订单","");
	  },
	  //接受
	  accept(row){
	  	console.log(row);
	  	this.orderGoNext(row.id,"管理员接收订单","");
	  },
	  //分配
	  allocation(row){
	  	console.log(row);
	  	this.orderGoNext(row.id,"管理员分配订单：给商店：123","123");
	  },
	  //商店确认
	  shopAccept(row){
	  	console.log(row);
	  	this.orderGoNext(row.id,"商店确认订单","");
	  },
	  //确认送达
	  receipt(row){
	  	console.log(row);
	  	this.orderGoNext(row.id,"用户确认送达","");
	  },
	  //评价
	  evaluation(row){
	  	console.log(row);
	  	this.orderGoNext(row.id,"用户评论订单","");
	  },
	},
	mounted() {
		this.getPage();
	},
}
</script>

<style>
</style>
