<template>
	<div style="padding: 20px 200px;">
	  <el-tabs :before-leave="beforeLeave" v-model="active"  tab-position="left" >
	    <el-tab-pane label="个人信息" name="1" >
		<div >personId:{{personId}}
			<PersonInfo :parent="this"></PersonInfo>
		</div>
	    </el-tab-pane>
	    <el-tab-pane label="文化认同" name="2" >
	    	<Paper :id="showList[0]" :parent="this"></Paper>
	    </el-tab-pane>
	    <el-tab-pane label="性格测试" name="3" >
	    	<Paper :id="showList[1]" :parent="this"></Paper>
	    </el-tab-pane>
	    <!--<el-tab-pane label="工作经历" name="4" >
	    	工作经历
	    </el-tab-pane>-->
	    <el-tab-pane label="开放问题" name="4" >
			<div >
				<div class="v-title1">开放问题</div>
				<el-form ref="form"  label-width="150px ">
					<el-form-item label="">
						<div>在之前的工作经历中哪个部分让你最满意？</div>
					 	 <el-input type="textarea"  v-model="form.speciality" rows="4" style="width: 800px;"></el-input>
					</el-form-item>
					<el-form-item label="">
						<div>在之前的工作经历中哪个部分让你最不满意？</div>
					 	 <el-input type="textarea"  v-model="form.speciality" rows="4" style="width: 800px;"></el-input>
					</el-form-item>
					<el-form-item label="">
						<div>今年对自己有什么新的规划？</div>
					 	 <el-input type="textarea"  v-model="form.speciality" rows="4" style="width: 800px;"></el-input>
					</el-form-item>
				</el-form>
				  <div style="text-align:center;">
				  	 <el-button type="primary"  @click="onSubmit" style="width: 320px;">提交</el-button>
				  </div>
					  
			</div>
	    </el-tab-pane>
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
    	personId:'1000000679755992',
    	form:{},
    	active:'1',
        showList:[2,3],
        
    }
  },
	components: {
		PersonInfo,Paper
	},
	methods: {
	  onSubmit(row) {
	    console.log(row);
	  },
	  beforeLeave(){
	  	if(this.personId==""){
	  		this.$message.error('请先填写个人信息');
	  		return false;
	  	}
	  	
	  },
	},
}
</script>

<style scoped>
	.q-title{
		
	}
</style>
