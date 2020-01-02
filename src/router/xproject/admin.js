import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/view/xproject/index'

//import userList from '@/view/xproject/admin/user/list'

import myInfo from '@/view/xproject/admin/user/info'

import brand_list from '@/view/xproject/admin/shop/brand/list'

import category_list from '@/view/xproject/admin/shop/category/list'

//商品
import goods_list from '@/view/xproject/admin/shop/goods/list'
import goods_info from '@/view/xproject/admin/shop/goods/goodsInfo'

//参数类型
import param_type from '@/view/xproject/admin/shop/other/paramType'


//订单
import order_list from '@/view/xproject/admin/order/list'
import order_handle from '@/view/xproject/admin/order/handle'
//权限-角色-用户
import permit_list from '@/view/xproject/system/permit/list'
import role_list from '@/view/xproject/system/role/list'
import user_list from '@/view/xproject/system/user/list'

import login from '@/view/xproject/system/common/login'
import register from '@/view/xproject/system/common/register'

//工具
import post from '@/view/xproject/system/post/item'
import postList from '@/view/xproject/system/post/list'

//主页
import home from '@/view/xproject/home/home'

//用户管理
import userList from '@/view/xproject/admin/user/list'

export default [

	{path: '/xproject/admin',name: 'AIndex',component: Index,
	 children:[
	 
	 	{path: '/xproject/admin/brandManage',name: 'brandList',component: brand_list},
	 	{path: '/xproject/admin/categoryManage',name: 'categoryList',component: category_list},
	 	{path: '/xproject/admin/goodsManage',name: 'goodsList',component: goods_list},
	 	{path: '/xproject/admin/goodsInfo',name: 'goodsInfo',component: goods_info},
		//订单
		{path: '/xproject/admin/orderList',name: 'orderList',component: order_list},
		{path: '/xproject/admin/orderHandle',name: 'orderHandle',component: order_handle},
		//我的用户信息
		{path: '/xproject/admin/myInfo',name: 'userInfo',component: myInfo},
		//商品参数类型
		{path: '/xproject/admin/paramType',component: param_type},
		//系统权限
		{path: '/xproject/sys/permitList',component: permit_list},
		{path: '/xproject/sys/roleList',component: role_list},
		{path: '/xproject/sys/userList',component: user_list},
		//工具类东西
		{path: '/xproject/admin/post',name: 'xTest',component: post},
		{path: '/xproject/admin/postManage',name: 'xpostList',component: postList},
		//主页
		{path: '/xproject/admin/home',name: 'home',component: home},
		//用户管理
		{path: '/xproject/admin/userList',component: userList},
		
	 ]},
	 //登陆
	{path: '/xproject/login',component: login},
	{path: '/xproject',component: login},
	//注册
	{path: '/xproject/register',component: register},
]
