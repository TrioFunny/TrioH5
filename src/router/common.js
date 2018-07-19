import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'

import Login from '@/view/common/Login'
import Register from '@/view/common/Register'
import ChangePassword from '@/view/common/changePassword'
import ChangeHeadPhoto from '@/view/user/ChangeHeadPhoto'

<<<<<<< HEAD
import Chat from '@/view/chat/index'
=======


import ChatIndex from '@/view/chat/index'
import Friends from '@/view/chat/friends'
import Chat from '@/view/chat/chat'
>>>>>>> 11a9f9c68049f22c2e0e310e0eb2139bec7094d7

import Chat1 from '@/view/chat/chat'
import Friends from '@/view/chat/friends'

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
<<<<<<< HEAD
      component: Chat,
      children: [
	    {
	      path: '/friends',
	      name: 'Friends',
	      component: Friends
	    },
      ],
      
    },

=======
      component: ChatIndex
    },
    {
      path: '/chat/friends',
      name: '好友列表',
      component: Friends
    },
     {
      path: '/chat/chat',
      name: '聊天主页',
      component: Chat
    },  
>>>>>>> 11a9f9c68049f22c2e0e310e0eb2139bec7094d7
]