import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    src: '',
    token: ''
  },
  getters: {
    updateToken(state) {
      return state.token
    }
  },
  mutations: {
    imgData(state, data) {
      state.src = data
    },
    getToken(state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
