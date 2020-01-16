// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 样式
import Multiselect from 'vue-multiselect' // 使用一个多选组件
import vueWaves from './directive/waves'
import 'vue-multiselect/dist/vue-multiselect.min.css' // 多选框组件css
import 'base/Icon-svg/index'
import 'assets/iconfont/iconfont'
import Sticky from 'base/sticky/sticky'
import errLog from 'store/errLog' // error log组件
import './mock/index.js'
import VDistpicker from 'v-distpicker' // 省市区三级联动
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
Vue.use(ElementUI)
Vue.use(vueWaves)

Vue.component('Sticky', Sticky)
Vue.component('multiselect', Multiselect)
Vue.component('v-distpicker', VDistpicker)

Vue.config.productionTip = false
// 权限判断
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
/* store.dispatch('GenerateRouters', {roles: ['admin']}).then(() => { // 生成可访问的路由表
  store.dispatch('getSelect') // 获取一些公共数据
  router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
 // next({...to}) // hack方法 确保addRoutes已完成
}) */
// 注册全局进度条
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启progress
  if (store.getters.token) {
    if (to.path === 'login') {
      next({path: '/devices/list'})
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          const data = res.data.lists[0]
          let arry = []
          arry.push(data.role)
          const roles = arry
          store.dispatch('GenerateRouters', {roles}).then(() => { // 生成可访问的路由表
            // store.dispatch('getSelect') // 获取一些公共数据
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({...to}) // hack方法 确保addRoutes已完成
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next()删除下方权限判断↓
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()
        } else {
          next({path: '/401', query: {noGoBack: true}})
        }
        // 可删 ↑
      }
    }
  } else {
    // window.location.href = 'http://hht.itinga.cn'
    console.log('whiteList.indexOf(to.path) !== -1')
    if (whiteList.indexOf(to.path) !== -1) { // 在免登陆白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps: history 模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
Vue.config.productionTip = false

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    console.log(err, window.location.href)
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
