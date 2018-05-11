<template>
  <div class="hello" style="text-align: center;">
    <h1>{{ msg }}</h1>
		
		<el-table :data="indexList" style="width: 60%;margin: 0px 20%;">

		    
		    <el-table-column	label="名称"	width="180" align='center'>
		      <template slot-scope="scope">
		        <el-popover trigger="hover" placement="left">
		          <p>src: {{ scope.row.src }}</p>
		          <p>msg: {{ scope.row.msg }}</p>
		          <div slot="reference" class="name-wrapper">
		            <span >{{ scope.row.name }}</span>
		          </div>
		        </el-popover>
		      </template>
		    </el-table-column>
		    
		    <el-table-column	label="文件名"	width="180" align='center'>
		      <template slot-scope="scope">
		        <span style="margin-left: 10px" >{{ scope.row.title }}</span>
		      </template>
		    </el-table-column>
		    
		    <el-table-column label="操作" align='center'>
		      <template slot-scope="scope">
		        <el-button	size="mini"	type="success" @click="goTo(scope.row.src)">前往</el-button>
		        <!--<el-button	size="mini"	type="danger"	@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
		      </template>
		    </el-table-column>
		    
		  </el-table>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: 'Index',
				indexList:[
				{name:'登录',src:'/login',title:"Login",msg:'用户登录入口'},
				{name:'注册',src:'/register',title:"Register",msg:'用户注册入口'},
				{name:'找回密码',src:'/restore',title:"RestorePassword",msg:'利用邮箱或者手机恢复密码'},
				{name:'修改密码',src:'/changePassword',title:"ChangePassword",msg:'修改密码'},
				{name:'个人空间',src:'/user/personalSpace',title:"PersonalSpace",msg:'个人空间'},
				{name:'个人中心',src:'/user/personalCenter',title:"PersonalCenter",msg:'个人中心'},
				{name:'个人信息',src:'/user/personalInfo',title:"PersonalInfo",msg:'个人信息'},
				],
				
			}
		},
		methods: {
			//跳转
			goTo(url) {
				this.$router.push({
					path: url,
					query: {
					}
				});
			},
      handleDelete(index, row) {
        console.log(row);
        console.log(index);
      }

		},

	}
</script>

<style >

</style>