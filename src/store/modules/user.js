import {loginByEmail, getInfo, logout} from 'api/login'
// import {Message} from 'element-ui'
import Cookies from 'js-cookie'

const user = {
  state: {
    user: '',
    status: '',
    email: '',
    code: '',
    uid: undefined,
    auth_type: '',
    token: Cookies.get('Admin-Token'),
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: '我是超级管理员',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.satus = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = ''
    }
  },

  actions: {
    // 邮箱登录
    LoginByEmail({commit}, userInfo) {
      const email = userInfo.email.trim()
      return new Promise((resolve, reject) => {
        loginByEmail(email, userInfo.password).then(response => {
          const data = response.data.lists[0]
          console.log(response.data)
          Cookies.set('Admin-Token', data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_EMAIL', email)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          console.log(response)
          if (response.data.ret === 0) {
            const data = response.data.lists[0]
            let arry = []
            arry.push(data.role)
            commit('SET_ROLES', arry)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_INTRODUCTION', data.introduction)
            resolve(response)
          } else {
            // Message({
            //   message: response.data.msg,
            //   type: 'error',
            //   duration: 5 * 1000
            // })
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Cookies.remove('Admin-Token')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Cookies.remove('Admin-Token')
        resolve()
      })
    },
    // 动态修改权限
    ChangeRole({commit}, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role])
        commit('SET_TOKEN', role)
        Cookies.set('Admin-Token', role)
        resolve()
      })
    }
  }
}

export default user
