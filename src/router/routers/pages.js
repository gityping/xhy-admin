export default {
  path: 'pages',
  name: 'pages',
  text: '网站管理',
  component: () => import('@/components/pages/index'),
  children: [
    {
      path: '/',
      redirect: 'adminManager'
    },
    {
      path: 'adminManager',
      name: 'adminManager',
      text: '管理员管理',
      component: () => import('@/components/pages/user/adminManager')
    },
    {
      path: 'normalUserManager',
      name: 'normalUserManager',
      text: '用户管理',
      component: () => import('@/components/pages/user/normalUserManager')
    },
    {
      path: 'goodsSort',
      name: 'goodsSort',
      text: '商品分类',
      component: () => import('@/components/pages/goods/goodsSort')
    },
    {
      path: 'goodsList',
      name: 'goodsList',
      text: '商品列表',
      component: () => import('@/components/pages/goods/goodsList')
    },
    {
      path: 'orderList',
      name: 'orderList',
      text: '订单列表',
      component: () => import('@/components/pages/order/orderList')
    },
    {
      path: 'rewardContent',
      name: 'rewardContent',
      text: '打赏金额',
      component: () => import('@/components/pages/content/rewardContent')
    },
    {
      path: 'dailyContent',
      name: 'dailyContent',
      text: '每日一课',
      component: () => import('@/components/pages/content/dailyContent')
    },
    {
      path: 'beautyContent',
      name: 'beautyContent',
      text: '美妆搭配',
      component: () => import('@/components/pages/content/beautyContent')
    },
    {
      path: 'talentContent',
      name: 'talentContent',
      text: '天生有才',
      component: () => import('@/components/pages/content/talentContent')
    },
    {
      path: 'answersContent',
      name: 'answersContent',
      text: '我问你答',
      component: () => import('@/components/pages/content/answersContent')
    },
    {
      path: 'trendsContent',
      name: 'trendsContent',
      text: '动态管理',
      component: () => import('@/components/pages/content/trendsContent')
    },
    {
      path: 'businessList',
      name: 'businessList',
      text: '交易管理',
      component: () => import('@/components/pages/business/businessList')
    },
    {
      path: 'parttimeList',
      name: 'parttimeList',
      text: '兼职管理',
      component: () => import('@/components/pages/parttime/parttimeList')
    },
    {
      path: 'bannerList',
      name: 'bannerList',
      text: 'Banner列表',
      component: () => import('@/components/pages/base/bannerList')
    },
    {
      path: 'schoolList',
      name: 'schoolList',
      text: '学校列表',
      component: () => import('@/components/pages/base/schoolList')
    },
    {
      path: 'areaList',
      name: 'areaList',
      text: '地区列表',
      component: () => import('@/components/pages/base/areaList')
    },
    {
      path: 'couponList',
      name: 'couponList',
      text: '优惠券管理',
      component: () => import('@/components/pages/base/couponList')
    },
    {
      path: 'signSetting',
      name: 'signSetting',
      text: '签到管理',
      component: () => import('@/components/pages/base/signSetting')
    },
    {
      path: 'feedbackList',
      name: 'feedbackList',
      text: '反馈列表',
      component: () => import('@/components/pages/feedback/feedbackList')
    },
    {
      path: 'logList',
      name: 'logList',
      text: '日志列表',
      component: () => import('@/components/pages/system/logList')
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
