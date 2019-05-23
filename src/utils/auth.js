import storage from './helpers/storageLite'

const TOKEN = 'token'
const USERNAME = 'userName'
const NICKNAME = 'nickName'

export default {
  name: 'auth',

  /**
   * 获取 auth，返回：管理员信息和 token
   * @return {Object}
   */
  get () {
    return {
      [TOKEN]: storage.get(TOKEN),
      [USERNAME]: storage.get(USERNAME),
      [NICKNAME]: storage.get(NICKNAME)
    }
  },

  /**
   * 登录
   * @param {string} manager 登录管理员
   * @param {string} token 登录 token
   */
  login (token, userName, nickName) {
    storage.set(TOKEN, token)
    storage.set(USERNAME, userName)
    storage.set(NICKNAME, nickName)
  },

  /**
   * 保存登录成功的Token
   * @param {string} token
   */
  saveToken (token) {
    storage.set(TOKEN, token)
  },

  /**
   * 登出
   */
  logout () {
    storage.remove(TOKEN)
    storage.remove(USERNAME)
    storage.remove(NICKNAME)
    storage.remove('adminUser')
  },

  /**
   * 是否已登录
   * @return {boolean}
   */
  loggedIn () {
    return !!storage.get(TOKEN)
  }
}
