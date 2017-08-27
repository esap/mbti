import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function include(v) {
    return {path:'/'+v,name: v,component:resolve=>require(["@/components/"+v],resolve)}
}

export default new Router({
  routes: [  
    include("index"),
    include("mbti"),
    include("ddi"),
    include("glpa"),
    include("vda"),
    include("btr"),
    include("end"),
    { path: '*', redirect: '/index' }
  ]
})
