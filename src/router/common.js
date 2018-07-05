import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'

import Login from '@/view/common/Login'
import Register from '@/view/common/Register'
import ChangePassword from '@/view/common/changePassword'
import ChangeHeadPhoto from '@/view/user/ChangeHeadPhoto'
import Chat from '@/view/chat/index'

//测试中

export default [
	{
		path: '/Index',
		name: '主页',
		component: Index
	},
	{
		path: '/',
		name: 'login',
		component: Login
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
		path: '/changePassword',
		name: '修改密码',
		component: ChangePassword
	},
	{
		path: '/user/changeHeadPhoto',
		name: '修改头像',
		component: ChangeHeadPhoto
	},
    {
      path: '/chat',
      name: '聊天',
      component: Chat
    },
]