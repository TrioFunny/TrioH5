<template>
	<div>
		<el-collapse v-model="activeNames">
			<div style="text-align: center;">
				<el-form label-width="100px" :inline="true">
					<el-form-item  >
						<el-button type="success" icon="el-icon-plus"  @click="addSize()">添加</el-button>
						<el-button type="primary" icon="el-icon-refresh" @click="post">请求</el-button>
						<el-button type="warning" icon="el-icon-sold-out" @click="save">保存</el-button>
						<el-button type="info" icon="el-icon-delete" @click="clear">清空</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-collapse-item name="2">
				<template slot="title">
					<div class="x-title"> <span>参数方式</span>
					</div>
				</template>
				<div style="text-align: center;">
					<el-form label-width="0px"  ref="form">
						<el-form-item label="" prop="url">
							<el-input placeholder="请输入内容" v-model="url" style="width: 300px">
								<template slot="prepend">http://</template>
							</el-input>
						</el-form-item>
						<br />
						<el-form-item v-for="(item,index) in params" :key="index" >
							<el-input v-model="item.key" style="width: 200px"></el-input>
							<el-input v-model="item.value" style="width: 200px"></el-input>
							<el-button type="info" icon="el-icon-close" circle @click="deleteParam(index)"></el-button>
						</el-form-item>

					</el-form>
				</div>
			</el-collapse-item>
			<el-collapse-item name="3">
				<template slot="title">
					<div class="x-title"> <span>结果</span></div>
				</template>
				<div style="text-align: center;">
					{{resultMsg}}
				</div>
			</el-collapse-item>
		</el-collapse>

	</div>
</template>

<script>
	export default {
		name: 'chat',
		data() {
			return {
				This: this,
				activeNames: ['1', '2', '3'],
				url: '',//地址
				params:[],//参数
				resultMsg: '',//返回信息

			}
		},
		computed: {},
		components: {},
		methods: {
				addSize() {
					//this.size = this.size + 1;
					let item={key:"",value:""}
					this.params.push(item);
				},
				deleteParam(index) {
					this.params.splice(index,1);
				},
				//发出请求
				post() {
					if(this.url==""){
						this.$message.error('请填写地址');
						return;
					}
					let temp = new Object();
					for(let i = 0; i < this.params.length; i++) {
						let key = this.params[i].key;
						let value = this.params[i].value;
						temp[key] = value;
					}
					
					this.$T.post("http://"+this.url, temp, "", this.success);
					
				},
				success(res) {
					if(res.code == '200') {
						//this.resultMsg = res.data;
						this.resultMsg =res.data;
					}else{
						this.$message.error('失败');
					}

				},
				//清空表单
				clear(){
					this.url="";
					this.params=[];
					this.resultMsg="";
				},
				//保存接口
				save(){
				
				},
				
		},
		created() {},
		mounted() {

		},
	}
</script>

<style scoped>
	.x-title {
		text-align: center;
		width: 100%;
		font-size: 20px;
		color: lightseagreen;
		font-weight: 550;
	}
</style>