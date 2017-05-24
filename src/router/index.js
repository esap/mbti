import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import mbti from '@/components/mbti'
import ddi from '@/components/ddi'
import glpa from '@/components/glpa'
import vda from '@/components/vda'
import btr from '@/components/btr'
import end from '@/components/end'

Vue.use(Router)

export default new Router({
  routes: [  
    { path: '/index', name: 'index', component: index },    
    { path: '/mbti', name: 'mbti', component: mbti },    
    { path: '/ddi', name: 'ddi', component: ddi },    
    { path: '/glpa', name: 'glpa', component: glpa },
    { path: '/vda', name: 'vda', component: vda },
    { path: '/btr', name: 'btr', component: btr },
    { path: '/end', name: 'end', component: end },
    { path: '*', redirect: '/index' }
  ]
})
