import fetch from 'utils/fetch'

export function loginByEmail(email, password) {
  let form = new FormData()
  form.append('username', email)
  form.append('password', password)
  return fetch({
    //  url: '/login/loginbyemail',
    url: '/api/adminlogin',
    // url: '/admin/login',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: form
  })
}
export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}
export function getInfo(token) {
  return fetch({
    // url: '/user/info',
    url: '/api/user/info',
    method: 'get',
    params: {token}
  })
}
