<template>
  <div class="login" @keydown.enter="handleSubmit">
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
    </vue-particles>
    <div class="contentdivs">
      <div class="login-box">
        <div class="login-con">
          <div class="content-login">
            <p>
              <a href="https://www.xxx.com">
                <img class="logo-box" src="../assets/logo.png" alt="">
              </a>
            </p>
            <span class="login-title">账号登录</span>
            <div class="form-con">
              <Form ref="loginForm" :model="form" :rules="rules">
                <FormItem prop="account">
                  <!-- <effect-input v-model="form.account" type="jiro" label="用户名" class="inputdiv"></effect-input> -->
                  <i-input v-model="form.account" size="large" placeholder="请输入用户名"/>
                </FormItem>
                <FormItem prop="password">
                  <!-- <effect-input v-model="form.password" type="jiro" label="密码" class="inputdiv"></effect-input> -->
                  <i-input type="password" v-model="form.password" size="large" placeholder="6~32位密码"/>
                </FormItem>
                <FormItem>
                  <Button :loading="loading" @click="handleSubmit" type="primary" size="large" long>账户登录</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="copyright">
        2016-{{copyRightYear}} © Govlan.com
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      copyRightYear: new Date().getFullYear(),
      token: '',
      loading: false,
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 2,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit: function () {
      const that = this
      that.loading = true
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http.post('/admin/v1/token', that.form).then(res => {
            if (res.status === 200) {
              console.log(res.data.token)
              sessionStorage.setItem('token', res.data.token)
              that.token = res.data.token
              that.$auth.saveToken(that.token)
              that.$router.push({ path: '/pages/adminManager' })
              // that.getLoginedAdminUserInfo()
              that.loading = false
            } else {
              this.$Message.info(res.data)
              that.loading = false
            }
          })
        } else {
          that.loading = false
        }
      })
    },
    getLoginedAdminUserInfo () {
      // const that = this
      this.$http.get('/admin/v1/user').then((res) => {
        if (res.status === 200) {
          var adminUser = res.data
          console.log(adminUser)
          if (adminUser) {
            localStorage.adminUser = JSON.stringify(adminUser)
          }
        }
      })
    }
  }
}
</script>
<style>
.contentdivs {
  position:absolute;
  left:1px;
  top:160px;
  /* background:#0fF; */
  width:100%;
  height:300px
}
.inputdiv {
  /* height: 30px; */
  margin-top: 30px;
}
.login {
  width: calc(100vw);
  /* height: calc(100vh); */
  background: linear-gradient(to bottom right, #47518b, #343a66);
}
.copyright {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 52px;
  color: #7980b2;
  font-size: 13px;
}

.login-box {
  width: 100%;
  height: 100%;
  /* background: url("http://image.govlan.com/bg-login.png") top center no-repeat; */
  padding-top: 80px;
}
.login-con {
  width: 440px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.content-login {
  width: 440px;
  padding: 60px;
  display: block;
  background: url("./../assets/login6.png") top center no-repeat;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
  float: left;
  padding-bottom: 1px;
}
p img {
  width: 231px;
  height: 35px;
  background-color: #ffffff;
}
.login-title {
  margin-top: 24px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  color: #666;
}
.login-header {
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  padding: 30px 0;
}
.form-con {
  padding: 10px 0 0;
}
.login-tip {
  font-size: 10px;
  text-align: center;
  color: #c3c3c3;
}
.logo-box {
  background-color: #ffffff;
  /* width: 338px;
  height: 48px; */
}
</style>
