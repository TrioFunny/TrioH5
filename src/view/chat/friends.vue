<template>
	<!--<div style="margin-top: 30px;overflow-y: scroll;height: 460px;">-->
	<content>
		<!--<el-button @click="messageBox" type="primary" icon="el-icon-edit" circle></el-button>-->
		<!--<el-collapse>
			<el-collapse-item v-for="(item,index) in groupings" :title="item" :name="index" :key="index">
			</el-collapse-item>

		</el-collapse>-->
		<el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" suffix-icon="el-icon-search"></el-autocomplete>

	</content>
	<!--</div>-->
</template>

<script>
	import Tool from '@/util/tool';
	import Common from '../../interface/common'
	import axios from 'axios'
	export default {
		name: 'chat',
		data() {
			return {
				friends: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
				groupings: ['我的好友', '分组1', '分组2', '分组3'],
				restaurants: [],
				state4: '',
				timeout: null
			}
		},
		props: ['parent'],
		computed: {

		},
		methods: {
			messageBox() {
				this.$prompt('请输入分组名称', '分组', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					//inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
					inputValidator: (val) => {
						if(val.length > 11) {
							return '您输入的分组名称超长！';
						}
						console.log(val);
						for(var i = 0; i < this.groupings.length; i++) {
							if(this.groupings[i] == val) {
								return '分组已经存在！';
							}
						}
					},
					//inputErrorMessage: '邮箱格式不正确'
				}).then(({
					value
				}) => {
					this.$message({
						type: 'success',
						message: '你的分组是: ' + value
					});
					let param = {
						userId: '',
						groupName: value
					};
					Common.friendGroup.post(param, this);

				})
				//				.catch(() => {
				//					this.$message({
				//						type: 'info',
				//						message: '取消输入'
				//					});
				//				});
			},
			createGroupCallback(res) {
				console.log(res.code);
			},
			loadAll() {
				var url = "http://" + window.url + '/chat/friends';
				let list = [];
				axios.get(url).then(function(response) {
					for(let i of response.data.data) {
						i.value = i.username; //将想要展示的数据作为value
						list.push(i);
					}

				});
				return list;
			},
			//			loadAll() {
			//				return [{
			//						"value": "三全鲜食（北新泾店）",
			//						"address": "长宁区新渔路144号"
			//					},
			//					{
			//						"value": "Hot honey 首尔炸鸡（仙霞路）",
			//						"address": "上海市长宁区淞虹路661号"
			//					},
			//					{
			//						"value": "新旺角茶餐厅",
			//						"address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
			//					},
			//					{
			//						"value": "泷千家(天山西路店)",
			//						"address": "天山西路438号"
			//					},
			//					{
			//						"value": "胖仙女纸杯蛋糕（上海凌空店）",
			//						"address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
			//					},
			//					{
			//						"value": "贡茶",
			//						"address": "上海市长宁区金钟路633号"
			//					},
			//				]
			//			},
			querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				console.log(item);
				this.open2(item);
			},
			open2(data) {
				//console.log('friends中的ID' + data.id);
				this.$confirm('确认进入' + data.username + '的主页吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//					this.$message({
					//						type: 'success',
					//						message: '进入成功!'
					//					});
					this.$router.push({
						path: '/user/personalSpace',
						//						name: 'personalSpace',
						query: {
							userId: data.id
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}

		},

		created() {},
		mounted() { //this.userId = Tool.getCookie('userId');
			this.restaurants = this.loadAll();
		},
	}
</script>

<style>
	/*滚动条*/
	
	content::-webkit-scrollbar {
		width: 0px;
	}
	
	content::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background: cornflowerblue;
	}
	
	content::-webkit-scrollbar-track {
		border-radius: 5px;
		background-color: #eee;
	}
</style>
