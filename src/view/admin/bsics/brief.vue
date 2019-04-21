<template>
	<div style="overflow-y: scroll;padding: 10px 0px;">
		<div class="v-title1" >个人信息</div>
	 <el-form ref="personInfo" :rules="rules"  :model="form" label-width="85px"  :inline="true" :disabled="isShow">
<!--		<div class="v-title2">基本信息</div>-->
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
		<el-form-item label="联系电话"  prop="phone">
		 	<el-input v-model="form.phone"  style="width: 220px;" ></el-input>
		</el-form-item>
		<el-form-item label="身份证号"  prop="identityNum">
		 	<el-input v-model="form.identityNum"  style="width: 220px;"></el-input>
		</el-form-item>
		<el-form-item label="专业"  prop="major">
		 	<el-input v-model="form.major"  style="width: 220px;"></el-input>
		</el-form-item>
		<el-form-item label="毕业学院"  prop="school">
		 	<el-input v-model="form.school" style="width: 220px; "></el-input>
		</el-form-item>
		<el-form-item label="可实习时间"  prop="internshipTime">
			<el-date-picker  v-model="form.internshipTime" type="date" placeholder="选择日期" ></el-date-picker>
		</el-form-item>	
		<br />
	</el-form>
	
	<div style="text-align: center;padding: 50px 30px;">
		<el-button  @click="onSubmit" style="width: 300px;" type="primary" size="medium">提交</el-button>
	</div>
	
<el-dialog title="提示" :visible.sync="lastShow"  width="80%" :close-on-click-modal="false">
  <div class="v-title1">提交完毕</div>
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog>
	</div>
</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
    	isShow:false,
    	lastShow:false,
        form: {
			name:'',//姓名
			sex:'',//性别
			major:'',//专业职称
			phone:'',//联系电话
			school:'',//
			internshipTime:'',//
			identityNum:'',//
        },
    	//验证
    	rules: {
    		name:[ { required: true, message: '请输入姓名', trigger: 'blur' }],
    		sex:[{ required: true, message: '请选择性别', trigger: 'blur' }], 
      		phone:[ { required: true, message: '请输入电话', trigger: 'blur' }],
    	},
    }
  },
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
	  	let url=this.$G.server+"/admin/addBsics";
	  	this.$T.post(url,this.form,"",this.success);
	  },
	  success(res){
	  	if(res.code=="200"){
	  		this.$message('提交成功');
	  		this.lastShow=true;
	  		this.isShow=true;
	  	}
	  },
	},
	mounted() {
		
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
