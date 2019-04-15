import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/view/xproject/admin/index'

import userList from '@/view/xproject/admin/user/list'
import userInfo from '@/view/xproject/admin/user/info'

import category_list from '@/view/xproject/admin/shop/category/list'

export default [

	{path: '/xproject/admin',name: 'Index',component: Index,
	 children:[
	 	{path: '/xproject/admin/userManage',name: 'userList',component: userList},
	 	{path: '/xproject/admin/categoryManage',name: 'categoryList',component: category_list},
	 ]
	},
]
