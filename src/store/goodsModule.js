import { API_URI } from '@/const';
import axios from 'axios';

const state = {
  items: [],
  page: 1,
  pages: 1,
  status: 'loading',
};

const mutations = {
  setStatus(state, load) {
    state.status = load;
  },
  setGoods(state, items) {
    state.items = items;
  },
  setPage(state, page) {
    state.page = page;
  },
  setPages(state, pages) {
    state.pages = pages;
  },
};

const actions = {
  fetchGoods({ commit }, param) {
    const queryParam = param ? `?${param}` : '';
    try {
      commit('setStatus', 'loading');
      axios.get(`${API_URI}/api/goods${queryParam}`).then(response => {
        commit('setPage', response.data.page);
        commit('setPages', response.data.pages);
        commit('setGoods', response.data.goods);
        commit('setStatus', 'success');
      });
    } catch (err) {
      console.error('Произошла ошибка:', err.message);
      commit('setStatus', 'error');
    }
  },
};

export const goods = {
  namespaced: true,
  state,
  actions,
  mutations,
};
