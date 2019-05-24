<template>
  <div class="layout">
    <Menu class="header" :active-name="activeName" mode="horizontal" theme="dark" @on-select="handleSelect">
      <a href=""><img class="header-logo" src="../assets/logo.png" alt="为蓝"/></a>
      <!-- <a href=""><span class="header-logo">华泰电气官网管理中心</span></a> -->
      <div class="header-aside">
        <span>欢迎您！{{adminUser.nick_name}}</span>
        <a class="logout-btn" @click="logout">退出登录</a>
        <a class="website-home-btn" href="">网站首页</a>
      </div>
    </Menu>
    <div class="layout-content">
      <div class="topdiv">
        <vue-particles
          color="#dedede"
          :particleOpacity="0.7"
          :particlesNumber="100"
          shapeType="circle"
          :particleSize="4"
          linesColor="#dedede"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="5"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        >
        </vue-particles>
      </div>
    <div class="contentdiv">
      <router-view/>
    </div>
  </div>
  </div>
</template>

<style>
.topdiv {
 height:calc(100vh - 60px);
}
.contentdiv {
    position:absolute;
    left:1px;
    top:60px;
    backgroun:#00000000;
    width:100%;
    height:calc(100vh - 60px);
 }
.layout {
  background: #00000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.msg_cell_box {
  display: flex;
  flex-direction: row;
  text-align: left;
  line-height: 20px;
  align-items: center;
}
.header-logo {
  width: auto;
  height: 25px;
  /* background: #5b6270; */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  line-height: 30px;
  font-size: 20px;
  color: #ffffff;
}

.header-menu {
  width: auto;
  float: left;
  padding-left: 60px;
  font-weight: bold;
}

.header-aside {
  float: right;
  margin: 0 30px 0 0;
  position: relative;
  color: #fff;
  font-size: 14px;
  text-align: center;
}

.td-appfont {
  background-color: #ffffff;
  width: 18px;
  height: 18px;
  line-height: 18px !important;
  font-size: 14px;
  border-radius: 9px;
}

.layout-content {
  height: 100px;
  background-color: #00000000;
  overflow: hidden;
  flex: 1;
  display: flex;
  display: -webkit-flex;
  flex-flow: column;
  -ms-flex-flow: column;
  -webkit-flex-flow: column;
}

.header {
  min-width: 780px;
  z-index: 22 !important;
  background-color: #2b83f9 !important;
  background-image: linear-gradient(
    143deg,
    #2945cb 20%,
    #2b83f9 81%,
    #3a9dff
  ) !important;
  height: 60px !important;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active {
  color: #fff;
  height: 60px;
  border-bottom: 4px solid #50e3c1;
}

.website-home-btn {
  margin-left: 8px;
  color: #FFFFFF;
}

.logout-btn {
  margin-left: 8px;
  color: #FFFFFF;
}

</style>

<script>
export default {
  data () {
    return {
      activeName: 'synthesize',
      menuList: [
        {
          name: 'synthesize',
          text: 'Item 1',
          icon: 'ios-keypad'
        },
        {
          name: 'monitor',
          text: 'Item 2',
          icon: 'ios-pulse-strong'
        }
      ],
      adminUser: {
        nick_name: ''
      }
    }
  },
  mounted () {
    console.log(this.$route.path)
    var localAdminUser = localStorage.adminUser
    if (localAdminUser) {
      this.adminUser = JSON.parse(localAdminUser)
    }
    this.updateActiveName(this.$route)
  },
  watch: {
    '$route': function (route) {
      console.log(route.path)
      this.updateActiveName(route)
    }
  },
  methods: {
    handleSelect (name) {
      this.$router.push({'path': '/' + name})
    },
    updateActiveName (route) {
      const path = route ? route.path : this.$route.path
      const pathArray = path.split('/')
      var activeName = pathArray[1]
      this.activeName = activeName
    },
    logout () {
      this.$auth.logout()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
