import Cookies from 'js-cookie'

const TokenKey1 = 'vue_admin_template_token1'

export function getToken() {
  return Cookies.get(TokenKey1)
}

export function setToken(token) {
  return Cookies.set(TokenKey1, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey1)
}

export function letterArr() {
  var count1 = 0
  var change = []
  for (let i = 65; i < 91; i++) {
    change[count1] = String.fromCharCode(i)
    count1++
  }

  return change
}