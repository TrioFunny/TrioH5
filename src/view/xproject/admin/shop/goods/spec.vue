<template>
		<div style="padding: 20px 20%;">
			<!--功能-->
			<div style="text-align: center;padding: 10px;">
			  <el-button type="primary" >添加规格</el-button>
			  <el-button type="primary" >添加规格值</el-button>
			</div>
			<!--展示-->
			<el-collapse   v-model="activeNames">
			  <el-collapse-item  :name="index" v-for="(spec,index) in specList" :key="index">
			    <template slot="title" > 
			    	<div class="x-title" >{{spec.info.specName}}</div>
			    </template>
			    <div style="text-align: center;">
					<el-tag class="x-spec"  v-for="(tag,index) in spec.value" :key="tag.name"  :type="getTagType(index)" 
						@close="tagClose(index)"closable> {{tag.specValue}}
					</el-tag>
			    </div>
			  </el-collapse-item>
			</el-collapse>
			<div style="width: 100%;position: absolute;padding: 50px;"></div>
			</div>
		</div>

</template>

<script>
	
export default {
  name: 'admin',
  data () {
    return {
    	
    	code:'1dc9b98d130e47fe84ef563c6253babd',
    	url:{//请求地址统一管理
    	},
		//规格信息栏
		specList:[],
		spec:"",
		activeNames:[],
    }
  },
	methods: {
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
	  //获取商品信息
	  getGoodsInfo(){
	  	let param={code:this.code}
	  	this.$T.post(this.url.getGoodsInfo,param,"",this.getInfoSuccess);
	  },
	  getInfoSuccess(res){
		  	if(res.code=='200'){
		  		this.spu=res.data.spu;
		  		this.specList=res.data.spec;
		  	}
	  },
	  success(res){
	  	console.log(res)
	  },
	  //添加规格信息
	  saveGoodsSpec(){
	  	this.$T.post(this.url.saveGoodsSpec,this.code,"",this.success);
	  },
	  //tag 删除
	  tagClose(index){
	  	console.log(index);
	  	this.tags.splice(index);
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
