<template>
	<div style="width: 100%;height: 100%;">
		<el-container style="height: 100%;">
			
		  <el-header style="padding: 0px;">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
				  active-text-color="#ffd04b" style="padding: 0px 50px ;color: lightgoldenrodyellow;">
				  <el-menu-item index="1">商城文章</el-menu-item>
				  <el-menu-item index="2">个人中心</el-menu-item>
				  <el-menu-item index="last" style="float:right;" @click="logout()">退出</el-menu-item>
				</el-menu>
		  </el-header>
		  
		  <el-container>
		    <el-aside width="200px" style="height: 100%;">
				<el-row class="tac">
				  <el-col >
				    <el-menu  default-active="" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose">
				     
				     <el-submenu index="1">
				        <template slot="title">
				    	  <i class="el-icon-setting"></i>
				          <span>基础管理</span>
				        </template>
				        <el-menu-item-group >
				          <el-menu-item index="1-1"  @click="$G.goTo(This,'/xproject/admin/userManage')">用户管理</el-menu-item>
				          <el-menu-item index="1-2"  @click="">角色管理</el-menu-item>
				          <el-menu-item index="1-3"  @click="">权限管理</el-menu-item>
				          <el-menu-item index="1-4"  @click="$G.goTo(This,'/xproject/admin/postManage')">接口管理</el-menu-item>
				          <el-menu-item index="1-5"  @click="$G.goTo(This,'/xproject/admin/post')">接口测试</el-menu-item>
				    	</el-menu-item-group>
				      </el-submenu>
				     
				     <el-submenu index="2">
				        <template slot="title">
					        <i class="el-icon-menu"></i>
					        <span slot="title">商城管理</span>
				        </template>
				          <el-menu-item index="2-1" @click="$G.goTo(This,'/xproject/admin/brandManage')">品牌管理</el-menu-item>
				          <el-menu-item index="2-2" @click="$G.goTo(This,'/xproject/admin/categoryManage')">分类管理</el-menu-item>
				          <el-menu-item index="2-3" @click="$G.goTo(This,'/xproject/admin/goodsManage')">商品管理</el-menu-item>
				          <el-menu-item index="2-4" @click="">商店管理</el-menu-item>
				      </el-submenu>
				     <el-submenu index="3">
				        <template slot="title">
					         <i class="el-icon-location"></i>
					        <span slot="title">文章管理</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="3-1" @click="">候选人列表</el-menu-item>
				        </el-menu-item-group>
				      </el-submenu>

				      <el-menu-item index="4">
				      	<div style="height: 100px;">
				      	</div>
				      </el-menu-item>
				      
				    </el-menu>
				  </el-col>
				</el-row>
		    </el-aside>
		    
		    <el-container>
		      <el-main style="height: 1000px;">
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
		      	this.$G.removeCookie("code");
		      },
		},
		created() {
		},
		mounted() {
			
		},
	}
</script>

<style scoped>

</style>