<template>
	<div style="overflow-y: scroll;height: 900px;padding: 20px 0px;">
	  <el-tabs v-model="tabs" >
	    <el-tab-pane label="用户基本信息" name="first">
	    	
	    </el-tab-pane>
	    <el-tab-pane label="地址信息" name="second">
	    	<Address></Address>
	    </el-tab-pane>
	    <!--规格信息-->
	    <el-tab-pane label="购物车信息" name="third">
	    	<ShopCart></ShopCart>
	    </el-tab-pane>
	    
	    <el-tab-pane label="订单信息" name="fourth">
	    	<Order></Order>
	    </el-tab-pane>
	    
	    <el-tab-pane label="收藏信息" name="five">
	    </el-tab-pane>
	    
	    <el-tab-pane label="历史记录" name="six">
	    </el-tab-pane>
	    
	    <el-tab-pane label="登陆记录" name="seven">
	    </el-tab-pane>
	  </el-tabs>
	</div>
</template>

<script>
import Address from './address'
import ShopCart from './shoppingCart'
import Order from './order'

export default {
  name: 'admin',
  data () {
    return {
		tabs:'first',
		code:'',
		
		
    }
  },
	components: {
		Address,ShopCart,Order,
	},
	methods: {

	  
	},
	mounted() {
		if(this.$route.query.code==undefined){
			return ;
		}
		this.code=this.$route.query.code;
		
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
