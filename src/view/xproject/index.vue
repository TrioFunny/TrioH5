<template>
	<div style="width: 100%;height: 100%;" >
		<el-container style="height: 100%">
			
		  <el-header style="padding: 0px;">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
				  active-text-color="#ffd04b" style="padding: 0px 50px ;color: lightgoldenrodyellow;">
				  <el-menu-item index="1">商城文章</el-menu-item>
				  <el-menu-item index="2" @click="$G.goTo(This,'/xproject/admin/userInfo')">个人中心</el-menu-item>
				  <el-menu-item index="last" style="float:right;" @click="logout()">退出</el-menu-item>
				</el-menu>
		  </el-header>
		  
		  <el-container  style="overflow: hidden;">
		    <el-aside width="200px" class="x-aside">
				<el-row class="tac">
				  <el-col >
				    <el-menu  default-active="" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose">
				    
				      <el-menu-item index="home">
				        <template slot="title">
					        <i class="el-icon-location"></i>首页
				        </template>
				      </el-menu-item>
				    <el-submenu index="mall">
				        <template slot="title">
					        <i class="el-icon-menu"></i>商城
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
				    <el-submenu index="shop">
				        <template slot="title">
					        <i class="el-icon-document"></i>订单
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="shop-1" @click="">订单</el-menu-item>
				        </el-menu-item-group>
				      </el-submenu>			      

				     <el-submenu index="article">
				        <template slot="title">
					         <i class="el-icon-location"></i>文章
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="article-1" @click="">候选人列表</el-menu-item>
				        </el-menu-item-group>
				      </el-submenu>
				      
			       <el-submenu index="date">
				        <template slot="title">
					        <i class="el-icon-document"></i>数据
				        </template>
				          <el-menu-item index="date-1" @click="$G.goTo(This,'/xproject/admin/brandManage')">本周数据</el-menu-item>
				          <el-menu-item index="date-2" @click="$G.goTo(This,'/xproject/admin/brandManage')">本月数据</el-menu-item>
				          <el-menu-item index="date-3" @click="$G.goTo(This,'/xproject/admin/brandManage')">年季度数据</el-menu-item>
				      </el-submenu>
				     <el-submenu index="base">
				        <template slot="title">
				    	  <i class="el-icon-setting"></i>基础
				        </template>
				        <el-menu-item-group >
				          <el-menu-item index="base-1"  @click="$G.goTo(This,'/xproject/admin/userManage')">用户管理</el-menu-item>
				          <el-menu-item index="base-2"  @click="$G.goTo(This,'/xproject/admin/roleList')">角色管理</el-menu-item>
				          <el-menu-item index="base-3"  @click="$G.goTo(This,'/xproject/admin/permitList')">权限管理</el-menu-item>
				          <el-menu-item index="base-4"  @click="$G.goTo(This,'/xproject/admin/postManage')">接口管理</el-menu-item>
				          <el-menu-item index="base-5"  @click="$G.goTo(This,'/xproject/admin/post')">接口测试</el-menu-item>
				    	</el-menu-item-group>
				      </el-submenu>
	
				      <el-menu-item index="10">
				      	<div style="height: 100px;">
				      	</div>
				      </el-menu-item>
				      
				    </el-menu>
				  </el-col>
				</el-row>
		    </el-aside>
		    
		    <el-container>
		      <el-main class="x-main" >
		      	<router-view></router-view>
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
				activeIndex:"1",
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
</style>