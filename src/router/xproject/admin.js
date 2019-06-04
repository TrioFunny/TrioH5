import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/view/xproject/index'

import userList from '@/view/xproject/admin/user/list'
import userInfo from '@/view/xproject/admin/user/info'

import brand_list from '@/view/xproject/admin/shop/brand/list'

import category_list from '@/view/xproject/admin/shop/category/list'

import goods_list from '@/view/xproject/admin/shop/goods/list'
import goods_info from '@/view/xproject/admin/shop/goods/goodsInfo'

import param_type from '@/view/xproject/admin/shop/other/paramType'

//工具
import post from '@/view/xproject/system/post/item'
import postList from '@/view/xproject/system/post/list'

//权限-角色-用户
import permit_list from '@/view/xproject/system/permit/list'
import role_list from '@/view/xproject/system/role/list'

import login from '@/view/xproject/system/common/login'
import register from '@/view/xproject/system/common/register'

export default [

	{path: '/xproject/admin',name: 'AIndex',component: Index,
	 children:[
	 
	 	{path: '/xproject/admin/brandManage',name: 'brandList',component: brand_list},
	 	{path: '/xproject/admin/categoryManage',name: 'categoryList',component: category_list},
	 	{path: '/xproject/admin/goodsManage',name: 'goodsList',component: goods_list},
	 	{path: '/xproject/admin/goodsInfo',name: 'goodsInfo',component: goods_info},
		//工具类东西
		{path: '/xproject/admin/post',name: 'xTest',component: post},
		{path: '/xproject/admin/postManage',name: 'xpostList',component: postList},
		//用户信息
		{path: '/xproject/admin/userManage',name: 'userList',component: userList},
		{path: '/xproject/admin/userInfo',name: 'userInfo',component: userInfo},
		//商品参数类型
		{path: '/xproject/admin/paramType',component: param_type},
		//系统权限
		{path: '/xproject/admin/permitList',component: permit_list},
		{path: '/xproject/admin/roleList',component: role_list},
		
	 ]},
	 //登陆
	{path: '/xproject/login',component: login},
	{path: '/xproject',component: login},
	//注册
	{path: '/xproject/register',component: register},
]
