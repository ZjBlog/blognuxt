import Vue from 'vue'
import Vuex from 'vuex'
const hash = require('object-hash')
Vue.use(Vuex)
const store = () => new Vuex.Store({
  state: {
    counter: 0,
    authUser: null,
    index: 0,
    detail: false
  },
  // 提交 mutation 的另一种方式是直接使用包含 type 属性的对象
  // store.commit({
  //    type: 'increment',
  //    amount: 10
  //  })
  // store.commit('increment', 10) 触发
  // 只能同步方法
  mutations: {
    detail (state) {
      state.detail = true
    },
    indexChange (state, index) {
      state.index = index
    },
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
    detail ({commit}) {
      commit('detail')
    },
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
      if (req.myBlog && req.myBlog.authUser) {
        commit('SET_USER', req.myBlog.authUser)
      }
    },
    async login ({ commit }, { username, password }) {
      try {
        password = hash.MD5(password)
        const { data } = await this.$axios.post('/user/login', { username, password })
        commit('SET_USER', data.username)
      } catch (error) {
        throw error
      }
    },
    async logout ({ commit }) {
      await this.$axios.post('/user/logout')
      commit('SET_USER', null)
    }
  }
})
export default store
