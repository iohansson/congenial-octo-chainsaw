import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import quizStoreMixin from './quizStoreMixin';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    ...quizStoreMixin.state,
  },
  mutations: {
    ...quizStoreMixin.mutations,
  },
  actions: {
    ...quizStoreMixin.actions,
  },
  getters: {
    ...quizStoreMixin.getters,
  },
  strict: debug,
  plugins: [createPersistedState()],
});
