import { API_URI } from '@/const';
import axios from 'axios';
import { Goods, IGoodsState } from './types';
import { Product, RootState, Status } from '@/store/types';
import { ActionTree, MutationTree } from 'vuex';

const state: IGoodsState = {
  items: [],
  page: 1,
  pages: 1,
  status: Status.LOADING,
};

const mutations: MutationTree<IGoodsState> = {
  setStatus(state, load: Status) {
    state.status = load;
  },
  setGoods(state, items: Product[]) {
    state.items = items;
  },
  setPage(state, page: number) {
    state.page = page;
  },
  setPages(state, pages: number) {
    state.pages = pages;
  },
};

const actions: ActionTree<IGoodsState, RootState> = {
  fetchGoods({ commit }, param) {
    const queryParam = param ? `?${param}` : '';
    commit('setStatus', 'loading');
    axios
      .get<Goods>(`${API_URI}/api/goods${queryParam}`)
      .then(response => {
        commit('setPage', response.data.page);
        commit('setPages', response.data.pages);
        commit('setGoods', response.data.goods);
        commit('setStatus', 'success');
      })
      .catch(err => {
        console.error('Произошла ошибка:', err.message);
        commit('setStatus', 'error');
      });
  },
};

export const goodsModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};
