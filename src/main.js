// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//UI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)

//vuex
import store from './vuex/index'
import Vuex from 'vuex'
Vue.use(Vuex)

//画图工具
import echarts from 'echarts'
Vue.prototype.echarts = echarts; 


//公用工具
import Config from '@/util/config';
Vue.prototype.$C=Config;
import Tool from '@/util/tool';
Vue.prototype.$T=Tool;
import General from '@/util/general';
Vue.prototype.$G=General;

//跳转拦截
const common=['/Login','/Register',"/xproject/","/xproject/login","/xproject/register" ];

router.beforeEach((to, from, next) =>{
	
	if(common.indexOf(to.path)<0){//判断是否在游客界面
		
//		let falg=General.getCookie("token").length;
//		if(falg<1){//没有登陆就条状到登陆界面
//			return next({path: "/xproject/"});
//		}
		
	}

	next();//跳转
	
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
