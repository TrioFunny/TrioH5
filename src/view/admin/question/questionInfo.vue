<template>
	<div>
		<div class="v-title1"><el-button  @click="$G.back(This)" style="float:left" >返回</el-button> 添加试题</div>	
		<div style="padding:0px 80px;">
			<el-form  ref="form" :inline="true" :model="form" :rules="rules" class="demo-form-inline" label-width="80px">
			  <el-form-item label="题目类型" >
			    <el-select v-model="form.type"   placeholder="请选择类型">
			      <el-option label="DICS"  value="1"></el-option>
			      <el-option label="单选题" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <!--DICS题目-->
			  <div v-if="form.type=='1'">
				  <el-form-item  label="选项"  prop="options">
				 	 <el-radio  v-for=" (item,index) in form.options" :key="index"  disabled v-model="radio" class="disabled-radio">{{item.option}}、{{item.text}}</el-radio>
				  	<el-button type="text" @click="addOption">添加选项</el-button>
				  </el-form-item>
				    <br />
				  <el-form-item label="答案" prop="anwser" >
				    <el-input v-model="form.anwser"  style="width: 220px"></el-input>
				    <br />
				    <el-button style="color: red;" type="text">例：ABCD对应DICS,填入DICS</el-button>
				  </el-form-item>
			  </div>
			  <!--选择题-->
			  <div v-if="form.type=='2'">
				  <el-form-item label="题目" prop="title">
				    <el-input v-model="form.title" type="textarea" style="width:400px;"></el-input>
				  </el-form-item>
				    <br />
				  <el-form-item  label="选项"  prop="options">
				 	 <el-radio v-for=" (item,index) in form.options" :key="index" v-model="form.anwser" :label="item.option" class="disabled-radio">{{item.option}}、{{item.text}}</el-radio>
				  	<el-button type="text" @click="addOption">添加选项</el-button>
				  </el-form-item>
				    <br />
				  <el-form-item label="答案" prop="anwser">
				    <el-input  v-model=" form.anwser" style="width: 220px"  disabled></el-input>
				    <br />
				  </el-form-item>
			  </div>
			  
			  <div style="padding:10px 80px;">
			  	 <el-button type="primary" @click="onSubmit" style="width: 220px;">确定</el-button>
			  </div>
	
			</el-form>

		</div>
  </div>
</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
    	This:this,
    	form:{
    		type:'1',
    		title:'',
    		anwser:"",
    		options:[],
    	},
    	//验证
    	rules: {
    		anwser:[ { required: true, message: '请输入答案', trigger: 'blur' }],
    		options:[{ type: 'array', required: true, message: '至少有一个选项', trigger: 'change' }], 
    		title:[ { required: true, message: '请输入答案', trigger: 'blur' }],
    	},
    	radio:'',
    }
  },
	methods: {
	  handleClick(row) {
	    console.log(row);
	  },
	  onSubmit(){//验证
		this.$refs["form"].validate((e) => {
          if (e) {
          	this.addQuestion();
          } else {
            return false;
          }
        });
	  },
	  //添加选项
	 addOption() {
	   	let _this=this;
        this.$prompt('请输入选项', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/\S/,
          inputErrorMessage: '不能为空'
        }).then(({ value }) => {
        	let item={
        		option:_this.getABC(_this.form.options.length),
        		text:value,
        	}
        	_this.form.options.push(item)
          this.$message({ type: 'success', message: '添加成功'});
        }).catch(() => {
          //this.$message({ type: 'info', message: '取消输入' });       
        });
      },
	 //生成ABCD     
     getABC(size){
      	let op=String.fromCharCode((65+size))
      	return op;
      },
	  addQuestion(){ //提交
	  	let url=this.$G.server+"/admin/addChoice";
	  	let data={
	  		type:this.form.type,
	  		title:this.form.title,
	  		anwser:this.form.anwser,
	  		options:JSON.stringify(this.form.options),
	  	}
	  	this.$T.post(url,data,"",this.success);
	  },
	  success(res){ //回调
	  	if(res.code=="200"){
	  		this.$G.goToByName(this,'questionList');
	  	}
	  }
	},
}
</script>

<style>
	
</style>
