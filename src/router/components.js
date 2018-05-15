import Vue from 'vue'
import Router from 'vue-router'

//组件路由

//头部
import header from '@/components/header'
//日历
import CalendarMonth from '@/components/calendar/month';



export default [
  	{
		path: '/header',
		name: '头部',
		component: header
	},
    {
      path: '/calendar/month',
      name: '日历（月）',
      component: CalendarMonth
    }
  ]
