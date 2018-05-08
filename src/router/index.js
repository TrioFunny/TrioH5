import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'

import Login from '@/view/common/Login'
import Register from '@/view/common/Register'


import PersonalSpace from '@/view/user/personalSpace'




//组件
import header from '@/components/header'

//测试中
import test from '@/view/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    
    
    
    
   {
      path: '/personalSpace',
      name: 'PersonalSpace',
      component: PersonalSpace
    },
    
    
    
  	{
		 path: '/header',
		 name: 'header',
		 component: header
		},
    
    
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
