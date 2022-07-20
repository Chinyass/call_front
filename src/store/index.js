import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userdata : JSON.parse(localStorage.getItem('user')) || {}
  },
  getters: {
    USERDATA: state => {
      return state.userdata;
    },
  },
  mutations: {
    SET_USERDATA: (state, payload) => {
      state.userdata = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
