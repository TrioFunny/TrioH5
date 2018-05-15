<template>
  <div id='PersonalInfo' style="background-color:white;width: 80%;height: 80%;padding: 30px;border-radius: 5px;">
  	
		<el-form ref="form" :model="form" label-width="100px" style="width: 60%;">
			
		  <el-form-item label="昵称：">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  
		  <el-form-item label="性别：">
			    <el-radio v-model="form.sex" label="1" border size="medium">男</el-radio>
			    <el-radio v-model="form.sex" label="2" border size="medium">女</el-radio>
			    <el-radio v-model="form.sex" label="3" border size="medium">保密</el-radio>
		  </el-form-item>

		  <el-form-item label="生日：">
		  	<div class="block">
		    	<el-date-picker	v-model="form.birthday"	type="date"	placeholder="选择日期" :picker-options="pickerOptions"> </el-date-picker>
		    </div>
		  </el-form-item>
		  
		 <el-form-item label="个人签名：">
				<el-input
				  type="textarea"
				  :autosize="{ minRows: 2, maxRows: 4}"
				  placeholder="请输入内容"
				  v-model="textarea3" >
				</el-input>
		 </el-form-item>  

		</el-form>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: '个人信息',
        form: {
          name: '',
          sex:'1',
          birthday:'',
        },
        
        
        //页面控制
				pickerOptions: {
//        disabledDate(time) {
//          return time.getTime() > Date.now();
//        },
//        shortcuts: [{
//          text: '今天',
//          onClick(picker) {
//            picker.$emit('pick', new Date());
//          }
//        }, {
//          text: '昨天',
//          onClick(picker) {
//            const date = new Date();
//            date.setTime(date.getTime() - 3600 * 1000 * 24);
//            picker.$emit('pick', date);
//          }
//        }, {
//          text: '一周前',
//          onClick(picker) {
//            const date = new Date();
//            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
//            picker.$emit('pick', date);
//          }
//        }]
        },
			}
		},
		methods: {
		},
	}
</script>

<style >

</style>