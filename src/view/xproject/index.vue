<template>
	<div style="width: 100%;height: 100%;" >
		<el-container style="height: 100%">
			
		  <el-header style="padding: 0px;">
				<el-menu :default-active="index" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
				  active-text-color="#ffd04b" style="padding: 0px 50px ;color: lightgoldenrodyellow;">
				  <el-menu-item index="0" @click="indexChange('0')"><i class="el-icon-s-home white" ></i>首页</el-menu-item>
				  <el-menu-item index="1" @click="indexChange('1')">商城管理</el-menu-item>
				  <el-menu-item index="2" @click="indexChange('2')">文章管理</el-menu-item>
				  <el-menu-item index="3" @click="indexChange('3')">用户中心</el-menu-item>
				  <el-menu-item index="4" @click="indexChange('4')">系统设置</el-menu-item>
				  <el-menu-item index="5" @click="indexChange('5')">系统日志</el-menu-item>
				  <el-menu-item index="last" style="float:right;" @click="logout()">退出</el-menu-item>
				</el-menu>
		  </el-header>
		  
		  <el-container  style="overflow: hidden;background-color: #f4f3ef;">
		    <el-aside :width="menuWith" class="x-aside" >
				    <el-menu  default-active="" background-color="#545c64"	text-color="#fff" :collapse="isCollapse"
				    	 @open="handleOpen" @close="handleClose" style="height: 100%;margin-left:20px;" > 
				    <el-submenu index="mall" v-if="indexMenu=='1'" collapse-transition>
				        <template slot="title">
					        <i class="el-icon-s-shop white"></i>
					         <span slot="title">商城管理</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="mall-3" @click="$G.goTo(This,'/xproject/admin/goodsManage')">商品</el-menu-item>
				          <el-menu-item index="mall-1" @click="$G.goTo(This,'/xproject/admin/brandManage')">品牌</el-menu-item>
				          <el-menu-item index="mall-2" @click="$G.goTo(This,'/xproject/admin/categoryManage')">分类</el-menu-item>
				          <el-menu-item index="mall-4" @click="">商店</el-menu-item>
				        </el-menu-item-group>
					    <el-submenu index="other" >
							<span slot="title">其他</span>
					        <el-menu-item-group>
					          <el-menu-item index="mall-3" @click="$G.goTo(This,'/xproject/admin/paramType')" >商品参数类型</el-menu-item>
					          <el-menu-item index="mall-1" >搜索关键词</el-menu-item>
					        </el-menu-item-group>
					      </el-submenu>
				      </el-submenu>
				    <el-submenu index="shop" v-if="indexMenu=='1'">
				        <template slot="title">
					        <i class="el-icon-s-order white"></i>
					        <span slot="title">订单管理</span>
				        </template>
				        <el-menu-item-group>
						  <el-menu-item index="shop-1"  @click="$G.goTo(This,'/xproject/admin/orderHandle')">待处理订单</el-menu-item>
				          <el-menu-item index="shop-2"  @click="$G.goTo(This,'/xproject/admin/orderList')">全部订单</el-menu-item>
				        </el-menu-item-group>
				      </el-submenu>			      
			       	<el-submenu index="recommend" v-if="indexMenu=='1'">
				        <template slot="title">
					        <i class="el-icon-sell white"></i>
					        <span slot="title">商品推荐</span>
				        </template>
				          <el-menu-item index="date-1" @click="$G.goTo(This,'/xproject/admin/brandManage')">商品标签</el-menu-item>
				          <el-menu-item index="date-1" @click="$G.goTo(This,'/xproject/admin/brandManage')">热卖商品</el-menu-item>
				          <el-menu-item index="date-2" @click="$G.goTo(This,'/xproject/admin/brandManage')">新品上市</el-menu-item>
				          <el-menu-item index="date-3" @click="$G.goTo(This,'/xproject/admin/brandManage')">优惠商品</el-menu-item>
				      </el-submenu>
					
					
					
					<el-submenu index="article" v-if="indexMenu=='2'">
				        <template slot="title">
					         <i class="el-icon-document white"></i>
					          <span slot="title">文章管理</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="article-1" @click="">创建推文</el-menu-item>
				          <el-menu-item index="article-1" @click="">管理推文</el-menu-item>
				          <el-menu-item index="article-1" @click="">热门推文</el-menu-item>
				        </el-menu-item-group>
				      </el-submenu>
			       	
			       	
			       	
			       	
			       	<el-submenu index="date" v-if="indexMenu=='1'">
				        <template slot="title">
					        <i class="el-icon-s-data white"></i>
					        <span slot="title">商城数据</span>
				        </template>
				          <el-menu-item index="date-1" @click="$G.goTo(This,'/xproject/admin/brandManage')">本周数据</el-menu-item>
				          <el-menu-item index="date-2" @click="$G.goTo(This,'/xproject/admin/brandManage')">本月数据</el-menu-item>
				          <el-menu-item index="date-3" @click="$G.goTo(This,'/xproject/admin/brandManage')">年季度数据</el-menu-item>
					</el-submenu>
				      
				    <el-submenu index="user" v-if="indexMenu=='3'">
				        <template slot="title">
				    	  <i class="el-icon-user white" ></i>
				    	  <span slot="title">用户中心</span>
				        </template>
				        <el-menu-item-group >
				          <el-menu-item index="user-1"  @click="$G.goTo(This,'/xproject/admin/userList')">用户管理</el-menu-item>
				    	</el-menu-item-group>
				  	</el-submenu>
				  	<el-menu-item  v-if="indexMenu=='3'" index="user-2"  @click="$G.goTo(This,'/xproject/admin/myInfo')">
				        <template slot="title">
				    	  <i class="el-icon-user white" ></i>
				    	  <span slot="title" >个人中心</span>
				        </template>
				  	</el-menu-item>
				  	
				  	
				    <el-submenu index="base" v-if="indexMenu=='4'">
				        <template slot="title">
				    	  <i class="el-icon-setting white" ></i>
				    	  <span slot="title">基础管理</span>
				        </template>
				        <el-menu-item-group >
				          <el-menu-item index="base-1"  @click="$G.goTo(This,'/xproject/sys/userList')">用户管理</el-menu-item>
				          <el-menu-item index="base-2"  @click="$G.goTo(This,'/xproject/sys/roleList')">角色管理</el-menu-item>
				          <el-menu-item index="base-3"  @click="$G.goTo(This,'/xproject/sys/permitList')">权限管理</el-menu-item>
				          <el-menu-item index="base-4"  @click="$G.goTo(This,'/xproject/admin/postManage')">接口管理</el-menu-item>
				          <el-menu-item index="base-5"  @click="$G.goTo(This,'/xproject/admin/post')">接口测试</el-menu-item>
				    	</el-menu-item-group>
				  	</el-submenu>
				    
				    
				    <el-submenu index="log" v-if="indexMenu=='5'">
				        <template slot="title">
				    	  <i class="el-icon-tickets white" ></i>
				    	  <span slot="title">日志管理</span>
				        </template>
				        <el-menu-item-group >
				          <el-menu-item index="log-1"  @click="$G.goTo(This,'/xproject/admin/userList')">系统日志</el-menu-item>
				          <el-menu-item index="log-2"  @click="$G.goTo(This,'/xproject/admin/userList')">管理员日志</el-menu-item>
				          <el-menu-item index="log-3"  @click="$G.goTo(This,'/xproject/admin/userList')">错误日志</el-menu-item>
				    	</el-menu-item-group>
				  	</el-submenu>
	
				 	<el-menu-item index="10">
				      	<div style="height: 100px;">
				      	</div>
					</el-menu-item>
				      
				    </el-menu>
		    </el-aside>
		    
		    <el-container >
			      <el-main class="x-main">
			      	<router-view ></router-view>
			      </el-main>
		     <!-- <el-footer>Footer</el-footer>-->
		    </el-container>
		    
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'chat',
		data() {
			return {
				This:this,
				index:"1",
				indexMenu:'1',
				menuWith:'200px',
				isCollapse:false,
				menu:[],
			}
		},
		computed: {},
		components: {},
		methods: {
		      handleOpen(key, keyPath) {
		        //console.log(key, keyPath);
		      },
		      handleClose(key, keyPath) {
		        console.log(key, keyPath);
		      },
		      logout(){
		      	this.$G.removeCookie("token");
		      	this.$router.push('/xproject/');
		      },
		      indexChange(index){
		      		this.indexMenu=index;
		      		this.menuWith="200px"
		      	switch (index){
		      		case '0':
			      		this.menuWith="0px"
			      		this.$G.goTo(this,'/xproject/admin/home');
			      		break;
		      		case '1':
			      		break;
		      		case '2':
			      		break;		      		
		      		case '3':
			      		break;
		      		case '4':
			      		break;
		      		case '5':
			      		break;
			      	default:
			      		break;
		      	}
		      },
		      open(){
//		      	this.isCollapse=false;
//		      	this.menuWith="200px"
		      },
		      close(){
//		      	this.isCollapse=true;
//		      	this.menuWith="60px"
		      },
		},
		created() {
		},
		mounted() {
			
		},
	}
</script>

<style scoped>
.x-aside{
	overflow-y: scroll;overflow-x: hidden;
}
.x-aside::-webkit-scrollbar { width: 0 !important }
.x-main{ overflow: scroll;}
.x-main::-webkit-scrollbar { width: 0 !important }
.white{color: white}
</style>