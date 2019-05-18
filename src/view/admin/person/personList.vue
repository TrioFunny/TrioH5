<template>
	<div>
		<div class="v-title1">人员管理</div>	
		<!--搜索功能-->
		<div style="text-align: center;">
			<el-form :inline="true" :model="page" class="demo-form-inline" style="padding: 0px 40px;">
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.name" placeholder="姓名"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.sex" placeholder="性别"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.phoneNum" placeholder="电话"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			    <el-input v-model="page.applyJob" placeholder="申请岗位"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" size="small" @click="getPage">查询</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="info" size="small" @click="reset">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	
		<!--表格-->
		<div style="padding: 0px 20px;" >
		  <el-table :data="list"  ref="multipleTable"   @selection-change="selection" @row-dblclick="goShow">
			<el-table-column type="selection" width="55">
		    </el-table-column>
		    <el-table-column type="index" :index="indexMethod">
		    </el-table-column>
		    <el-table-column label="姓名" prop="name" width="100" show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="性别" prop="sex"  width="50" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="申请岗位" prop="applyJob"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="年龄"   width="50" show-overflow-tooltip >
		      <template slot-scope="props">  
		      	{{$G.getAge(props.row.birthday)}}
		      </template>
		    </el-table-column>
		    <el-table-column label="电话" prop="phoneNum" width="80"  show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column label="邮箱" prop="email" show-overflow-tooltip >
		    </el-table-column>
		    <el-table-column type="expand" label="详细" width="100px">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" >
		          <el-form-item label="姓名">
		            <span>{{props.row.name}}</span>
		          </el-form-item>
		          <el-form-item label="性别">
		            <span> <el-tag :type="props.row.sex=='男'? '':'danger'" >{{props.row.sex}}</el-tag> </span>
		          </el-form-item>
		          <el-form-item label="身份证号">
		            <span> {{props.row.identityNum}} </span>
		          </el-form-item>
		          <el-form-item label="民族">
		            <span> {{props.row.identityNum}} </span>
		          </el-form-item>
		          <el-form-item label="出生日期">
		            <span> {{props.row.identityNum}} </span>
		          </el-form-item>
		          <el-form-item label="婚育情况">
		            <span> {{props.row.isMarry}}</span>
		          </el-form-item>
		          <el-form-item label="政治面貌">
		            <span>{{props.row.politicalIdentity}} </span>
		          </el-form-item>
		          <el-form-item label="个人特长">
		            <span> {{props.row.speciality}} </span>
		          </el-form-item>
		          <el-form-item label="户籍地址" >
		            <span>{{props.row.householdAddress}}</span>
		          </el-form-item>
		          <el-form-item label="申请岗位" >
		            <span>{{props.row.applyJob}}</span>
		          </el-form-item>
		          <el-form-item label="专业职称" >
		            <span>{{props.row.major}}</span>
		          </el-form-item>
		          <el-form-item label="联系电话" >
		            <span>{{props.row.phoneNum}}</span>
		          </el-form-item>
		          <el-form-item label="email" >
		            <span>{{props.row.identityNum}}</span>
		          </el-form-item>
		          <el-form-item label="现居地址" >
		            <span>{{props.row.address}}</span>
		          </el-form-item>
		          <el-form-item label="到岗时间" >
		            <span>{{props.row.arrivalTime}}</span>
		          </el-form-item>
		          <br />
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">  
		      	<el-button  @click="goShow(scope.row)" type="text" size="small">查看</el-button> 
		    	<el-button v-if="false" @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>   
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
	  
		<div style="padding: 20px;">
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
		    	:current-page="page.page"  :page-size="page.pageSize" 	:total="total"
		      layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]"
		      	>
		    </el-pagination>
		</div>
		
		<el-dialog title="详细信息" :visible.sync="showDetailed" width="80%"  top="10px" >
		  <div>
		  	<Main ref="MainDiv" :personIdMain="personId" v-if="showDetailed"></Main>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showDetailed = false">取 消</el-button>
		    <el-button type="primary" @click="showDetailed = false">确 定</el-button>
		  </span>
		</el-dialog>

  </div>
</template>

<script>
import Main from "@/view/admin/main";
	
export default {
  name: 'admin',
  data () {
    return {
    	This:this,
    	
    	showDetailed:false,
    	personId:'',
    	
	    list: [],
	    total:0,
        page:{
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
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        },
		selectionList:[],
    }
  },
	components: {
		Main
	},
	methods: {
      indexMethod(index) {//自动生成index
        return index +1;
      },
	  handleClick(row) {//对应事件
	    console.log(row);
	  },
	  handleSizeChange(val){//修改页面数量
	  	this.page.pageSize=val;
	  	this.getPage();
	  },
	  handleCurrentChange(val){//点击页码
	  	this.page.page=val;
	  	this.getPage();
	  },
	  getPage(){//获取信息（刷新）
	  	let url=this.this.$C.solo+"/admin/getPersonPage";
	  	let data=this.page;
	  	this.$T.post(url,data,"",this.success);
	  },
	  success(res){ //成功回调
	  	if(res.code=="200"){
	  		this.list=res.data.data;
	  		this.total=res.data.total;
	  	}
	  },
	  reset(){//重置信息
	  	let page={
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
			//isAgree:true,//是否同意背景调查
        	page:1,
        	pageSize:10,
        	sortWord:'',
        	isAsc:1,
        }
	  	this.page=page
		this.getPage();
	  },
	  selection(val){//选择
		 this.selectionList = val;
	  },
	  clear(){//清空
		 this.$refs.multipleTable.clearSelection();
	  },
	  goShow(row){
		this.showDetailed=true;
		this.personId=row.id;
	  },

	  
	},
	mounted() {
		this.getPage();
	},
}
</script>

<style>
</style>
