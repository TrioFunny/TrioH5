<template>
  <div class="hello">
  	<el-container>
		  <el-header >
		  	<div style="background-color: royalblue;width: 100%;height: 100%;color: white;line-height: 60px;" >
		  		  <el-button type="success" icon="el-icon-check" circle></el-button>
		  		Header
		  		<el-button class="" type="primary" plain>登录</el-button>
		  		<el-button type="success" plain>注册</el-button>
		  	</div>
		  </el-header>
		  <el-main>Main</el-main>
		  
		</el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style>
</style>
