import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'

import Login from '@/view/common/Login'
import Register from '@/view/common/Register'

import Error from '@/view/other/error'

import PersonalSpace from '@/view/user/PersonalSpace'
import PersonalCenter from '@/view/user/PersonalCenter'



/**
 * 组件
 */
import header from '@/components/header'
//日历
import CalendarMonth from '@/components/calendar/month';

//测试中
import test from '@/view/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '主页',
      component: Index
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
   {
      path: '/user/personalSpace',
      name: '个人空间',
      component: PersonalSpace
    },
  	{
		 path: '/header',
		 name: '头部',
		 component: header
		},
    {
      path: '/test',
      name: '测试',
      component: test
    },
    {
      path: '/error',
      name: '错误',
      component: Error
    },
    {
      path: '/user/personalCenter',
      name: '个人中心',
      component: PersonalCenter
    },
    {
      path: '/calendar/month',
      name: '日历（月）',
      component: CalendarMonth
    }
  ]
})
