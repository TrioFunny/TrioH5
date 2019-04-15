<template>
	<div style="overflow-y: scroll;height: 800px;padding: 10px 0px;">
		<div class="v-title1" >个人信息</div>
	 <el-form ref="personInfo" :rules="rules"  :model="form" label-width="85px"  :inline="true" :disabled="isShow">
		<div class="v-title2">基本信息</div>
		<el-form-item label="头像" v-if="false">
			<el-input v-model="form.img"  style="width: 180px;" ></el-input>
		</el-form-item>	
		<el-form-item label="姓名"  prop="name">
			<el-input v-model="form.name"  style="width: 180px;"></el-input>
		</el-form-item>	
		<el-form-item label="性别"  prop="sex">
		    <el-select v-model="form.sex" placeholder="请选择性别">
		      <el-option label="男" value="男"></el-option>
		      <el-option label="女" value="女"></el-option>
		    </el-select>
		</el-form-item>	
		<br />
		<el-form-item label="身份证号"  prop="identityNum">
		 	<el-input v-model="form.identityNum"  style="width: 180px;"></el-input>
		</el-form-item>
		<el-form-item label="出生日期"  prop="birthday">
			<el-date-picker  v-model="form.birthday" type="date" placeholder="选择日期" default-value="2000-01-01" ></el-date-picker>
		</el-form-item>	
		<el-form-item label="婚育情况"  prop="isMarry">
		 	<el-input v-model="form.isMarry"  style="width: 180px;" ></el-input>
		</el-form-item>
		
		<el-form-item label="政治面貌"  prop="politicalIdentity">
		 	<el-input v-model="form.politicalIdentity" style="width: 220px; "></el-input>
		</el-form-item>
		  <el-form-item label="个人特长"  prop="speciality">
		    <el-input type="textarea"  v-model="form.speciality"  style="width:220px;height: 50px;"></el-input>
		  </el-form-item>
		<br />

		
		<div class="v-title2">户籍信息</div>
		<el-form-item label="户籍地址"  prop="householdAddress">
		 	<el-input v-model="form.householdAddress"   style="width: 180px;"></el-input>
		</el-form-item>
		
		<el-form-item label="户口性质" prop="householdType">
		 	<el-input v-model="form.householdType"  style="width: 180px;"></el-input>
		</el-form-item>
		<div class="v-title2">职称信息</div>
	  <el-form-item label="申请岗位"  prop="applyJob">
	  	<el-input v-model="form.applyJob"  style="width: 180px;"></el-input>
	    <!--<el-select v-model="form.applyJob" placeholder="请选择岗位">
	      <el-option label="岗位1" value="shanghai"></el-option>
	      <el-option label="岗位2" value="beijing"></el-option>
	    </el-select>-->
	  </el-form-item>	
		<el-form-item label="职业资格">
		 	<el-input v-model="form.job"  style="width: 180px;"></el-input>
		</el-form-item>
		
		<el-form-item label="专业职称">
		 	<el-input v-model="form.major"  style="width: 180px;"></el-input>
		</el-form-item>
		
		<div class="v-title2">联系方式</div>
		<el-form-item label="联系电话"  prop="phoneNum">
		 	<el-input v-model="form.phoneNum"  style="width: 180px;"></el-input>
		</el-form-item>
		
		<el-form-item label="联系邮箱"  prop="email">
		 	<el-input v-model="form.email"  style="width: 180px;"></el-input>
		</el-form-item>
		
		<el-form-item label="现居地址"  prop="address">
		 	<el-input v-model="form.address"  style="width: 180px;"></el-input>
		</el-form-item>
		<div class="v-title2">其他信息</div>
		<el-form-item label="紧急联系人">
		 	<el-input v-model="form.emergencyContact"  style="width: 180px;"></el-input>
		</el-form-item>
		<el-form-item label="紧急电话">
		 	<el-input v-model="form.emergencyPhone"  style="width: 180px;"></el-input>
		</el-form-item>
		<br />
		<el-form-item label="身高/cm">
		 	<el-input v-model="form.height" style="width: 80px;"></el-input>
		</el-form-item>
		<el-form-item label="体重/kg">
		 	<el-input v-model="form.weight" style="width: 80px;"></el-input>
		</el-form-item>
	</el-form>
	

	<!--教育经历-->
	<div class="v-title2">教育经历 
		<el-button @click="showModal('education')" size="small" v-if="!isShow">+</el-button>
	</div>
	<div style="width: 90%;padding: 0px 5%;">
		  <el-table :data="education" border style="width: 100%"> 
		  	<el-table-column   prop="timeSlot"   label="起止日期"   > </el-table-column> 
		  	<el-table-column   prop="education"   label="学历"  > </el-table-column> 
		  	<el-table-column   prop="schoolName"   label="学校名称"  > </el-table-column> 
		  	<el-table-column   prop="major"   label="专业"   > </el-table-column> 
		  	<el-table-column   prop="certificate"   label="证书"   > </el-table-column> 
		  	<el-table-column      label="操作"   v-if="!isShow">   
		  		<template slot-scope="scope">     
					<el-button type="text" size="small" @click="deleteItem(scope.$index,'education')">删除</el-button>    
		  		</template> 
		  	</el-table-column>
		  </el-table>
	</div>
	
	<!--家庭成员-->
	<div class="v-title2" style="padding: 50px 50px 10px 20px;">
		家庭主要成员 
		<el-button @click="showModal('family')" size="small" v-if="!isShow">+</el-button>
	</div>
	<div style="width: 90%;padding: 0px 5%;">
		  <el-table :data="family" border style="width: 100%"> 
		  	<el-table-column  prop="name"   label="姓名"   width="150"> </el-table-column> 
		  	<el-table-column   prop="relationship"   label="关系"   > </el-table-column> 
		  	<el-table-column   prop="birthday"   label="出生日期"   > </el-table-column> 
		  	<el-table-column   prop="workCompany"   label="工作单位"   > </el-table-column> 
		  	<el-table-column   prop="job"   label="岗位/职务"   > </el-table-column> 
		  	<el-table-column      label="操作"   v-if="!isShow">   
		  		<template slot-scope="scope">    
		  			<el-button type="text" size="small" @click="deleteItem(scope.$index,'family')">删除</el-button>   
		  		</template> 
		  	</el-table-column>
		  </el-table>
	</div>
	
		<!--培训经历-->
	<div class="v-title2" style="padding: 50px 50px 10px 20px;">
		培训经历
		<el-button @click="showModal('train')" size="small" v-if="!isShow">+</el-button>
	</div>
	<div style="width: 90%;padding: 0px 5%;">
		  <el-table :data="train" border style="width: 100%"> 
		  	<el-table-column   prop="timeSlot"   label="起止日期"  > </el-table-column> 
		  	<el-table-column   prop="trainName"   label="课程名称"   > </el-table-column> 
		  	<el-table-column   prop="company"   label="培训机构"   > </el-table-column> 
		  	<el-table-column   prop="certificate"   label="证书"   > </el-table-column> 
		  	<el-table-column      label="操作"  v-if="!isShow">   
		  		<template slot-scope="scope">     
		  			<el-button type="text" size="small" @click="deleteItem(scope.$index,'train')">删除</el-button>   
		  		</template> 
		  	</el-table-column>
		  </el-table>
	</div>
	
		<!--工作经历-->
	<div class="v-title2" style="padding: 50px 20px 10px 20px;">
		工作经历
		<el-button @click="showModal('workExperience')" size="small" v-if="!isShow">+</el-button>
	</div>
	<div style="width: 90%;padding: 0px 5%;">
		  <el-table :data="workExperience" border style="width: 100%"> 
		  	<el-table-column     prop="timeSlot"   label="起止日期"  > </el-table-column> 
		  	<el-table-column   prop="workCompany"   label="单位名称"  > </el-table-column> 
		  	<el-table-column   prop="pay"   label="福利待遇"  > </el-table-column> 
		  	<el-table-column   prop="job"   label="职位/职称"  > </el-table-column> 
		  	<el-table-column     label="证明人及电话"   >
		  		<template slot-scope="props">     
		  			{{props.row.consultantName}}-{{props.row.consultantNum}}
		  		</template> 
		  	</el-table-column> 
		  	<el-table-column   prop="reasons"   label="离职原因"   > </el-table-column> 
		  	<el-table-column       label="操作"   v-if="!isShow">   
		  		<template slot-scope="scope">     
		  			<el-button type="text" size="small" @click="deleteItem(scope.$index,'workExperience')">删除</el-button>   
		  		</template> 
		  	</el-table-column>
		  </el-table>
	</div>

	<div style="padding: 40px 0px 0px 10px;">
		<el-form ref="form1" :model="form" label-width="120px"  :disabled="isShow" >
			<el-form-item label="录用后到岗时间">
			 	<!--<el-date-picker  v-model="form.arrivalTime" type="date" placeholder="选择日期"  ></el-date-picker>-->
			    <el-select  v-model="form.arrivalTime" placeholder="请选择到岗时间" style="width: 180px;">
			      <el-option label="随时" value="随时"></el-option>
			      <el-option label="1周内" value="1周内"></el-option>
			      <el-option label="1个月内" value="1个月内"></el-option>
			      <el-option label="3个月内" value="3个月内"></el-option>
			       <el-option label="待定" value="待定"></el-option>
			    </el-select>
			</el-form-item>
			  <el-form-item label="是否同意做背景调查">
			    <el-switch v-model="form.isAgree"></el-switch>
			  </el-form-item>
		</el-form>
	</div>
	
	<!--背景调查咨询人-->
	<div v-if="form.isAgree">
	<div class="v-title2" style="padding: 20px ">
		背景调查咨询人
		<el-button @click="showModal('consultant')" size="small" v-if="!isShow">+</el-button>
	</div>
	<div style="width: 90%;padding: 0px 5%;">
		  <el-table :data="consultant" border style="width: 100%"> 
		  	<el-table-column   prop="name"   label="姓名"  > </el-table-column> 
		  	<el-table-column   prop="workCompany"   label="工作单位"  > </el-table-column> 
		  	<el-table-column   prop="job"   label="职务"   > </el-table-column> 
		  	<el-table-column   prop="phoneNum"   label="联系电话"  > </el-table-column> 
		  	<el-table-column       label="操作"   v-if="!isShow">   
		  		<template slot-scope="scope">     
		  			<el-button type="text" size="small"@click="deleteItem(scope.$index,'consultant')">删除</el-button>   
		  		</template> 
		  	</el-table-column>
		  </el-table>
	</div>
	</div>
	<!--添加学历-->
	<div>
		<el-dialog title="添加学历" :visible.sync="frame.education" width="80%" >
			<div>
			<el-form :model="educationForm"  label-width="100px":inline="true">
				<el-form-item label="学历"  >
				  <el-input v-model="educationForm.education"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="学校名称"  >
				  <el-input v-model="educationForm.schoolName"  style="width: 220px"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="专业"  >
				  <el-input v-model="educationForm.major"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="证书"  >
				  <el-input v-model="educationForm.certificate"  style="width: 220px"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="起止时间"  >
				  <el-input v-model="educationForm.timeSlot"  style="width: 220px"></el-input>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button type="primary" @click="addEducation()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	
	<!--添加家庭成员-->
	<div>
		<el-dialog title="添加家庭成员" :visible.sync="frame.family" width="80%" >
			<div>
			<el-form :model="familyForm"  label-width="100px":inline="true">
				<el-form-item label="姓名"  >
				  <el-input v-model="familyForm.name"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="关系"  >
				  <el-input v-model="familyForm.relationship"  style="width: 220px"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="工作单位"  >
				  <el-input v-model="familyForm.workCompany"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="职务"  >
				  <el-input v-model="familyForm.job"  style="width: 220px"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="出身日期"  >
				  <el-input v-model="familyForm.birthday"  style="width: 220px"></el-input>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button type="primary" @click="addFamily()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	
	<!--添加培训经历-->
	<div>
		<el-dialog title="添加培训经历" :visible.sync="frame.train" width="80%" >
			<div>
			<el-form :model="trainForm"  label-width="100px":inline="true">
				<el-form-item label="培训机构"  >
				  <el-input v-model="trainForm.company"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="课程名称"  >
				  <el-input v-model="trainForm.trainName"  style="width: 220px"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="证书"  >
				  <el-input v-model="trainForm.certificate"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="起止时间"  >
				  <el-input v-model="trainForm.timeSlot"  style="width: 220px"></el-input>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button type="primary" @click="addTrain()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	
	<!--添加工作经历-->
	<div>
		<el-dialog title="添加工作经历" :visible.sync="frame.workExperience" width="80%" >
			<div>
			<el-form :model="workExperienceForm"  label-width="100px":inline="true">
				<el-form-item label="工作单位"  >
				  <el-input v-model="workExperienceForm.workCompany"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="待遇"  >
				  <el-input v-model="workExperienceForm.pay"  style="width: 220px"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="职位"  >
				  <el-input v-model="workExperienceForm.job"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="证明人"  >
				  <el-input v-model="workExperienceForm.consultantName"  style="width: 220px"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="证明人电话"  >
				  <el-input v-model="workExperienceForm.consultantNum"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="离职原因"  >
				  <el-input v-model="workExperienceForm.reasons"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="起止时间"  >
				  <el-input v-model="workExperienceForm.timeSlot"  style="width: 220px"></el-input>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button type="primary" @click="addWorkExperience()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	
	<!--添加背景调查咨询人-->
	<div>
		<el-dialog title="添加背景调查咨询人" :visible.sync="frame.consultant" width="80%" >
			<div>
			<el-form :model="consultantForm"  label-width="100px":inline="true">
				<el-form-item label="姓名"  >
				  <el-input v-model="consultantForm.name"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="工作单位"  >
				  <el-input v-model="consultantForm.workCompany"  style="width: 220px"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="职务"  >
				  <el-input v-model="consultantForm.job"  style="width: 220px"></el-input>
				</el-form-item>
				<el-form-item label="联系电话"  >
				  <el-input v-model="consultantForm.phoneNum"  style="width: 220px"></el-input>
				</el-form-item>
			</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button type="primary" @click="addConsultant()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	
	
	<div style="text-align: center;padding: 50px 30px;">
		<el-button v-if="this.personId==''||this.personId==undefined" @click="onSubmit" style="width: 300px;" type="primary" size="medium">下一步</el-button>
	</div>
	
	<div style="width: 100%;position: absolute;padding: 50px;"></div>
	</div>
</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
        form: {
			name:'',//姓名
			sex:'',//性别
			identityNum:'',//身份证号
			nation:'',//民族
			birthday:'',//出生日期
			isMarry:'',//婚育情况
			politicalIdentity:'',//政治面貌
			speciality:'',//个人特长
			householdAddress:'',//户籍地址
			householdType:'',//户籍性质
			applyJob:'',//申请岗位
			job:'',//职业资格
			major:'',//专业职称
			phoneNum:'',//联系电话
			email:'',//联系邮箱
			address:'',//现居地址
			height:'',//身高
			weight:'',//体重
			emergencyContact:'',//紧急联系人
			emergencyPhone:'',//紧急联系电话
			inputTime:'',//填表时间
			img:'',//头像
			arrivalTime:'',//到岗时间
			isAgree:true,//是否同意背景调查
        },
    	//验证
    	rules: {
    		name:[ { required: true, message: '请输入姓名', trigger: 'blur' }],
    		sex:[{ required: true, message: '请选择性别', trigger: 'blur' }], 
    		identityNum:[ { required: true, message: '请输入身份证号码', trigger: 'blur' }],
    		birthday:[ { required: true, message: '请输入出生日期', trigger: 'blur' }],
    		nation:[ { required: true, message: '请输入民族', trigger: 'blur' }],
    		isMarry:[ { required: true, message: '请输入婚育情况', trigger: 'blur' }],
    		politicalIdentity:[ { required: true, message: '请输入政治面貌', trigger: 'blur' }],
//    		speciality:[ { required: true, message: '请输入个人特长', trigger: 'blur' }],
      		householdType:[ { required: true, message: '请输入户籍类型', trigger: 'blur' }],
      		applyJob:[ { required: true, message: '请输入想要申请的工作', trigger: 'blur' }],
      		phoneNum:[ { required: true, message: '请输入电话', trigger: 'blur' }],
      		email:[ { required: true, message: '请输入邮箱', trigger: 'blur' }],
      		address:[ { required: true, message: '请输入现住地址', trigger: 'blur' }],
    	},
        //学历
        education: [
        	//{personId:1,schoolName:"云南大学",education:"本科",major:"专业",certificate:"证书",timeSlot:"2013-2017"}
        ],
        //家庭成员
        family:[
        	//{personId:1,name:"李世民",birthday:"19950101",workCompany:"华夏大唐",job:"皇子",relationship:"兄弟"}
        ],
        //培训经历
        train: [
       		//{personId:1,trainName:"治国安邦",company:"华夏大唐",certificate:"无",timeSlot:"2013-2017"}
        ],
        //工作经历
        workExperience:[
        	//{personId:1,timeSlot:"2013-2017",workCompany:"华夏大唐",job:"皇子",reasons:"李世民",pay:"待遇",consultantName:"李渊",consultantNum:"18314345458"}
        ],
        //背景调查咨询人
        consultant:[
       		//{personId:1,name:"李世民",workCompany:"华夏大唐",job:"皇子",phoneNum:"18314345458"},
        ],
        //模态框显示
		frame:{
			education:false,
			family:false,
			train:false,
			consultant:false,
			workExperience:false,
		},
		//
		educationForm:{schoolName:"",education:"",major:"",certificate:"",timeSlot:""},
		//{schoolName:"云南大学",education:"本科",major:"专业",certificate:"证书",timeSlot:"2013-2017"},
		familyForm:{name:"",birthday:"",workCompany:"",job:"",relationship:""},
		//{name:"李世民",birthday:"19950101",workCompany:"华夏大唐",job:"皇子",relationship:"兄弟"},
		trainForm:{trainName:"",company:"",certificate:"",timeSlot:""},
		//{trainName:"治国安邦",company:"华夏大唐",certificate:"无",timeSlot:"2013-2017"},
		workExperienceForm:{timeSlot:"",workCompany:"",job:"",reasons:"",pay:"",consultantName:"",consultantNum:""},
		//{timeSlot:"2013-2017",workCompany:"华夏大唐",job:"皇子",reasons:"李世民",pay:"待遇",consultantName:"李渊",consultantNum:"18314345458"},
        consultantForm:{name:"",workCompany:"",job:"",phoneNum:''},
        //{name:"李世民",workCompany:"华夏大唐",job:"皇子",phoneNum:'18314345458'},
    }
  },
  props: ['parent','isShow','personId','index'],
	methods: {
	  onSubmit(){//验证
		this.$refs["personInfo"].validate((e) => {
          if (e) {
          	this.addPost();
          } else {
          	 this.$message.error('请填写必填项');
            return false;
          }
        });
	  },
	 addPost() {
		if(this.educationForm.length<=0){
      		console.log(this.educationForm.length);
			this.$message.error('请至少填写一个教育经历');
        	return false;
      	}
		if(this.workExperience.length<=0){
      		console.log(this.workExperience.length);
			this.$message.error('请至少填写一个工作经历');
        	return false;
      	}
		
	    this.form.education=JSON.stringify(this.education)
	    this.form.family=JSON.stringify(this.family)
	   	this.form.train=JSON.stringify(this.train)
	    this.form.consultant=JSON.stringify(this.consultant)
	    this.form.workExperience=JSON.stringify(this.workExperience)
	  	let url=this.$G.server+"/admin/addPersonInfo";
	  	this.$T.post(url,this.form,"",this.success);
	  },
	  success(res){
	  	if(res.code=="200"){
	  		console.log(res.data);
	  		this.getPersonId(res.data);
	  	}
	  },
	  getPersonId(id){
	  	console.log(this.index);
	  	let active=this.parent.paperList[this.index+1].tag;
	  	this.parent.active=active;
	  	this.parent.personId=id;
	  },
	  showModal(frame){
	  	switch(frame){
		  	case 'education':
		  		this.frame.education=true;
		  		break;
		  	case 'family':
		  		this.frame.family=true;
		  		break;
		  	case 'train':
		  		this.frame.train=true;
		  		break;
		  	case 'consultant':
		  		this.frame.consultant=true;
		  		break;
		  	case 'workExperience':
				this.frame.workExperience=true;
		  		break;
		  	
	  	}
	  },
	  cancel(){
	  	this.frame.consultant=false;
	  	this.frame.education=false;
	  	this.frame.family=false;
	  	this.frame.train=false;
	  	this.frame.workExperience=false;
	  },
	  deleteItem(index,frame){
	  	switch(frame){
		  	case 'education':
		  		this.education.splice(index,1);
		  		break;
		  	case 'family':
		  		this.family.splice(index,1);
		  		break;
		  	case 'train':
		  		this.train.splice(index,1);
		  		break;
		  	case 'consultant':
		  		this.consultant.splice(index,1);
		  		break;
		  	case 'workExperience':
				this.workExperience.splice(index,1);
		  		break;
	  	}
	  },
	  emptyFrame(obj){
	     for(let key in obj){
	         obj[key]  = ''
			}
	  },
	  addEducation(){
	  	let item=this.$G.clone(this.educationForm);
	  	this.education.push(item);
	  	this.cancel();
		this.emptyFrame(this.educationForm);
	  },
	  addFamily(){
	  	let item=this.$G.clone(this.familyForm);
	  	this.family.push(item);
	  	this.cancel();
		this.emptyFrame(this.familyForm);
	  },
	  addTrain(){
	  	let item=this.$G.clone(this.trainForm);
	  	this.train.push(item);
	  	this.cancel();
		this.emptyFrame(this.trainForm);
	  },
	  addWorkExperience(){
	  	let item=this.$G.clone(this.workExperienceForm);
	  	this.workExperience.push(item);
	  	this.cancel();
		this.emptyFrame(this.workExperienceForm);
	  },
	  addConsultant(){
	  	let item=this.$G.clone(this.consultantForm);
	  	this.consultant.push(item);
	  	this.cancel();
		this.emptyFrame(this.consultantForm);
	  },
	  getPersonInfo(id){
	  	let url=this.$G.server+"/admin/getPersonInfoById";
	  	this.$T.post(url,{personId:id},"",this.getInfoSuccess);
	  },
	  getInfoSuccess(res){
	  	if(res.code=="200"){
	  		if(res.code==200){
	  			this.form=res.data.form;
	  			this.family=res.data.family;
	  			this.education=res.data.education;
	  			this.train=res.data.train;
	  			this.workExperience=res.data.workExperience;
	  			this.consultant=res.data.consultant;
	  		}
	  	}
	  },
	},
	mounted() {
		if(this.personId!=''&&this.personId!=undefined){
			this.getPersonInfo(this.personId);
		}
		
	},
}
</script>

<style scoped>
.v-title1{
	text-align: center;padding: 10px 30px;color: lightskyblue;font-size: 22px;
}
.v-title2{
	text-align: left;padding: 10px 20px;color: lightskyblue;font-size: 18px;
}
</style>
