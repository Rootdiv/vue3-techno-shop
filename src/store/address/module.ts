import { MutationTree } from 'vuex';
import { IAddressState } from './types';

const state: IAddressState = {
  city: '',
  street: '',
  flat: '',
  fullName: '',
  postcode: '',
  save: false,
};

const mutations: MutationTree<IAddressState> = {
  setCity(state, city: string) {
    state.city = city;
  },
  setStreet(state, street: string) {
    state.street = street;
  },
  setFlat(state, flat: string) {
    state.flat = flat;
  },
  setFullName(state, fullName: string) {
    state.fullName = fullName;
  },
  setPostcode(state, postcode: string) {
    state.postcode = postcode;
  },
  setSave(state, save: boolean) {
    state.save = save;
  },
};

export const addressModule = {
  namespaced: true,
  state,
  mutations,
};
