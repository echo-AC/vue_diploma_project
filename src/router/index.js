import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
    /* 重定向 这里重定向要定到login , 但是我们先定到home */
    {path:'/',redirect:'/1login2'},
    /* 登录 */
    {
      path:'/login',component:()=>import('../components/login/Login')
    },
    {
      path:'/1login2',component:()=>import('../components/login/Login2')
    },
    /* home以及子组件 */
    {
    path: '/home',
    name: 'Home',
    component: ()=>import('../views/Home'),
    redirect:'/home/data',
    children:[
      /* 数据分析 */
      {
        path:'/home/analysis',
        component:()=>import('../views/data_analysis/Analytics')
      },
      /* 用户页面 */
      {
        path:'/home/user',
        component:()=>import('../views/User_Center/User')
      },
      /* 管理员页面 */
      {
        path:'/home/administartor',
        component:()=>import('../views/User_Center/Administrator'),
        redirect:'/administartor/myhome',
        children:[
          {
            path:'/administartor/myhome',
            component:()=>import('../views/User_Center/MyHome'),
          },
          {
            path:'/administartor/unfinished',
            component:()=>import('../views/User_Center/Unfinished'),
          },
          {
            path:'/administartor/finished',
            component:()=>import('../views/User_Center/Finished')
          }
        ]
      },
      /* 企业排污 */
      {
        path:'/home/data',
        component:()=>import('../views/Enterprise_sewage/Data'),
        // redirect:'/home/data/echarts',
        children:[
          {path:'/home/data/echarts',component:()=>import('../components/data-show/Echarts')},
          {path:'/home/data/test2',component:()=>import('../components/data-show/Test2')}
        ]
      },
      {
        path:'/home/collect',
        component:()=>import('../views/Enterprise_sewage/Collect')
      },
      {
        path:'/home/search',
        component:()=>import('../views/Enterprise_sewage/Search')
      },
    ]
    }
  
]

const router = new VueRouter({
  routes
})


//添加路由守卫
// router.beforeEach((to,from,next)=>{
//   if(to.path === '/1login2')return next()

//   const token = window.sessionStorage.getItem('token')
//   if(!token){
//   return next('/1login2') 
//   }
//   next()
  
// })

export default router
