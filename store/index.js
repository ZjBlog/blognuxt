import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
require('whatwg-fetch')
const store = () => new Vuex.Store({
  state: {
    counter: 0,
    authUser: null
  },
  // 提交 mutation 的另一种方式是直接使用包含 type 属性的对象
  // store.commit({
  //    type: 'increment',
  //    amount: 10
  //  })
  // store.commit('increment', 10) 触发
  // 只能同步方法
  mutations: {
    increment (state) {
      state.counter++
    },
    increment1 (state, n) {
      state.counter += n
    },
    increment2 (state, payload) {
      state.counter += payload.counter
    },
    SET_USER: function (state, user) {
      state.authUser = user
    }
  },
  // store.getters.doneTodos
  getters: {
    getCounter: state => {
      return state.counter * 2
    }
  },
  // 可以是异步方法
  // store.dispatch('increment')
  // store.dispatch('incrementAsync', {
  //    amount: 10
  //  })
  // 以对象形式分发
  // store.dispatch({
  //  type: 'incrementAsync',
  //  amount: 10
  // })
  actions: {
    increment (context) {
      context.commit('increment')
    },
    increment1 ({commit}) {
      commit('increment')
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    },
    async login ({ commit }, { username, password }) {
      try {
        const { data } = await axios.post('/api/login', { username, password })
        commit('SET_USER', data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
    async logout ({ commit }) {
      await axios.post('/api/logout')
      commit('SET_USER', null)
    }
  }
})
export default store
