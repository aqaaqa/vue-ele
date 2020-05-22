import { saveObjArr, getObjArr, saveSession, getSession } from '@/utils/role'
import {navlist} from '@/api/list'
const state = {
  oldList: navlist,
  newList: []
}

const mutations = {
  SET_OLDLIST: (state, oldList) => {
    state.oldList = oldList
  },
  SET_NEWLIST: (state, newList) => {
    state.newList = newList
  },
  
}

const actions = {
  setOld({commit}, item) {
    console.log(12233)
    commit('SET_OLDLIST', item)
  },
  setNew({commit}, item) {
    commit('SET_NEWLIST', item)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}