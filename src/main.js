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
//
import store from './vuex/index'
import Vuex from 'vuex'
Vue.use(Vuex)


import Config from '@/util/config';
Vue.prototype.$C=Config;
import Tool from '@/util/tool';
Vue.prototype.$T=Tool;
import General from '@/util/general';
Vue.prototype.$G=General;

const common=['/Login','/Register' ];
router.beforeEach((to, from, next) =>{
	next();
	//console.log(to.path);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
