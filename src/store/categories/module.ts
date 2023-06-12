import { API_URI } from '@/const';
import axios from 'axios';
import { Categories, ICategoriesState } from './types';
import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '@/store/types';

const state: ICategoriesState = {
  categories: {
    notebook: '',
    smartphone: '',
    smartwatch: '',
    tablets: '',
    monoblok: '',
    smart: '',
    monitor: '',
    ebook: '',
  },
};

const mutations: MutationTree<ICategoriesState> = {
  setCategory(state, categories: Categories) {
    state.categories = categories;
  },
};

const actions: ActionTree<ICategoriesState, RootState> = {
  fetchCategory({ commit }) {
    axios
      .get<Categories>(`${API_URI}/api/category`)
      .then(response => {
        commit('setCategory', response.data);
      })
      .catch(err => {
        console.error('Произошла ошибка:', err.message);
      });
  },
};

export const categoriesModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};
