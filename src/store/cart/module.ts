import { API_URI } from '@/const';
import axios from 'axios';
import { ICartState, ProductsCountList, SendGoodsType, sendCartType } from './types';
import { Product, RootState, Status } from '@/store/types';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

const state: ICartState = {
  productsCountList: [],
  cartProducts: [],
  cartIdList: [],
  status: Status.LOADING,
  agreeSend: false,
  sended: '',
};

const getters: GetterTree<ICartState, RootState> = {
  addedCart: state => (id: string) => state.cartIdList.includes(id),

  cartItemCount: state => (id: string) => state.productsCountList.find(product => product.id === id),

  cartTotalPrice: state => state.productsCountList.reduce((total, product) => total + product.price * product.count, 0),

  cartTotalCount: state => state.productsCountList.reduce((total, product) => total + product.count, 0),
};

const mutations: MutationTree<ICartState> = {
  setStatus(state, load: Status) {
    state.status = load;
  },

  pushToCart(state, payload: ProductsCountList) {
    state.productsCountList.push({ ...payload });
    state.cartIdList.push(payload.id);
  },

  setCart(state, payload: ProductsCountList) {
    state.productsCountList = [{ ...payload }];
  },

  setCartProducts(state, products: Product[]) {
    state.cartProducts = products;
  },

  incrementItemCount(state, id: string) {
    const cartItem = state.productsCountList.find(item => item.id === id);
    if (typeof cartItem !== 'undefined') {
      cartItem.count++;
    }
  },

  decrementItemCount(state, id: string) {
    const cartItem = state.productsCountList.find(item => item.id === id);
    if (typeof cartItem !== 'undefined' && cartItem.count > 1) {
      cartItem.count--;
    }
  },

  removeCartItem(state, id: string) {
    const newProductsCountList = state.productsCountList.filter(item => item.id !== id);
    const newCartIdList = state.cartIdList.filter(itemId => itemId !== id);
    state.productsCountList = newProductsCountList;
    state.cartIdList = newCartIdList;
  },

  updateCartProducts(state, newCartProducts: Product[]) {
    state.cartProducts = newCartProducts;
  },

  setAgree(state, value: boolean) {
    state.agreeSend = value;
  },

  setSended(state, status: string) {
    state.sended = status;
  },

  clearCart(state) {
    state.productsCountList = [];
    state.cartProducts = [];
    state.cartIdList = [];
  },
};

const sendGoods: SendGoodsType = {
  orderGoods: [],
  delivery: 0,
  discount: 0,
  totalPrice: 0,
  address: {
    city: '',
    street: '',
    flat: '',
    fullName: '',
    postcode: '',
  },
};

const actions: ActionTree<ICartState, RootState> = {
  fetchGoodsList({ state, commit }) {
    if (!state.cartIdList.length) return;
    commit('setStatus', 'loading');
    axios
      .get<Product[]>(`${API_URI}/api/goods?list=${state.cartIdList}`)
      .then(response => {
        commit('setCartProducts', response.data);
        commit('setStatus', 'success');
      })
      .catch(err => {
        console.error('Произошла ошибка:', err.message);
        commit('setStatus', 'error');
      });
  },

  addToCart({ state, commit }, payload: ProductsCountList) {
    const findItem = state.productsCountList.find(item => item.id === payload.id);
    if (findItem && payload.count === 1) {
      commit('removeCartItem', findItem.id);
    } else if (findItem && payload.count > 1) {
      commit('setCart', payload);
    } else {
      commit('pushToCart', payload);
    }
  },

  removeItem({ commit }, id: string) {
    const newCartProducts = state.cartProducts.filter(item => item.id !== id);
    commit('updateCartProducts', newCartProducts);
    commit('removeCartItem', id);
  },

  sendCart({ state, getters, commit, rootState }, payload: sendCartType) {
    Reflect.deleteProperty(rootState.address, 'save');

    if (Object.values(rootState.address).includes('')) return;

    sendGoods['orderGoods'] = state.cartProducts.map(item => ({
      goods: item,
      count: getters['cartItemCount'](item.id).count,
    }));
    sendGoods['delivery'] = payload.delivery;
    sendGoods['discount'] = payload.discount;
    sendGoods['totalPrice'] = getters.cartTotalPrice;
    sendGoods['address'] = rootState.address;

    axios
      .post(`${API_URI}/api/order`, sendGoods)
      .then(() => {
        commit('setSended', 'confirm');
        commit('setAgree', false);
        commit('clearCart');
      })
      .catch(err => {
        console.error('Произошла ошибка:', err.message);
        commit('setSended', 'error');
      });
  },
};

export const cartModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
