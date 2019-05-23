import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login'
import pages from './routers/pages'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/',
      name: 'root',
      component: () => import('@/components/root'),
      children: [
        {
          path: '/',
          component: () => import('@/components/index'),
          children: [
            {
              path: '/',
              redirect: 'pages'
            },
            pages
          ]
        },
        {
          path: 'login',
          component: () => import('@/components/login')
        }
      ]
    }
  ]
})
