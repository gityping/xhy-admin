import console from '../router/routers/pages'

const consoleMenuList = [
  {
    name: 'home',
    text: '网站首页',
    icon: 'md-analytics',
    children: [
      {
        name: 'home',
        text: '网站首页'
      }
    ]
  },
  {
    name: 'home',
    text: '网站首页1',
    icon: 'md-bookmark',
    children: [
      {
        name: 'home1',
        text: '网站首页'
      }
    ]
  },
  {
    name: 'home',
    text: '网站首页',
    icon: 'md-bookmarks',
    children: [
      {
        name: 'home2',
        text: '网站首页'
      },
      {
        name: 'home3',
        text: '网站首页'
      }
    ]
  },
  {
    name: 'authority',
    text: '权限管理',
    icon: 'md-person',
    children: [
      {
        name: 'admin',
        text: '管理员'
      },
      {
        name: 'usergroup',
        text: '用户组'
      },
      {
        name: 'addusergroup',
        text: '新增用户组'
      }
    ]
  }
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
