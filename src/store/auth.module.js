import { AuthHeader } from '../services/StorageService'
import UserService from '../services/UserService'
import router from '../router/index'

const state = {
  token: null,
  user: null
}

const getters = {
  user(state) {
    return state.user
  },
  token(state) {
    return state.token
  }
}

const mutations = {
  SET_LOGGED_IN (state, val) {
    state.token = val
  },
  SET_USER (state, data) {
    state.user = data
  }
}

const actions = {
  fetchUser ({ commit }, data) {
    if (data) {
      console.log(data)
      commit('SET_LOGGED_IN', data.accessToken)
      commit('SET_USER', data.user)
      AuthHeader.saveAuthData(data)
    } else {
      commit('SET_LOGGED_IN', null)
      commit("SET_USER", null)
    }
  },
  async fetchOAuth2User ({ commit }, token) {
    if (token) {
      await UserService.getUserDetails(token).then(
        (data) => {
          console.log(data)
          commit('SET_LOGGED_IN', token)
          commit('SET_USER', data)
          AuthHeader.saveAuthData(data)
          router.replace('/')
        }
      ).catch(e => {
        console.log(e)
        commit('SET_LOGGED_IN', null)
        commit("SET_USER", null)
      })
    } else {
      commit('SET_LOGGED_IN', null)
      commit("SET_USER", null)
    }
  },
  logout ({commit}) {
    console.log('remove authdata');
    commit('SET_LOGGED_IN', null)
    commit("SET_USER", null)
    AuthHeader.removeAuthData()
    router.replace('/login')
  }
}

export default { 
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}