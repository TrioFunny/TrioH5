<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div name="main" style="padding:20px 50px;">
			<!--第一栏-->
			<el-row >
				<el-col :span="16">
					<el-row >
						<el-card  header="订单销售" style="margin: 0px 5px;">
							  <el-button type="primary" plain >
							  	<i class="el-icon-date big" ></i>
							  	<span style="float: right;">
							  	<div class="gcount">{{today.orderCount}}</div>
							  	<div class="gname">今日订单量</div>
							  	</span>
							  </el-button>
							  
					 		 <el-button type="success" plain >
							  	<i class="el-icon-shopping-cart-2 big" ></i>
							  	<span style="float: right;">
							  	<div class="gcount">{{today.turnover}}</div>
							  	<div class="gname">今日销量</div>
							  	</span>
							  </el-button>
							
					 		 <el-button type="danger" plain >
							  	<i class="el-icon-pie-chart big" ></i>
							  	<span style="float: right;">
							  	<div class="gcount">{{yesterday.orderCount}}</div>
							  	<div class="gname">昨日订单量</div>
							  	</span>
							  </el-button>
							  
					 		 <el-button type="warning" plain >
							  	<i class="el-icon-coin big" ></i>
							  	<span style="float: right;">
							  	<div class="gcount">{{yesterday.turnover}}</div>
							  	<div class="gname">昨日销量</div>
							  	</span>
							  </el-button>
						</el-card>
					</el-row >
					
					<el-row v-if="false">
						<el-col :span="24">
							<el-card header="用户情况" style="margin: 0px 10px;">
							</el-card>
						</el-col>
					</el-row >
					<br />
					
					<el-row >
						<el-col >
							<el-card  style="margin: 0px 10px;">
								<div>销量趋势图</div>
								<!--<img src="@/assets/xproject/dataShow.png" width="100%"/>-->
								<chart></chart>
							</el-card>
						</el-col>
					</el-row>
				</el-col>
				
				<!--销量排行榜-->
				<el-col :span="8"  style="display:table-cell;">
					<el-card header="商品销量排行">
						<div  class="xRanking">
						    <el-card :body-style="{ padding: '10px'}" v-for="item in ranking" style="margin-bottom: 10px;" :key="item.id">
						    	<span style="float: left;width: 30%;max-width: 100px; ">	
						    		<img :src="item.img" width="100%">
						    	</span>
						    	<span style="float: left; padding: 10px;width: 60%;">
						    		<div>名称：{{item.name}}</div>
						    		<div>规格：{{item.spec}}</div>
						    		<div>销量：{{item.count}}</div>
						    	</span>
						    </el-card>
						</div>
					</el-card>
				</el-col>
				

			</el-row>
			<br />
			<!--第二栏-->

			<!--第三栏-->
			<el-row >
				<el-col :span="12">
					<el-card header="商品总览" style="margin: 0px 10px;text-align: center;">
					  <el-button type="primary" plain class="x-gcart">
					  	<div class="gcount">{{goodsInfo.total}}</div>
					  	<div class="gname">商品总量</div>
					  </el-button>
					  <el-button type="success" plain class="x-gcart">
					  	<div class="gcount">{{goodsInfo.up}}</div>
					  	<div>上架商品</div>
					  </el-button>
					  <el-button type="info" plain class="x-gcart">
					  	<div class="gcount">{{goodsInfo.down}}</div>
					  	<div>下架商品</div>
					  </el-button>
					  <el-button type="danger" plain class="x-gcart">
					  	<div class="gcount">{{goodsInfo.shortage}}</div>
					  	<div>库存紧张</div>
					  </el-button>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card header="用户总览" style="margin: 0px 10px;text-align: center;">
					  <el-button type="primary" plain class="x-gcart">
					  	<div class="gcount">{{userInfo.total}}</div>
					  	<div class="gname">用户总量</div>
					  </el-button>
					  <el-button type="success" plain class="x-gcart">
					  	<div class="gcount">{{userInfo.month}}</div>
					  	<div>本月新增</div>
					  </el-button>
					  <el-button type="info" plain class="x-gcart">
					  	<div class="gcount">{{userInfo.today}}</div>
					  	<div>今日新增</div>
					  </el-button>
					  <el-button type="warning" plain class="x-gcart">
					  	<div class="gcount">{{userInfo.yesterday}}</div>
					  	<div>昨日新增</div>
					  </el-button>
					</el-card>
				</el-col>
			</el-row>
		</div>
		
		
		
		
	</div>
</template>

<script>
	import chart  from './chart'
	
	export default {
		name: 'home',
		data() {
			return {
				This: this,
				url:{
					getGoodsRanking:this.$C.xproject+'/homePage/getGoodsRanking',
					getGoodsOverall:this.$C.xproject+'/homePage/getGoodsOverall',
					getUserOverall:this.$C.xproject+'/homePage/getUserOverall',
					getSummaryByDate:this.$C.xproject+'/homePage/getSummaryByDate',
					getTodaySummary:this.$C.xproject+'/homePage/getTodaySummary',
				},
				//商品排行榜
				ranking:[
				{name:'OPPO R17',spec:'8G+128G',count:'1000',img:require('@/assets/xproject/goods1.jpg')},
				{name:'OPPO Find X',spec:'8G+128G',count:'200',img:require('@/assets/xproject/goods2.jpg')},
				{name:'OPPO Find X',spec:'8G+128G',count:'200',img:require('@/assets/xproject/goods1.jpg')},
				{name:'OPPO Find X',spec:'8G+128G',count:'200',img:require('@/assets/xproject/goods2.jpg')},
				{name:'OPPO Find X',spec:'8G+128G',count:'200',img:require('@/assets/xproject/goods1.jpg')},
				],
				userInfo:{//用户数据
					total:'',
					yesterday:'',
					today:'',
					month:'',
				},
				goodsInfo:{//商品数据
					total:'',
					up:'',
					down:'',
					shortage:'',
				},
				summary:[],
				
				today:{
					orderCount:'200',
					turnover:'200',
				},
				yesterday:{
					orderCount:'100',
					turnover:'100',
				},
				
				
				chart:{
					startDate:'',
					endDate:'',
				}
			}
		},
		computed: {},
		components: {chart},
		methods: {
			getSummaryByDate(){
				var today = new Date();
				var Yesterday = today.setTime(today.getTime()-24*60*60*1000);
				this.chart.startDate=this.$G.formatYYMMDD(Yesterday);
				this.chart.endDate=this.$G.formatYYMMDD(today);
				this.$T.fool(this.url.getSummaryByDate,this.chart,this.success);
			},
		  	success(res){ //成功回调
		  		if(res.code=="200"){
		  			
		  			this.yesterday.orderCount=res.data[0].orderCount
		  			this.yesterday.turnover=res.data[0].turnover
		  		}
		  	},
			getGoodsRanking(){
				this.$T.fool(this.url.getGoodsRanking,this.chart,this.success);
			},
			
			getGoodsOverall(){
				this.$T.fool(this.url.getGoodsOverall,"",this.goodsSuccess);
			},
			goodsSuccess(res){
		  		if(res.code=="200"){
		  			this.goodsInfo=res.data;
		  		}
			},
			getUserOverall(){
				this.$T.fool(this.url.getUserOverall,"",this.userSuccess);
			},
			userSuccess(res){
		  		if(res.code=="200"){
		  			this.userInfo=res.data;
		  		}
			},
			getTodaySummary(){
				this.$T.fool(this.url.getTodaySummary,"",this.todaySuccess);
			},
			todaySuccess(res){
		  		if(res.code=="200"){
		  			console.log(res);
		  			this.today.orderCount=res.data.orderCount
		  			this.today.turnover=res.data.turnover
		  		}
			},
		},
		created() {},
		mounted() {
			this.getSummaryByDate();
			this.getGoodsOverall();
			this.getUserOverall();
			this.getTodaySummary();
		},
	}
</script>

<style scoped>
	.x-title {
		text-align: center;
		width: 100%;
		font-size: 20px;
		color: lightseagreen;
		font-weight: 550;
	}
	.x-gcart{
		width: 21%;
		min-width: 50px;
	}
	.gcount{font-size: 20px;padding-bottom: 10px;line-height: 40px;}
	.gname{}
	
	.xRanking{
		margin: 0px 10px;height: 490px;max-height: 500px;overflow-y: scroll;
	}
	.xRanking::-webkit-scrollbar { width: 0 !important }
	.big{font-size: 60px;}
</style>