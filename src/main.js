// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import locale from 'iview/dist/locale/zh-CN'
import 'iview/dist/styles/iview.css'
import './assets/css/common.css'
import auth from './utils/auth'
import axios from 'axios'
import animated from 'animate.css'
import VueParticles from 'vue-particles'
import EffectInput from 'effect-input'
import 'effect-input/dist/index.css'

Vue.use(EffectInput)
Vue.use(VueParticles)
Vue.use(animated)
Vue.use(iView, {locale})

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://xxxx.com:80/'
  // axios.defaults.headers.common['Authorization'] = auth.get().token
}
axios.interceptors.request.use((config) => {
  // console.log(config)
  // iView.LoadingBar.start()
  // 需要登录
  // debugger
  if (config.status === 401) {
    router.push('/login')
  }
  if (config.method === 'get') {
    if (config.params === undefined) {
      config.params = {}
    }
  }
  if (config.method === 'post') {
    if (config.data === undefined) {
      config.data = {}
    }
  }
  if (auth.get().token != null) {
    config.headers = {
      'Content-Type': 'application/json',
      'Authorization': auth.get().token
    }
    config.auth = {
      username: auth.get().token
    }
  } else {
    config.headers = {
      'Content-Type': 'application/json'
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// response
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (process.env.NODE_ENV === 'development') {
  // consolFe.log(response)
  }
  console.log(response)
  iView.LoadingBar.finish()
  return response
}, function (error) {
  // Do something with response error
  var response = error.response
  // 需要登录
  if (response.status === 401) {
    router.push('/login')
  } else if (response.status === 400) {
    // iView.Message.error('服务器错误')
    if (response.data != null) {
      var errorStr = response.data.error
      if (errorStr != null) {
        iView.Message.error(errorStr)
      }
    }
  }
  iView.LoadingBar.finish()
  return error
})
Vue.prototype.$http = axios
Vue.prototype.$auth = auth
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
