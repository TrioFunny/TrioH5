import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'


import PersonalSpace from '@/view/user/PersonalSpace'
import PersonalCenter from '@/view/user/PersonalCenter'

import PersonalInfo from '@/view/user/PersonalInfo'

export default [
   {
      path: '/user/personalSpace',
      name: '个人空间',
      component: PersonalSpace
    },
    {
      path: '/user/personalCenter',
      name: '个人中心',
      component: PersonalCenter,
		children: [
            { path: '/Info', component: PersonalInfo, name: '个人信息' }
        ]
    },
  ]
