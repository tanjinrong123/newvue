import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
const Login =()=> import('@/components/Login.vue')
const YC =()=> import('@/components/leagues/YC/YC.vue')
const XJ=()=> import('@/components/leagues/XJ/XJ.vue')
const HM=()=> import('@/components/leagues/XJ/clubs/hm/hm.vue')
const User=()=> import('@/components/User.vue')
const Home=()=> import('@/components/Home.vue')
const Register=()=> import('@/components/Register.vue')
const Search=()=> import('@/components/Search.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:Login},
    // {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
    {path:'/league/yc',component:YC},
    {path:'/league/xj',component:XJ},
    {path:'/league/xj/:id',component:HM},
    {path:'/user',component:User},
    {path:'/register',component:Register},
    {path:'/search',component:Search}
  ]
})
