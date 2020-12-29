import { AuthHeader } from '../services/StorageService'
import UserService from '../services/UserService'
import router from '../router/index'

const state = {
  user : null
}

const getters = {
  user(state) {
    return state.user
  }
}

const mutations = {
  SET_USER (state, data) {
    state.user = data
    AuthHeader.saveAuthData(data)
  }
}

const actions = {
  fetchUser ({ commit }, data) {
    if (data) {
      const data_ = {
        token: data.accessToken,
        user: data.user
      }
      commit('SET_USER', data_)
      router.replace('/')
    } else {
      commit("SET_USER", null)
    }
  },
  async fetchOAuth2User ({ commit }, token) {
    if (token) {
      await UserService.getUserDetails(token).then(
        (data) => {
          const data_ = {
            token: token,
            user: data
          }
          commit('SET_USER', data_)
          router.replace('/')
        }
      ).catch(e => {
        console.log(e)
        commit("SET_USER", null)
      })
    } else {
      commit("SET_USER", null)
    }
  },
  logout ({commit}) {
    console.log('remove authdata')
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