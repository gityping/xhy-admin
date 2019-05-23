<template>
  <div class="layout-content-row">
    <div class="layout-content-menu scrollbar">
      <Menu ref="menu" :active-name="activeName" width="auto" :open-names="openNames">
        <Submenu :name="submenu.name" v-for="submenu in menuList" :key="submenu.name">
          <template slot="title">
              <Icon :type="submenu.icon"></Icon>
              <span style="font-weight: 700;font-size: 12px;">{{submenu.text}}</span>
          </template>
          <a v-for="item in submenu.children" :key="item.name" :href="getSelect(item.name)">
            <Menu-item :name="item.name">{{item.text}}</Menu-item>
          </a>
        </Submenu>
      </Menu>
    </div>
    <div class="layout-content-box">
      <div class="layout-content-main">
        <router-view/>
      </div>
      <div class="layout-copy">
        <span style="float: left; padding: ">&copy; {{copyRightYear}} 版权所有</span> <span style="float: right;">当前版本v1.0.0</span>
      </div>
    </div>
  </div>
</template>

<script>

import routerUtils from '../../utils/router-utils.js'

export default {
  data () {
    return {
      activeName: '',
      openNames: [],
      menuList: [],
      copyRightYear: (new Date()).getFullYear()
    }
  },
  created () {
    this.menuList = routerUtils.getConsoleMenuList()
    if (this.menuList != null && this.menuList.length > 0) {
      var firstMenu = this.menuList[0]
      if (firstMenu != null) {
        this.openNames = [firstMenu.name]
        var firstSubMenu = firstMenu.children[0]
        this.activeName = firstSubMenu.name
      }
    }
  },
  mounted () {
    this.updateActiveName(this.$route)
  },
  watch: {
    '$route': function (route) {
      this.updateActiveName(route)
    }
  },
  methods: {
    getSelect (name) {
      return '#/pages/' + name
    },
    updateActiveName (route) {
      const path = route ? route.path : this.$route.path
      const pathArray = path.split('/')
      var activeName = pathArray[2]
      this.activeName = activeName
      for (var index in this.menuList) {
        var menu = this.menuList[index]
        var children = menu.children
        for (var child in children) {
          if (children[child].name === activeName) {
            var openNames = [menu.name]
            this.openNames = openNames
            this.$nextTick(function () {
              this.$refs.menu.updateActiveName()
              this.$refs.menu.updateOpened()
            })
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .ivu-menu {
    display: block;
    margin: 0;
    padding: 0;
    outline: 0;
    list-style: none;
    color: #515a6e;
    font-size: 14px;
    position: relative;
    z-index: 99 !important
  }
</style>
