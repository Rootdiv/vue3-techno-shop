import { API_URI } from '@/const';
import axios from 'axios';
import { IRecommendedState } from './types';
import { Product, RootState, Status } from '@/store/types';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Goods } from '@/store/goods/types';

const state: IRecommendedState = {
  items: [],
  status: Status.LOADING,
};

const getters: GetterTree<IRecommendedState, RootState> = {
  recommendItems: state => (id: string) => state.items.filter(item => item.id !== id),
};

const mutations: MutationTree<IRecommendedState> = {
  setStatus(state, load: Status) {
    state.status = load;
  },
  setGoods(state, items: Product[]) {
    state.items = items;
  },
};

const actions: ActionTree<IRecommendedState, RootState> = {
  fetchRecommendGoods({ commit }, category: string) {
    commit('setStatus', 'loading');
    axios
      .get<Goods>(`${API_URI}/api/goods?category=${category}`)
      .then(response => {
        commit('setGoods', response.data.goods);
        commit('setStatus', 'success');
      })
      .catch(err => {
        console.error('Произошла ошибка:', err.message);
        commit('setStatus', 'error');
      });
  },
};

export const recommendedModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
