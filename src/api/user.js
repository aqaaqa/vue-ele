import request from '@/utils/request'

/*
 * 登录
 * @param {*} data 
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/*
 * 退出
 * @param {*} data 
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
