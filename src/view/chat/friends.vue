<template>
	<!--<div style="margin-top: 30px;overflow-y: scroll;height: 460px;">-->
		<content>
		<el-collapse >
		  <el-collapse-item v-for="(item,index) in grouping" :title="item" :name="index">
		  	<!--<div v-for=" item in friends">{{item}}</div>-->
		  </el-collapse-item>

		</el-collapse>
		<button @click="add()">添加朋友</button>
		</content>
	<!--</div>-->
</template>

<script>
	import Utils from '@/util/my/util';
	export default {
		name: 'chat',
		data() {
			return {
				friends:[1,2,3,4,5,6,7,8,9,0],
				grouping:['我的好友','分组1','分组2','分组3'],
			}
		},
		  props: ['parent'],
		computed:{
			
		},
		methods: {
			add(){
				this.grouping.push('分组'+this.grouping.length);
			},
		
		},
		created() {
		},
		mounted() {
			this.userId=Utils.getCookie('userId');
		},
	}
</script>

<style>
	/*滚动条*/
	content::-webkit-scrollbar {
	    width: 0px;
	}
	content::-webkit-scrollbar-thumb{
	    border-radius: 5px;
	    background: cornflowerblue;
	}
	content::-webkit-scrollbar-track {
	    border-radius: 5px;
	    background-color: #eee;
	}
</style>
