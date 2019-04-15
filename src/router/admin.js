import Vue from 'vue'
import Router from 'vue-router'


import Main from '@/view/admin/main'//用户主页
import Brief from '@/view/admin/bsics/brief'
import BriefList from '@/view/admin/bsics/briefList'

import Index from '@/view/admin/index'

import PaperList from '@/view/admin/paper/paperList' //试卷列表
import Paper from '@/view/admin/paper/paper' //试卷题目
import ShowPaper from '@/view/admin/paper/showPaper' //试卷题目

import QuestionList from '@/view/admin/question/questionList'//试题列表
import QuestionInfo from '@/view/admin/question/questionInfo'//试题

import PersonList from '@/view/admin/person/personList'//候选人 列表
import PersonInfo from '@/view/admin/person/personInfo'//候选人信息	

import showList from '@/view/admin/show/showList'//展示信息	

export default [

	{path: '/test/main',name: 'SMain',component: Main},
	{path: '/test/brief',component: Brief},
	{path: '/admin',name: 'Index',component: Index,
	 children:[
	 	{path: '/admin/questionList',name: 'questionList',component: QuestionList},
	 	{path: '/admin/questionInfo',name: 'questionInfo',component: QuestionInfo},
	 	
	 	{path: '/admin/paperList',name: 'paperList',component: PaperList},
	 	{path: '/admin/paper',name: 'paper',component: Paper},
	 	
	 	{path: '/admin/personList',name: 'personList',component: PersonList},
	 	{path: '/admin/personInfo',name: 'personInfo',component: PersonInfo},
	 	{path: '/admin/showPaper',name:'showPaper',component: ShowPaper},
	 	{path: '/admin/showList',name:'showList',component: showList},
	 	{path: '/admin/briefList',name:'briefList',component: BriefList},
	 	
	 	
	 ]
	},
	{path: '/admin/paperList',component: PaperList},
]
