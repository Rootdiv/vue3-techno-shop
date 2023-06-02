import { API_URI } from '@/const';
import axios from 'axios';

const state = {
  productsCountList: [],
  cartProducts: [],
  cartIdList: [],
  status: 'loading',
};

const getters = {
  addedCart: state => id => state.cartIdList.includes(id),

  cartItemCount: state => id => state.productsCountList.find(product => product.id === id),

  cartTotalPrice: state => state.productsCountList.reduce((total, product) => total + product.price * product.count, 0),

  cartTotalCount: state => state.productsCountList.reduce((total, product) => total + product.count, 0),
};

const mutations = {
  setStatus(state, load) {
    state.status = load;
  },

  pushToCart(state, payload) {
    state.productsCountList.push({ ...payload });
    state.cartIdList.push(payload.id);
  },

  setCart(state, payload) {
    state.productsCountList = [{ ...payload }];
  },

  setCartProducts(state, products) {
    state.cartProducts = products;
  },

  incrementItemCount(state, id) {
    const cartItem = state.productsCountList.find(item => item.id === id);
    cartItem.count++;
  },

  decrementItemCount(state, id) {
    const cartItem = state.productsCountList.find(item => item.id === id);
    if (cartItem.count > 1) {
      cartItem.count--;
    }
  },

  removeCartItem(state, id) {
    const newProductsCountList = state.productsCountList.filter(item => item.id !== id);
    const newCartIdList = state.cartIdList.filter(itemId => itemId !== id);
    state.productsCountList = newProductsCountList;
    state.cartIdList = newCartIdList;
  },

  updateCartProducts(state, newCartProducts) {
    state.cartProducts = newCartProducts;
  },
};

const actions = {
  fetchGoodsList({ state, commit }) {
    if (!state.cartIdList.length) return;
    try {
      commit('setStatus', 'loading');
      axios.get(`${API_URI}/api/goods?list=${state.cartIdList}`).then(response => {
        commit('setCartProducts', response.data);
        commit('setStatus', 'success');
      });
    } catch (err) {
      console.error('Произошла ошибка:', err.message);
      commit('setStatus', 'error');
    }
  },

  addToCart({ state, commit }, payload) {
    const findItem = state.productsCountList.find(item => item.id === payload.id);
    if (findItem && payload.count === 1) {
      commit('removeCartItem', findItem.id);
    } else if (findItem && payload.count > 1) {
      commit('setCart', payload);
    } else {
      commit('pushToCart', payload);
    }
  },

  removeItem({ commit }, id) {
    const newCartProducts = state.cartProducts.filter(item => item.id !== id);
    commit('updateCartProducts', newCartProducts);
    commit('removeCartItem', id);
  },
};

export const cart = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
