import { API_URI } from '@/const';
import axios from 'axios';
import { IProductState } from './types';
import { Image, Product, RootState, Status } from '@/store/types';
import { ActionTree, MutationTree } from 'vuex';

const state: IProductState = {
  id: '',
  title: '',
  price: 0,
  display: 0,
  color: '',
  description: [],
  characteristic: {},
  category: '',
  categoryRus: '',
  images: {
    present: '',
    large: [],
    small: [],
  },
  status: Status.LOADING,
};

const mutations: MutationTree<IProductState> = {
  setId(state, id: string) {
    state.id = id;
  },
  setTitle(state, title: string) {
    state.title = title;
  },
  setPrice(state, price: number) {
    state.price = price;
  },
  setDisplay(state, display: number) {
    state.display = display;
  },
  setColor(state, color: string) {
    state.color = color;
  },
  setDescription(state, description: string[]) {
    state.description = description;
  },
  setCharacteristic(state, characteristic: object) {
    state.characteristic = characteristic;
  },
  setCategory(state, category: string) {
    state.category = category;
  },
  setImages(state, images: Image) {
    state.images = images;
  },
  setStatus(state, load: Status) {
    state.status = load;
  },
};

const actions: ActionTree<IProductState, RootState> = {
  fetchProduct({ commit }, id: string) {
    commit('setStatus', 'loading');
    axios
      .get<Product>(`${API_URI}/api/goods/${id}`)
      .then(response => {
        commit('setId', response.data.id);
        commit('setTitle', response.data.title);
        commit('setPrice', response.data.price);
        commit('setDisplay', response.data.display);
        commit('setColor', response.data.color);
        commit('setDescription', response.data.description);
        commit('setCharacteristic', response.data.characteristic);
        commit('setCategory', response.data.category);
        commit('setImages', response.data.images);
        commit('setStatus', 'success');
      })
      .catch(err => {
        console.error('Произошла ошибка:', err.message);
        commit('setStatus', 'error');
      });
  },
};

export const productModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};
