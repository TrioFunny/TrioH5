<template>
	<div  style="">
		<div class="v-title1">
			<el-button v-if="!isTest" @click="$G.back(This)" style="float:left" >返回</el-button>
			{{this.paper.title}}
		</div>
		<div>
			<el-form ref="showPaper"   :disabled="isShow" >
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
			  			<template slot-scope="props" show-overflow-tooltip> {{getCount('d')+getCount('D')}}</template> 
				  	</el-table-column> 
				  	<el-table-column  label="I">
				  		<template slot-scope="props" show-overflow-tooltip>{{getCount('i')+getCount('I')}}</template> 
				  	</el-table-column> 
				  	<el-table-column  label="C">
				  		<template slot-scope="props" show-overflow-tooltip>{{getCount('c')+getCount('C')}}</template> 
				  	</el-table-column> 
				  	<el-table-column  label="S">
				  		<template slot-scope="props" show-overflow-tooltip>{{getCount('s')+getCount('S')}}</template> 
				  	</el-table-column> 
				  </el-table>
			</div>
			
			<div style="width: 90%;padding: 10px 5%;" v-if="isShow&&dics.length>0">
				<div v-if="getCount('d')+getCount('D')>10" >
					<div> Dominance－支配型/控制者</div>
				     <div style="text-indent:2em;">高D型特质的人可以称为是“天生的领袖”。
				    在情感方面，D型人一个坚定果敢的人，酷好变化，喜欢控制，干劲十足，独立自主，超级自信。可是，由于比较不会顾及别人的感受，所以显得粗鲁、霸道、没有耐心、穷追不舍、不会放松。D型人不习惯与别人进行感情上的交流，不会恭维人，不喜欢眼泪，匮乏同情心。 
				在工作方面，D型人是一个务实和讲究效率的人，目标明确，眼光全面，组织力强，行动迅速，解决问题不过夜，果敢坚持到底，在反对声中成长。但是，因为过于强调结果， D型人往往容易忽视细节，处理问题不够细致。爱管人、喜欢支使他人的特点使得D型人能够带动团队进步，但也容易激起同事的反感。
				在人际关系方面， D型人喜欢为别人做主，虽然这样能够帮助别人做出选择，但也容易让人有强迫感。由于关注自己的目标， D型人在乎的是别人的可利用价值。喜欢控制别人，不会说对不起。
				    描述性词语：积级进取、争强好胜、强势、爱追根究底、直截了当、主动的开拓者、坚持意见、自信、直率</div>
				</div>
				<div v-if="getCount('i')+getCount('I')>10" >
					<div> Influence－互动型/社交者</div>
				    高I型的人通常是较为活泼的团队活动组织者
				    <div style="text-indent:2em;">I型人是一个情感丰富而外露的人，由于性格活跃，爱说，爱讲故事，幽默，彩色记忆，能抓住听众，你常常是聚会的中心人物。是一个天才的演员，天真无邪，热情诚挚，喜欢送礼和接受礼物，看重人缘。情绪化的特点使得你容易兴奋，喜欢吹牛、说大话，天真，永远长不大，富有喜剧色彩。但是，似乎也很容易生气，爱抱怨，大嗓门，不成熟。
				    在工作方面，I型人是一个热情的推动者，总有新主意，色彩丰富，说干就干，能够鼓励和带领他人一起积极投入工作。可是，I型人似乎总是情绪决定一切，想哪儿说哪儿，而且说得多干得少，遇到困难容易失去信心，杂乱无章，做事不彻底，爱走神儿，爱找借口。喜欢轻松友好的环境，非常害怕被拒绝。
				在人际关系方面，I型人容易交上朋友，朋友也多。关爱朋友，也被朋友称赞。爱当主角，爱受欢迎喜欢控制谈话内容。可是，喜欢即兴表演的特点使得I型人常常不能仔细理解别人，而且健忘多变。
				    描述性词语：有影响力、有说服力、友好、善于言辞、健谈、乐观积极、善于交际</div>
				</div>
				<div v-if="getCount('s')+getCount('S')>10" >
					<div> Steadiness－稳定型/支持者</div>
				  <div style="text-indent:2em;">高S型的人通常较为平和，知足常乐，不愿意主动前进
				    在情感方面，S型人是一个温和主义者，悠闲，平和，有耐心，感情内藏，待人和蔼，乐于倾听，遇事冷静，随遇而安。 S型喜欢使用一句口头禅：“不过如此。”这个特点使得S型总是缺乏热情，不愿改变。
				    在工作方面， S型能够按部就班地管理事务，胜任工作并能够持之以恒。奉行中庸之道，平和可亲，一方面习惯于避免冲突，另一方面也能处变不惊。但是， S型似乎总是慢吞吞的，很难被鼓动，懒惰，马虎，得过且过。由于害怕承担风险和责任，宁愿站在一边旁观。很多时候， S型总是焉有主意，有话不说，或折衷处理。 
				在人际关系方面， S型是一个容易相处的人，喜欢观察人、琢磨人，乐于倾听，愿意支持。可是，由于不以为然， S型也可能显得漠不关心，或者嘲讽别人。
				    描述性词语：可靠、深思熟虑、亲切友好、有毅力、坚持不懈、善倾听者、全面周到、自制力强</div>
				</div>
				<div v-if="getCount('c')+getCount('C')>10" >
					<div> Compliance－完美型/思考者</div>
				    <div style="text-indent:2em;">高C型的人通常是喜欢追求完美的专业型人才
				    在情感方面，C型人是一个性格深沉的人，严肃认真，目的性强，善于分析，愿意思考人生与工作的意义，喜欢美丽，对他人敏感，理想主义。但是， C型人总是习惯于记住负面的东西，容易情绪低落，过分自我反省，自我贬低，离群索居，有忧郁症倾向。
				    在工作方面， C型人是一个完美主义者，高标准，计划性强，注重细节，讲究条理，整洁，能够发现问题并制订解决问题的办法，喜欢图表和清单，坚持己见，善始善终。但是， C型人也很可能是一个优柔寡断的人，习惯于收集信息资料和做分析，却很难投入到实际运作的工作中来。容易自我否定，因此需要别人的认同。同时，也习惯于挑剔别人，不能忍受别人的工作做不好。
				    对待人际关系方面， C型人一方面在寻找理想伙伴，另一方面却交友谨慎。能够深切地关怀他人，善于倾听抱怨，帮助别人解决困难。但是， C型人似乎始终有一种不安全感，以致于感情内向，退缩，怀疑别人，喜欢批评人事，却不喜欢别人的反对。
				    描述性词语：遵从、仔细、有条不紊、严谨、准确、完美主义者、逻辑性强</div>
				</div>
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
			  	let url=this.this.$C.solo+"/admin/getPaperById";
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
		      	if(this.answer.length<this.options.length){
		      		this.$message.error('请填写完整');
		      		 return;
		      	}
		      	this.getAnswerDICS();
		      	let params={
		      		personId:this.parent.personId,
		      		paperId:this.id,
		      		answer:this.answer,
		      		dics:this.dics,
		      	}
			  	let url=this.this.$C.solo+"/admin/addPaperAnswer";
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
			  	let url=this.this.$C.solo+"/admin/getPersonAnwser";
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