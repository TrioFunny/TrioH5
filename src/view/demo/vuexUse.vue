<template>
  <div>
  	<div>当前时间：<button>{{dateTime}}</button></div>
  	<div>用户：<button >{{userInfo.userName}}</button><button @click="login">修改</button></div>
  </div>
</template>

<script>

//mapState 引用 vuex中Store的State(全局唯一数据)
//mapGetters  引用 vuex中Store的Getters(state的计算属性，一些扩充可延伸)
//mapActions  引用 vuex中Store的Actions(与Getters区别不大只是异步处理)
import { mapState,mapActions} from 'vuex'
import Util from '@/util/my/util'

export default {
  name: 'Vuex',
  data () {
    return {
    
    }
  },
  //监听和计算属性
  computed:{
  	...mapState(['userInfo']),
  	dateTime:function(){
			let time=new Date().Format("yyyy-MM-dd hh:mm:ss");
  		return time;
  	}
  },
  methods:{
			...mapActions(['setUserInfo']),
			login(){
				let userInfo={
							userId:'110',
							userName:'无事，无趣，无聊',
				}
				this.setUserInfo(userInfo);
			}
  },
  
}
</script>

<style>
</style>
