<template>
  <div id='PersonalCenter'>
  		<headerDiv sign='1' title='个人中心'></headerDiv>
  		<!--主体-->
			<el-container style="padding: 0 15%;width: 100%;">
			  <el-header>Header</el-header>
			  <el-container>
			  	
			    <el-aside width="220px"style="height: 800px;"><!--background-color: #8CC5FF;-->

						<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
						  <el-radio-button :label="false">展开</el-radio-button>
						  <el-radio-button :label="true">收起</el-radio-button>
						</el-radio-group>
						<el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
     					 background-color="#545c64"	text-color="#fff"	active-text-color="#ffd04b"	@open="handleOpen" @close="handleClose" :collapse="isCollapse">

						  <el-menu-item index="1" @click="mainShow()">
						    <i class="el-icon-menu" ></i>
						    <span slot="title">个人信息</span>
						  </el-menu-item>

						 <el-submenu index="2">
						    <template slot="title">
						      <i class="el-icon-location"></i>
						      <span slot="title">导航一</span>
						    </template>
						    <el-menu-item-group>
						      <span slot="title">分组一</span>
						      <el-menu-item index="1-1">选项1</el-menu-item>
						      <el-menu-item index="1-2">选项2</el-menu-item>
						    </el-menu-item-group>
						    <el-menu-item-group title="分组2">
						      <el-menu-item index="1-3">选项3</el-menu-item>
						    </el-menu-item-group>
						    <el-submenu index="1-4">
						      <span slot="title">选项4</span>
						      <el-menu-item index="1-4-1">选项1</el-menu-item>
						    </el-submenu>
						  </el-submenu>
						  
						  <el-menu-item index="3" disabled>
						    <i class="el-icon-document"></i>
						    <span slot="title">导航三</span>
						  </el-menu-item>
						  
						  <el-menu-item index="4">
						    <i class="el-icon-setting"></i>
						    <span slot="title">导航四</span>
						  </el-menu-item>
						  
						</el-menu>

			    </el-aside>
			    
			    
			    <el-main style="height: 800px;border:solid grey 1px;border-radius: 5px;  margin-left:10px ; text-align: left;">
			    	<router-view></router-view>
			    </el-main>
			  </el-container>
			</el-container>
	</div>
</template>

<script>
	import headerDiv from '../../components/header';
	import PersonalInfo from './PersonalInfo';
	
	export default {
		name: 'HelloWorld',
		data() {
			return {
				//页面控制
				isCollapse: false,
				
			}
		},
	components: {
			headerDiv,PersonalInfo,
	},
		methods: {
			mainShow(){
				this.$router.replace({path: '/Info'});
			},
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
			
		},
	}
</script>

<style >

</style>