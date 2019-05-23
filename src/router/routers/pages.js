export default {
  path: 'pages',
  name: 'pages',
  text: '网站管理',
  component: () => import('@/components/pages/index'),
  children: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: 'home',
      name: 'home',
      text: '网站首页',
      component: () => import('@/components/pages/home/home')
    },
    {
      path: 'home1',
      name: 'home1',
      text: '网站首页1',
      component: () => import('@/components/pages/pro/home1')
    },
    {
      path: 'home2',
      name: 'home2',
      text: '网站首页2',
      component: () => import('@/components/pages/pro/home2')
    },
    {
      path: 'home3',
      name: 'home3',
      text: '网站首页3',
      component: () => import('@/components/pages/pro/home3')
    }
  ],
  beforeEnter (to, from, next) {
    // var token = localStorage.token
    var token = true
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
}
