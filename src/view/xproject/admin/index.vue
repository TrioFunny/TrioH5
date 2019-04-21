<template>
	<div style="width: 100%;height: 100%;">
		<el-container style="height: 100%;">
			
		  <el-header style="padding: 0px;">
				<el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
				  active-text-color="#ffd04b" style="padding: 0px 50px ;color: lightgoldenrodyellow;">
				  <el-menu-item index="1">商城文章</el-menu-item>
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
				        </el-menu-item-group>
				          <el-menu-item index="1-2"  @click="">角色管理</el-menu-item>
				          <el-menu-item index="1-3"  @click="">权限管理</el-menu-item>
				      </el-submenu>
				     
				     <el-submenu index="2">
				        <template slot="title">
					        <i class="el-icon-menu"></i>
					        <span slot="title">商城管理</span>
				        </template>
				          <el-menu-item index="2-1" @click="$G.goTo(This,'/xproject/admin/brandManage')">品牌管理</el-menu-item>
				          <el-menu-item index="2-2" @click="$G.goTo(This,'/xproject/admin/categoryManage')">分类管理</el-menu-item>
				          <el-menu-item index="2-3" @click="$G.goTo(This,'/xproject/admin/goodsManage')">商品管理</el-menu-item>
				          <el-menu-item index="2-3" @click="$G.goTo(This,'/xproject/admin/goodsInfo')">商品详细信息</el-menu-item>
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

				      <el-menu-item index="3">
				      	<div style="height: 500px;">
				      	</div>
				      </el-menu-item>
				      
				    </el-menu>
				  </el-col>
				</el-row>
		    </el-aside>
		    
		    <el-container>
		      <el-main>
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
				isShow:true,
			}
		},
		computed: {},
		components: {},
		methods: {
		      handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		      },
		      handleClose(key, keyPath) {
		        console.log(key, keyPath);
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