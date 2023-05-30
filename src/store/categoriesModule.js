import { API_URI } from '@/const';
import axios from 'axios';

const state = {
  categories: {},
};

const mutations = {
  setCategory(state, categories) {
    state.categories = categories;
  },
};

const actions = {
  fetchCategory({ commit }) {
    try {
      axios.get(`${API_URI}/api/category`).then(response => {
        commit('setCategory', response.data);
      });
    } catch (err) {
      console.error('Произошла ошибка:', err.message);
    }
  },
};

export const categories = {
  namespaced: true,
  state,
  actions,
  mutations,
};
