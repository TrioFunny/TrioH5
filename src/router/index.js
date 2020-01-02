import Vue from 'vue'
import Router from 'vue-router'


import Error from '@/view/other/error'
import NotFound from '@/view/404'
import Test from '@/view/test'


import User from './user'
import Common from './common'
import Components from './components'
import Demo from './demo'
import Admin from './admin'
import XAdmin from './xproject/admin'
Vue.use(Router)

export default new Router({
  routes: [
	...User,
	...Common,
	...Components,
	...Demo,
	...Admin,
	...XAdmin,
    {
      path: '/demo',
      name: '测试',
      component: Demo
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
		},
		{ path: '/test', hidden: true, component:Test }
		
  ]
})
