import Vue from 'vue'
import VueRouter from 'vue-router'
import mapIndex from '@/views/map/map-index'
import mapBack from '@/views/back/map-back'
//安装路由插件
Vue.use(VueRouter)
//创建VueRouter 对象
  const routes = [
{
  path:'/map',
  component:mapIndex
},
{
  path:'/back',
  component:mapBack
},

  ]
const router = new VueRouter({
  routes
})
export default router
