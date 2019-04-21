import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/view/xproject/admin/index'

import userList from '@/view/xproject/admin/user/list'
import userInfo from '@/view/xproject/admin/user/info'

import brand_list from '@/view/xproject/admin/shop/brand/list'

import category_list from '@/view/xproject/admin/shop/category/list'

import goods_list from '@/view/xproject/admin/shop/goods/list'
import goods_info from '@/view/xproject/admin/shop/goods/goodsInfo'

export default [

	{path: '/xproject/admin',name: 'AIndex',component: Index,
	 children:[
	 	{path: '/xproject/admin/userManage',name: 'userList',component: userList},
	 	{path: '/xproject/admin/categoryManage',name: 'categoryList',component: category_list},
	 	{path: '/xproject/admin/goodsManage',name: 'goodsList',component: goods_list},
	 	{path: '/xproject/admin/goodsInfo',name: 'goodsInfo',component: goods_info},
		{path: '/xproject/admin/brandManage',name: 'brandList',component: brand_list},
		
	 ]
	},
]
