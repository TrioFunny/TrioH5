import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'


import PersonalSpace from '@/view/user/PersonalSpace'
import PersonalCenter from '@/view/user/PersonalCenter'

import PersonalInfo from '@/view/user/PersonalInfo'

//
import ArticleIndex from '@/view/article/index'


export default [
   {
      path: '/user/personalSpace',
      name: 'personalSpace',
      component: PersonalSpace
    },
    {
      path: '/user/personalCenter',
      name: 'personalCenter',
      component: PersonalCenter,
		children: [
            { path: '/Info', component: PersonalInfo, name: '个人信息' }
        ]
    },
    
   {
      path: '/article/index',
      name: '文章帖子',
      component: ArticleIndex
    },
  ]
