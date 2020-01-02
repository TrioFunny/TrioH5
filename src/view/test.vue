<template>
	<div>
		<div class="v-title1">测试</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true"  class="demo-form-inline" style="padding: 0px 40px;">
			  <el-form-item label="">
			  	 <el-button @click="openAdd()">+</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<div>
			 <el-button @click="addInfo()" size="small" type="primary">添加</el-button>
		  	 <el-button @click="updateInfo()" size="small" type="primary">更新</el-button>
		  	 <el-button @click="getInfo()" size="small" type="primary">获取</el-button>
		  	 <el-button @click="initPassword()" size="small" type="primary">初始化密码</el-button>
		</div>

	
		<!--表格-->
		<div style="padding: 0px 20px;" >
		  <el-table   ref="multipleTable"    >
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column label="分类名称" prop="categoryName"  show-overflow-tooltip>
		    </el-table-column>
  			<el-table-column label="排序" prop="sort"  show-overflow-tooltip>
		    </el-table-column>
		    </el-table-column>
		    <el-table-column label="更新时间"  show-overflow-tooltip >
		      <template slot-scope="props">  
		      	{{ $G.formatDate(props.row.updatedTime)}}
		      </template>
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">  
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
		
	<!--添加显示-->
	<div>
		<el-dialog :title="dialog.title" :visible.sync="dialog.showDialog" width="68%" >
			<div>
			<el-form   label-width="100px":inline="true" :disabled="dialog.readonly">
				<el-form-item label="文件"  >
					<el-upload
					  class="upload-demo"
					  ref="upload"
					  action="http://127.0.0.1:8888/hr/person-info/v1/importPersonInfo"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :file-list="fileList"
					  :auto-upload="false">
					  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
			</el-form>
			</div>
		</el-dialog>
	</div>

  </div>
</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
	    dialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
        },
        fileList: [],
        item:{
        	departmentId:'1',
        	jobId:'1',
        	unit:'总部',
        	name:'吴克非',
        	code:'100031',
        	idNumber:'532823199504013935',
        	birthday:'1995-04-01',
        	sex:'男',
        	nation:'汉',
        	phone:'18487148864',
        	entryTime:'2019-02-12',
        	type:'合同期',
        	correctionTime:'2019-04-01',
        	workAddress:'云南省昆明市',
        	ducation:'本科',
        	schoolName:'云南大学滇池学院',
        	major:'软件工程',
        	eMail:'598339963@qq.com',
        	isMarry:'未婚',
        	emergencyPhone:'13578413737',
        	emergencyContact:'吴名成',
        	householdAddress:'云南省西双版纳州',
        	householdType:'城镇',
        	nativePlace:'云南省',
        	address:'昆明市',
        	leaderId:'2',
        	entryMode:'社招',
        	recommender:'',
        	state:'1',
        	jobType:'支持管理类（C）',
        	jobLevel:'专员',
        	password:'1',
        	mobilizations:[{personId:'',changeTime:'2020-01-01',beforeJobId:'1',afterJobId:'2'}],
        	contracts:[{personId:'',startTime:'2019-02-12',endTime:"2022-02-12",count:'1',files:"文件1"}],
        	childrens:[{personId:'',name:'吴法',birthday:'2021-12-21'},{personId:'',name:'吴天',birthday:'2021-12-21'}],
        },
        
        item1:{
        	id:'123470',
        	departmentId:'1',
        	jobId:'1',
        	unit:'总部',
        	name:'非克吴',
        	code:'100031',
        	idNumber:'532823199504013935',
        	birthday:'1995-04-01',
        	sex:'男',
        	nation:'汉',
        	phone:'18487148864',
        	entryTime:'2019-02-12',
        	type:'合同期',
        	correctionTime:'2019-04-01',
        	workAddress:'云南省昆明市',
        	ducation:'本科',
        	schoolName:'云南大学滇池学院',
        	major:'软件工程',
        	eMail:'598339963@qq.com',
        	isMarry:'未婚',
        	emergencyPhone:'13578413737',
        	emergencyContact:'吴名成',
        	householdAddress:'云南省西双版纳州',
        	householdType:'城镇',
        	nativePlace:'云南省',
        	address:'昆明市',
        	leaderId:'2',
        	entryMode:'社招',
        	recommender:'',
        	state:'1',
        	jobType:'支持管理类（C）',
        	jobLevel:'专员',
        	password:'1',
//      	mobilizations:[{id:'4',personId:'123470',changeTime:'2020-01-01',beforeJobId:'1',afterJobId:'10086'}],
//      	contracts:[{personId:'123470',startTime:'2019-02-12',endTime:"2022-02-12",count:'1',files:"文件1"}],
//      	childrens:[{id:'1',personId:'123470',name:'吴敌',birthday:'2021-12-21'}],
        }
    }
  },
	components: {
	},
	methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeAvatarUpload(file) {
      	console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
	  openAdd(){
	  	this.dialog.readonly=false;
	  	this.dialog.showDialog=true;
	  },
	  addInfo(){
	  	let url="http://127.0.0.1:8888/hr/person-info/v1/addPersonInfo";
	  	this.$T.post(url,this.item,"",this.success);
	  },
	  updateInfo(){
	  	let url="http://127.0.0.1:8888/hr/person-info/v1/updatePersonInfo";
	  	this.item
	  	this.$T.post(url,this.item1,"",this.success);
	  },
	  success(res){
	  	console.log(res)
	  },
	  getInfo(){
	  	let url="http://127.0.0.1:8888/hr/person-info/v1/getPersonInfo?id=5";
	  	this.$T.post(url,"","",this.success);
	  },
	  initPassword(){
	  	let url="http://127.0.0.1:8888/hr/person-info/v1/initPassword";
	  	this.$T.post(url,"","",this.success);
	  },
	},
	mounted() {
	},
}
</script>

<style scoped="">
	
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
