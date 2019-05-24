import console from '../router/routers/pages'

const consoleMenuList = [
  {
    name: 'user',
    text: '用户管理',
    icon: 'md-analytics',
    children: [
      {
        name: 'adminManager',
        text: '管理员管理'
      },
      {
        name: 'normalUserManager',
        text: '用 户 管 理'
      }
    ]
  },
  {
    name: 'goods',
    text: '商品管理',
    icon: 'md-bookmark',
    children: [
      {
        name: 'goodsSort',
        text: '商品分类'
      },
      {
        name: 'goodsList',
        text: '商品列表'
      }
    ]
  },
  {
    name: 'order',
    text: '订单管理',
    icon: 'md-bookmarks',
    children: [
      {
        name: 'orderList',
        text: '订单列表'
      }
    ]
  },
  {
    name: 'content',
    text: '内容管理',
    icon: 'md-bookmarks',
    children: [
      {
        name: 'rewardContent',
        text: '打赏金额'
      },
      {
        name: 'dailyContent',
        text: '每日一课'
      },
      {
        name: 'beautyContent',
        text: '美妆搭配'
      },
      {
        name: 'talentContent',
        text: '天生有才'
      },
      {
        name: 'answersContent',
        text: '我问你答'
      },
      {
        name: 'trendsContent',
        text: '动态管理'
      }
    ]
  },
  {
    name: 'business',
    text: '交易管理',
    icon: 'md-bookmarks',
    children: [
      {
        name: 'businessList',
        text: '交易列表'
      }
    ]
  },
  {
    name: 'parttime',
    text: '兼职管理',
    icon: 'md-bookmarks',
    children: [
      {
        name: 'parttimeList',
        text: '兼职列表'
      }
    ]
  },
  {
    name: 'base',
    text: '基础配置',
    icon: 'md-bookmarks',
    children: [
      {
        name: 'bannerList',
        text: 'Banner列表'
      },
      {
        name: 'schoolList',
        text: '学校列表'
      },
      {
        name: 'areaList',
        text: '地区列表'
      },
      {
        name: 'couponList',
        text: '优惠券管理'
      },
      {
        name: 'signSetting',
        text: '签到管理'
      }
    ]
  },
  {
    name: 'feedback',
    text: '用户反馈',
    icon: 'md-bookmarks',
    children: [
      {
        name: 'feedbackList',
        text: '反馈列表'
      }
    ]
  },
  {
    name: 'system',
    text: '系统管理',
    icon: 'md-bookmarks',
    children: [
      {
        name: 'logList',
        text: '日志列表'
      }
    ]
  }
  // {
  //   name: 'authority',
  //   text: '权限管理',
  //   icon: 'md-person',
  //   children: [
  //     {
  //       name: 'admin',
  //       text: '管理员'
  //     },
  //     {
  //       name: 'usergroup',
  //       text: '用户组'
  //     },
  //     {
  //       name: 'addusergroup',
  //       text: '新增用户组'
  //     }
  //   ]
  // }
]

export default {
  getAllModularMenu () {
    var consoleMenu = {
      path: console.path,
      text: console.text,
      children: []
    }
    for (let index = 0; index < console.children.length; index++) {
      const menuRouter = console.children[index]
      var sMenu = {
        path: menuRouter.path,
        text: menuRouter.text
      }
      if (sMenu.path !== '/' && sMenu.path.indexOf('/') === -1) {
        consoleMenu.children.push(sMenu)
      }
    }
    return [consoleMenu]
  },
  getHasPermissionMenuList (menuList) {
    // debugger
    var permissionMenuList = []
    for (let i = 0; i < menuList.length; i++) {
      var menu = menuList[i]
      var newMenu = {
        name: menu.name,
        text: menu.text,
        icon: menu.icon,
        children: []
      }
      var children = menu.children
      var hasMenu = false

      for (let index = 0; index < children.length; index++) {
        const subMenu = children[index]
        // if (this.checkPermission(subMenu.name)) {
        hasMenu = true
        newMenu.children.push(subMenu)
        // }
      }
      if (hasMenu) {
        permissionMenuList.push(newMenu)
      }
    }
    return permissionMenuList
  },
  checkPermission (pathName) {
    var havePermission = false
    var userJSONStr = localStorage.adminUser
    var permission = []
    if (userJSONStr != null && userJSONStr !== '') {
      var adminUser = JSON.parse(userJSONStr)
      var pStr = adminUser.permission
      if (pStr != null && pStr !== '') {
        permission = JSON.parse(pStr)
      }
    }

    for (let i = 0; i < permission.length; i++) {
      const p = permission[i]
      if (p === pathName) {
        havePermission = true
      }
    }

    return havePermission
  },
  getConsoleMenuList () {
    return this.getHasPermissionMenuList(consoleMenuList)
  }
}
