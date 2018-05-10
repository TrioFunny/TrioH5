<template>
  <div class="hello">
  	<!--
      	作者：598339963@qq.com
      	时间：2018-05-04
      	描述：
      -->
		  <el-header  v-if="sign == '1'">
		  	<div style="background-color: cornflowerblue;width: 100%;height: 100%;color: white;">	
		  		<span >返回</span>
		  			<span style="line-height: 60px;font-size: 30px;">{{title}}</span>
		  			
		  			<span @click="goTo('/user/personalCenter')" style="border: solid 1px #D9ECFF;padding: 5px;border-radius: 10px; background-color:#00B8EC ;float: right;margin:10px 0 0 0 ;">个人中心</span>
		  	</div>
		  </el-header>
		  
		  <el-header  v-if="sign == '2'">
		  	<div style="background-color: #DD6161;width: 100%;height: 100%;color: white;">	
		  		<span style="line-height: 60px;font-size: 30px;">{{title}}</span>
		  	</div>
		  </el-header>
		  
		  
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  props: ['sign', 'title'],
  
  methods: {
		goTo(url) {
				this.$router.push({
					path: url,		
//					query:{'type': type} 参数
				});
			},
	}
}
</script>

<style>
</style>

