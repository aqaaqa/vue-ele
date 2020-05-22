import { login, logout, roleList, activateBase } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { saveObjArr, getObjArr, removeSession, removeObjArr } from '@/utils/role'
import { resetRouter } from '@/router'
import layout from '@/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)



const state = {
  token: getToken(),
  name: getObjArr('name2'),
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  role: getObjArr()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ registerPhone: username.trim(), captcha: password}).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.channelId)
        commit('SET_NAME', data.channelName)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' )
        setToken(data.channelId)
        saveObjArr('name2', data.channelName)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        removeObjArr('router')
        removeSession('pageId')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  postError({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      removeToken()
      removeObjArr('router')
      removeSession('pageId')
      removeSession('channd2'),
      removeSession('channd3')
      resetRouter()
      resolve()
      
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

