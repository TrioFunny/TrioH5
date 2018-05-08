<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-row>
		  <el-button type="primary" @click="goTo('/login')">去登录</el-button>
		  <el-button type="success" @click="goTo('/register')">去注册</el-button>
		  <el-button type="success" @click="goTo('/personalSpace')">主页</el-button>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: '123'
			}
		},
		methods: {
			//跳转
			goTo(url) {
				this.$router.push({
					path: url,
					query: {
						"id": 1,
						"name": 2
					}
				});
			}

		},

	}
</script>

<style scoped>

</style>