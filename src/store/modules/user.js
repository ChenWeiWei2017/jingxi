import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout } from '@/api/user'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 登录
  login({ commit }, loginData) {
    const { username, password } = loginData
    return new Promise((reslove, reject) => {
      login({ username: username.trim(), password }).then(data => {
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        reslove()
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit }) {
    return new Promise((reslove, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        reslove()
      }).catch(error => {
        reject(error)
      })
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
