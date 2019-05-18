<template>
		<div style="padding: 20px 20%;">
			<!--功能-->
			<div style="text-align: center;padding: 10px;">
			  <el-button type="primary" @click="openAddSpec" >添加规格</el-button>
			  <el-button type="primary" @click="openAddSpecValue">添加规格值</el-button>
			</div>
			<!--展示-->
			<el-collapse   v-model="activeNames">
			  <el-collapse-item  :name="index" v-for="(spec,index) in specList" :key="index">
			    <template slot="title" > 
			    	<div class="x-title"  ><span @click="openUpdateSpec()">{{spec.info.SPEC_NAME}}</span></div>
			    </template>
			    <div style="text-align: center;">
					<el-tag class="x-spec"  v-for="(tag,index) in spec.value" :key="tag.name"  :type="getTagType(index)" 
						@close="tagClose(index)" @click="openUpdateSpecValue()"  closable> {{tag.specValue}}
					</el-tag>
			    </div>
			  </el-collapse-item>
			</el-collapse>
			<div style="width: 100%;position: absolute;padding: 50px;"></div>
			
			<!--弹出模态框栏-->
			<div>
				<el-dialog :title="specDialog.title" :visible.sync="specDialog.showDialog" width="48%" >
					<div>
					<el-form :model="spec"  label-width="100px":inline="true" :disabled="specDialog.readonly">
						<el-form-item label="规格名"  >
							<el-input v-model="spec.specName"  style="width: 220px" ></el-input>
						</el-form-item>
					</el-form>
					</div>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="specDialog.showDialog=false">取 消</el-button>
				    <el-button type="primary" @click="saveGoodsSpec">确 定</el-button>
				  </span>
				</el-dialog>
			</div>
			
			<el-dialog :title="valueDialog.title" :visible.sync="valueDialog.showDialog" width="48%" >
				<div>
				<el-form :model="specValue"  label-width="100px":inline="true" :disabled="valueDialog.readonly">
					<el-form-item label="规格名"  >
					  <el-select v-model="specValue.specId" placeholder="请选择" style="width: 220px">
					    <el-option v-for="spec in specList" :key="spec.id" :label="spec.info.SPEC_NAME"  :value="spec.info.SPEC_ID">
					  	</el-option>
					  </el-select>
					</el-form-item>
					<el-form-item label="规格值"  >
						<el-input v-model="specValue.specValue"  style="width: 220px" ></el-input>
					</el-form-item>
				</el-form>
				</div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="valueDialog.showDialog=false">取 消</el-button>
			    <el-button type="primary" @click="saveGoodsSpecValue">确 定</el-button>
			  </span>
			</el-dialog>

		</div>
			
</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
    	url:{//请求地址统一管理
    		saveGoodsSpec:this.$C.xproject+'/mall/saveGoodsSpec',
    		saveGoodsSpecValue:this.$C.xproject+'/mall/saveGoodsSpecValue',
    	},
		//规格信息栏
		//specList:[],
		//当前展开项
		activeNames:[],
		
		//spec 模态框对象
		specDialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
		},
		spec:{
			id:'',
			specName:'',
			spuId:'',
		},
		
		//value 模态框对象
		valueDialog:{
	    	title:'',
	    	showDialog:false,//是否展示模态框
	    	readonly:false,
		},
		specValue:{
			id:'',
			specValue:'',
			spuCode:'',
			specId:'',
		},
		
    }
  },
    props: ['specList','spu'],
	methods: {
		//tag 样式
	  getTagType(index){
	  	switch(index){
	  		case 0:
	  			return ""; break;
	  		case 1:
	  			return "success"; break;
	  		case 2:
	  			return "info"; break;
	  		case 3:
	  			return "warning"; break;
	  		case 4:
	  			return "danger"; break;
	  		default:
				return ""; break;
	  	}
	  },

	  //添加规格信息
	  saveGoodsSpec(){
	  	this.$T.post(this.url.saveGoodsSpec,this.spec,"",this.success);
	  },
	  success(res){
	  	if(res.code=="200"){
	  		this.$message.success('提交成功');
	  		this.specDialog.showDialog=false;
	  		this.valueDialog.showDialog=false;
	  		this.$emit('refresh');
	  	}
	  },
	  //tag 删除
	  tagClose(index){
	  	this.tags.splice(index);
	  },
	  //添加规格
	  openAddSpec(){
	  	this.specDialog.showDialog=true;
	  	this.$G.emptyFrame(this.spec);
	  	this.spec.spuId=this.spu.id;
	  },
	  //修改规格
	  openUpdateSpec(item){
	  	this.specDialog.showDialog=true;
	  },
	  //添加规格信息
	  saveGoodsSpecValue(){
	  	this.$T.post(this.url.saveGoodsSpecValue,this.specValue,"",this.success);
	  },
	  //添加规格值
	  openAddSpecValue(){
	  	this.valueDialog.showDialog=true;
	  	this.$G.emptyFrame(this.item);
	  	this.specValue.spuCode=this.spu.spuNo;
	  },
	  //修改添加规格值
	  openUpdateSpecValue(){
	  	this.valueDialog.showDialog=true;
	  },
	  
	  
	},
	mounted() {
		
	},
}
</script>

<style scoped>
.x-spec{
	margin: 5px; font-size: 10px;
}
.x-title{
	text-align: center;width: 100%;font-size: 20px;color: lightseagreen;font-weight: 550;
}
.v-title1{
	text-align: center;padding: 20px 30px;color: lightskyblue;font-size: 22px;
}
.v-title2{
	text-align: left;padding: 10px 20px;color: lightskyblue;font-size: 18px;
}
</style>
