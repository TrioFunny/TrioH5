<template>
	<div  style="">
		<div class="v-title1">
			<el-button v-if="!isTest" @click="$G.back(This)" style="float:left" >返回</el-button>
			{{this.paper.title}}
		</div>
		<div>
			<el-form ref="form"   :disabled="isShow" >
				  <div style="padding-left: 20px;text-indent:2em;">{{this.paper.text}}</div>
				<el-form-item  v-for="(item,index) in options"  :key="index">
					<div style="padding-left: 30px;">题目{{index+1}}</div>
					<div style="padding-left: 20px;">{{item.title}}</div>
					<el-radio-group v-model="answer[index]" >
						<div v-for="(op,indexA) in JSON.parse(item.options)" >
							<el-radio  :class="op.option==answer[index] ?'v-radio1':'v-radio'" :label="op.option"  style="white-space:normal;">
								<el-tag v-if="isShow&&item.answer.length>1" >{{item.answer[indexA]}}</el-tag>
								{{op.option+"、"+op.text}}
							</el-radio>
						</div>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div style="width: 90%;padding: 10px 5%;" v-if="isShow&&dics.length>0">
				结果：
				  <el-table :data="table" border style="width: 100%"> 
				  	<el-table-column  label="D">
			  			<template slot-scope="props" show-overflow-tooltip> {{getCount('d')}}</template> 
				  	</el-table-column> 
				  	<el-table-column  label="I">
				  		<template slot-scope="props" show-overflow-tooltip>{{getCount('i')}}</template> 
				  	</el-table-column> 
				  	<el-table-column  label="C">
				  		<template slot-scope="props" show-overflow-tooltip>{{getCount('c')}}</template> 
				  	</el-table-column> 
				  	<el-table-column  label="S">
				  		<template slot-scope="props" show-overflow-tooltip>{{getCount('s')}}</template> 
				  	</el-table-column> 
				  </el-table>
			</div>
			  <div style="text-align: center;" v-if="!isShow||parent"> 
			  	 <el-button type="primary"  v-if="isTest"  @click="onSubmit"  style="width: 280px;" >提交</el-button>
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
				table:[1],
				
			}
		},
		props: ['id','parent','isShow',"personId",'index'],
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
				let active=this.parent.paperList[this.index+1].tag;
				this.parent.active=active;
				this.parent.personId=id;
			  	this.isShow=true;
			},
		    getIndexByABC(str){
		      	let index=str.charCodeAt()-65; 
		      	return index;
		      },
			getPersonAnwser(){
				let params={
					paperId:this.id,
					personId:this.personId,
				}
			  	let url=this.$G.server+"/admin/getPersonAnwser";
			  	this.$T.post(url,params,"",this.getAnwserSuccess);
			},
			getAnwserSuccess(res){
			  	if(res.code=="200"){
			  		let answerList=res.data.answer.split(',');
			  		let dicsList= res.data.dics.split(',');
			  		for(let i=0;i<answerList.length;i++){
			  			if(dicsList.length==answerList.length){
			  				this.dics.push(dicsList[i])
			  			}
						this.answer.push(answerList[i])
			  		}
			  		
			  	}
			},
			getCount(str){
				let count=0;
				for(let i=0;i<this.dics.length;i++){
					if(str==this.dics[i])
						count++;
				}
				return count;
			}
		},
		mounted() {
			if(this.$route.path.indexOf("main")>0){
				this.isTest=true;
			}
			this.getPaperInfo();
			if(this.personId!=''&&this.personId!=undefined){
				this.isTest=true;
				this.getPersonAnwser();
			}
		},
	}
</script>

<style scoped>
.v-radio{
	margin: 10px;
}
.v-radio1{
	border: solid lightcoral 2px;
	border-radius: 5px;
	padding: 10px;
}
</style>