import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// layout
// import Layout from 'components/layout/layout'
// login
const Login = _import('login/index')
const hhtList = _import('login/hhtList')
// errPage
const Err404 = _import('error/404')
const Err401 = _import('error/401')
// excel
// const ExcelDownload = _import('excel/index')

Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {path: '/', component: hhtList, hidden: true, name: '首页'},
  {path: '/404', component: Err404, hidden: true},
  {path: '/401', component: Err401, hidden: true}
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
