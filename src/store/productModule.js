import { API_URI } from '@/const';
import axios from 'axios';

const state = {
  id: '',
  title: '',
  price: 0,
  display: 0,
  color: '',
  description: [],
  characteristic: {},
  category: '',
  images: {},
  status: 'loading',
};

const mutations = {
  setId(state, id) {
    state.id = id;
  },
  setTitle(state, title) {
    state.title = title;
  },
  setPrice(state, price) {
    state.price = price;
  },
  setDisplay(state, display) {
    state.display = display;
  },
  setColor(state, color) {
    state.color = color;
  },
  setDescription(state, description) {
    state.description = description;
  },
  setCharacteristic(state, characteristic) {
    state.characteristic = characteristic;
  },
  setCategory(state, category) {
    state.category = category;
  },
  setImages(state, images) {
    state.images = images;
  },
  setStatus(state, load) {
    state.status = load;
  },
};

const actions = {
  fetchProduct({ commit }, id) {
    try {
      commit('setStatus', 'loading');
      axios.get(`${API_URI}/api/goods/${id}`).then(response => {
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
      });
    } catch (err) {
      console.error('Произошла ошибка:', err.message);
      commit('setStatus', 'error');
    }
  },
};

export const product = {
  namespaced: true,
  state,
  actions,
  mutations,
};
