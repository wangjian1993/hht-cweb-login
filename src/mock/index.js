import Mock from 'mockjs'
import loginAPI from './login'
// import deviceAPI from './device'

// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// 设备相关
// Mock.mock(/\/device\/list/, 'get', deviceAPI.getList)

export default Mock
