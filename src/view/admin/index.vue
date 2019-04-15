<template>
	<div style="width: 100%;height: 100%;">
		<el-container style="height: 100%;">
			
		  <el-header style="padding: 0px;">
				<el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
				  active-text-color="#ffd04b" style="padding: 0px 50px ;color: lightgoldenrodyellow;">
				  <el-menu-item index="1">题目问答</el-menu-item>
				</el-menu>
		  </el-header>
		  
		  <el-container>
		    <el-aside width="200px" style="height: 100%;">
				<el-row class="tac">
				  <el-col >
				    <el-menu  default-active="" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose">
				     
				     <el-submenu index="1">
				        <template slot="title">
				          <i class="el-icon-location"></i>
				          <span>试卷管理</span>
				        </template>
				        <el-menu-item-group title="题目">
				          <el-menu-item index="1-2"  @click="$G.goToByName(This,'questionList')">题目管理</el-menu-item>
				        </el-menu-item-group>
				        
				        <el-menu-item-group title="试卷">
				          <el-menu-item index="1-12"  @click="$G.goToByName(This,'paperList')">试卷管理</el-menu-item>
				        </el-menu-item-group>
				        
				        <el-menu-item-group title="界面">
				          <el-menu-item index="1-13"  @click="$G.goToByName(This,'showList')">界面管理</el-menu-item>
				        </el-menu-item-group>
				      </el-submenu>
				      
				     <el-submenu index="2">
				        <template slot="title">
					        <i class="el-icon-menu"></i>
					        <span slot="title">候选人管理</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="2-1" @click="$G.goToByName(This,'personList')">候选人列表</el-menu-item>
				        </el-menu-item-group>
				        <el-menu-item-group>
				          <el-menu-item index="2-2" @click="$G.goToByName(This,'briefList')">简介列表</el-menu-item>
				        </el-menu-item-group>
				      </el-submenu>
				      

				      </el-menu-item>
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
//		      goto(name){
//		      	this.$router.push({name: name});
//		      }
		},
		created() {
		},
		mounted() {
			
		},
	}
</script>

<style scoped>

</style>