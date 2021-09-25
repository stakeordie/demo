import { createStore } from 'vuex';
import { counter } from '@/contracts';

const store = createStore({
  state: {
    count: undefined,
    loading: false
  },
  mutations: {
    // :(
    updateCount: (state, value) => state.count = value,
    updateLoading: (state, value) =>  state.loading = value
  },
  actions: {
    async loadCount({ commit }) {
      commit('updateLoading', true);
      const res = await counter.getCount();
      commit('updateCount', res.count)
      commit('updateLoading', false);
    }
  }
})

export default store;