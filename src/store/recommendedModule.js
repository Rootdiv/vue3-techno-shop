import { API_URI } from '@/const';
import axios from 'axios';

const state = {
  items: [],
  status: 'loading',
};

const getters = {
  recommendItems: state => id => state.items.filter(item => item.id !== id),
};

const mutations = {
  setStatus(state, load) {
    state.status = load;
  },
  setGoods(state, items) {
    state.items = items;
  },
};

const actions = {
  fetchRecommendGoods({ commit }, category) {
    try {
      commit('setStatus', 'loading');
      axios.get(`${API_URI}/api/goods?category=${category}`).then(response => {
        commit('setGoods', response.data.goods);
        commit('setStatus', 'success');
      });
    } catch (err) {
      console.error('Произошла ошибка:', err.message);
      commit('setStatus', 'error');
    }
  },
};

export const recommended = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
