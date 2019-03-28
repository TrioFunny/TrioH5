<template>
	<div  style="">
		<div class="v-title1">
			<el-button v-if="!isTest" @click="$G.back(This)" style="float:left" >返回</el-button>
			{{this.paper.title}}
		</div>
		<div>
			<el-form ref="form"  label-width="100px " :disabled="isShow">
				<el-form-item label="" >
				  <div>{{this.paper.text}}</div>
				</el-form-item>
				<el-form-item :label="'题目'+(index+1)+':'" v-for="(item,index) in options"  :key="index">
					<div style="padding-left: 20px;">{{item.title}}</div>
					<el-radio-group v-model="answer[index]" >
						<div v-for="(op,index) in JSON.parse(item.options)">
							<el-radio  class="v-radio" :label="op.option" >{{op.option+"、"+op.text}}</el-radio>
						</div>
					</el-radio-group>
				</el-form-item>
			</el-form>
			  <div style="padding-left:80px ;" v-if="!isShow"> 
			  	 <el-button type="primary"  v-if="isTest"  @click="onSubmit"  style="width: 320px;" >提交</el-button>
			  </div>
			  
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'admin',
		data() {
			return {
				This:this,
				answer:[],//答案信息
				dics:[],
				paper:"",
				options:'',//选项
				isTest:false,//是否是测试
				isShow:false,//是否只展示
			}
		},
		props: ['id','parent'],
		components: {
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
		      getPaperInfo(){
		      	let id=this.id
				if(this.$route.query.id!=undefined){
					id=this.$route.query.id;
				}
			  	let url=this.$G.server+"/admin/getPaperById";
			  	let data={
			  		id:id,
			  	}
			  	this.$T.post(url,data,"",this.success);
		      },
		      success(res){
		      	console.log(res);
		      	if(res.code!="200"){
		      		 this.$message.error('请求失败');
		      		 return;
		      	}
		      	this.paper=res.data.paper;
		      	this.options=res.data.list;
		      },
		      getAnswerDICS(){
		      	for(let i=0;i<this.options.length;i++){
		      		let index=this.getIndexByABC(this.answer[i]);
		      		if(this.options[i].answer.length>1){
		      			let answer=this.options[i].answer[index];
		      			this.dics.push(answer);
		      		}
		      	}
		      },
		      onSubmit(){
		      	this.getAnswerDICS();
		      	let params={
		      		personId:this.parent.personId,
		      		paperId:this.id,
		      		answer:this.answer,
		      		dics:this.dics,
		      	}
			  	let url=this.$G.server+"/admin/addPaperAnswer";
			  	this.$T.post(url,params,"",this.onSubmitSucess);
		      },
		      onSubmitSucess(res){
		      	if(res.code!="200"){
		      		 this.$message.error('请求失败');
		      		 return;
		      	}
		      	this.$message({message:'提交成功',type: 'success'});
			  	let active=parseInt(this.parent.active)+1+"";
			  	this.parent.active=active;
			  	this.isShow=true;
			},
		    getIndexByABC(str){
		      	let index=str.charCodeAt()-65; 
		      	return index;
		      },
			
		},
		mounted() {
			if(this.$route.path.indexOf("main")>0){
				this.isTest=true;
			}
			this.getPaperInfo();
		},
	}
</script>

<style scoped>
.v-radio{
	margin: 10px;
}
</style>