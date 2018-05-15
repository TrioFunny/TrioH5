import Vue from 'vue'
import Router from 'vue-router'


import Error from '@/view/other/error'
import NotFound from '@/view/404'
import test from '@/view/test'



import User from './user'
import Common from './common'
import Components from './components'

Vue.use(Router)

export default new Router({
  routes: [
	...User,
	...Common,
	...Components,
    {
      path: '/test',
      name: '测试',
      component: test
    },
    {
      path: '/error',
      name: '错误',
      component: Error
    },
		{
			path: '/404',
			component: NotFound,
			name: '',
			hidden: true
		},
		{
			path: '*',
			hidden: true,
			redirect: {
				path: '/404'
			}
		}
  ]
})
