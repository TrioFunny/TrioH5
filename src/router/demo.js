import Vue from 'vue'
import Router from 'vue-router'


//
import DivMove from '@/view/demo/divMove'
import VuexUse from '@/view/demo/vuexUse'
import Load from '@/view/demo/load'

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
   {
      path: '/demo/load',
      name: '加载',
      component: Load
    },
  ]
