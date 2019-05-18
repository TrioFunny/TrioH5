<template>
	<div >
		<div class="v-title1"><el-button @click="$G.back(This)" style="float:left" >返回</el-button> 添加试题</div>
		<div>
			<el-form ref="form"  label-width="100px">
				<el-form-item label="试卷名称"  >
				  <el-input v-model="form.title"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="介绍"  >
				  <el-input v-model="form.text" type="textarea" style="width:600px;"></el-input>
				</el-form-item>
				<el-form-item :label="'题目'+(index+1)+':'" v-for="(item,index) in options"  :key="index">
					<div style="padding-left: 20px;">{{item.title}}</div>
					<el-radio-group v-model="answer" >
						<div v-for="op in JSON.parse(item.options)">
							<el-radio  class="v-radio" value="1" :label="op.option+'、'+op.text" ></el-radio>
						</div>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item label="">
					<el-button type="text" @click="dialogVisible = true">添加题目</el-button>
				</el-form-item>
			</el-form>
			
			  <div style="padding-left:80px ;">
			  	 <el-button type="primary" @click="onSubmit" style="width: 320px;">创建试卷</el-button>
			  </div>
		</div>

		<div>
			<el-dialog title="试题选择" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
				<div>
					<QuestionList ref="QList"></QuestionList>
				</div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="getSelectList()">确 定</el-button>
			  </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import QuestionList from "../question/questionList";
	
	export default {
		name: 'admin',
		data() {
			return {
				This:this,
				//表单的基本选项
				form:{
					title:'',
					text:'',
				},
				options:[],
				answer:'',
				//模态框的显示
				dialogVisible: false,
			}
		},
		components: {
			QuestionList
		},
		methods: {
		      handleClose(done) {
		        this.$confirm('确认关闭？').then(_ => {done();}).catch(_ => {});
		      },
		      getSelectList(){//获取选择详细
		      	let list=this.$refs.QList.selectionList;
		      	for(let i=0;i<list.length;i++){
		   			this.options.push(list[i]);
		      	}
		      	console.log(this.options);
		      	this.$refs.QList.clear();
		      	this.dialogVisible = false
		      },
		      onSubmit(){
		      	let idList=[];
		      	for(let i=0;i<this.options.length;i++){
		   			idList.push(this.options[i].id);
		      	}
			  	let url=this.this.$C.solo+"/admin/addPaper";
			  	let data={
			  		title:this.form.title,
			  		text:this.form.text,
			  		idList:idList,
			  	}
			  	if(data.title==""){
			  		 this.$message.error('标题为空');
			  		return ;
			  	}
			  	this.$T.post(url,data,"",this.success);
		      },
		      success(res){
			  	if(res.code=="200"){
			  		this.$G.goToByName(this,'paperList');
			  	}
		      }
		},
	}
</script>

<style scoped>
.v-radio{
	margin: 10px;
}
</style>