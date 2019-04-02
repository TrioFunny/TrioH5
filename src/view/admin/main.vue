<template>
	<div style="padding: 10px 0px;">
	  <el-tabs :before-leave="beforeLeave" v-model="active" type="card" :tab-position="tabPosition"  >
	    <!--<el-tab-pane label="个人信息" name="123" >
		<div >
			<PersonInfo :parent="this" :isShow="isShow" :personId="personId"></PersonInfo>
		</div>
	    </el-tab-pane>-->
	    <el-tab-pane :label="item.tag"  :name="item.tag" v-for="(item,index) in paperList" :key="item.tag" >
	    	<Paper  :id="item.showId" :parent="This" :isShow="isShow" :index="index" :personId="personId" v-if=" item.type=='paper'"></Paper>
			<div  v-if=" item.type=='question'">
				<div class="v-title1">开放问题</div>
				<el-form ref="form"  :disabled="isShow">
					<el-form-item label="" v-for="(item,index) in list" :key="index">
						<div style="text-indent:2em;">{{item.title}}</div>
					 	 <el-input type="textarea"  v-model="item.anwser" rows="4" style="width: 80%;padding-left:10% ;"></el-input>
					</el-form-item>
				</el-form>
				  <div style="text-align:center;" v-if='!isShow'>
				  	 <el-button type="primary"  @click="onSubmit" style="width: 40%;">提交</el-button>
				  </div>
			</div>
			<PersonInfo v-if="item.type=='form'" :parent="This" :index="index" :isShow="isShow" :personId="personId" @click=""></PersonInfo>
	    </el-tab-pane>
	    <!--<el-tab-pane label="性格测试" name="3" >
	    	<Paper  :id="paperList[1]" :parent="this" :isShow="isShow" :personId="personId"></Paper>
	    </el-tab-pane>-->
	    <!--<el-tab-pane label="工作经历" name="4" >
	    	工作经历
	    </el-tab-pane>-->
	    <!--<el-tab-pane label="开放问题" name="4" >

	    </el-tab-pane>-->
	  </el-tabs>
		
		
		
		
		

	</div>

</template>

<script>
	import PersonInfo from "./person/personInfo";
	import Paper from "./paper/showPaper";
	
export default {
  name: 'admin',
  data () {
    return {
    	This:this,
    	isShow:false,//是否只展示
    	tabPosition: 'left',
    	form:{},
    	//问题列表
    	list:[
	    	{title:'在之前的工作经历中哪个部分让你最满意？',anwser:""},
	    	{title:'在之前的工作经历中哪个部分让你最不满意？',anwser:""},
	    	{title:'今年对自己有什么新的规划？',anwser:""},
    	],
    	active:'1',
        paperList:[],
        tabIndex:0,
        personId:this.personIdMain,
        isSubmit:[],
    }
  },
  props: ['personIdMain'],
	components: {
		PersonInfo,Paper
	},
	
	methods: {
	  getPage(){//获取信息（刷新）
	  	let url=this.$G.server+"/admin/getMain";
	  	let data={
	  		personId:this.personId,
	  	}
	  	this.$T.post(url,data,"",this.getPageSuccess,this.err);
	  },
	  err(p1,p2,p3){
	  	let str=JSON.stringify(p1);
		alert(str);
		//alert(p3);
	  },
	  getPageSuccess(res){ //成功回调
	  	if(res.code=="200"){
	  		this.paperList=res.data;
	  		this.tabIndex=res.data.length;
	  		this.active=res.data[0].tag;
	  		for(let i=0;i<this.paperList.length;i++){
	  			this.isSubmit.push(false);
	  		}
	  	}
	  	console.log(this.paperList);
	  },
	  onSubmit() {
	  	console.log(this.title);
	  	console.log(this.anwser);
	  	let url=this.$G.server+"/admin/answerQuestions";
	  	let data={
	  		list:JSON.stringify(this.list),
	  		personId:this.personId,
	  	}
	  	this.$T.post(url,data,"",this.success);
	  },
	  success(res){
	  	if(res.code=="200"){
	  		this.$message('提交成功');
	  		
	  	}
	  },
	  beforeLeave(){
	  	if(this.personId==""){
	  		this.$message.error('请先填写个人信息');
	  		return false;
	  	}
	  },
	  getOtherAnswer(){
		let params={
			personId:this.personId,
		}
	  	let url=this.$G.server+"/admin/getQuestionsAnswer";
	  	this.$T.post(url,params,"",this.getOtherAnswerSuccess);
	  },
	  getOtherAnswerSuccess(res){
		  	if(res.code=="200"){
		  		console.log(res.data);
		  		this.list=res.data
		  	}
	  },
	 isMobile(){
		  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android)/i)
		  localStorage.setItem('ismobile',flag?1:0)
		  return flag;
		},
	 setPersonId(id){
			
	 },
	},
	mounted() {
	  	if(this.personId!=""&&this.personId!=undefined){
	  		this.isShow=true;
	  		this.getOtherAnswer();
	  	}
	  	if(this.isMobile()){
	  		this.tabPosition='top';
	  	}
	  	this.getPage();
	},
}
</script>

<style scoped>
	.q-title{
		
	}
</style>
