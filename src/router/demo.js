import Vue from 'vue'
import Router from 'vue-router'


//
import DivMove from '@/view/demo/divMove'
import VuexUse from '@/view/demo/vuexUse'

export default [
   {
      path: '/demo/DivMove',
      name: '可以拖动的div',
      component: DivMove
   },
   {
      path: '/demo/VuexUse',
      name: '可以拖动的div',
      component: VuexUse
    },
    
  ]
