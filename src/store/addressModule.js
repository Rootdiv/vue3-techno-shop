const state = {
  city: '',
  street: '',
  flat: '',
  fullName: '',
  postcode: '',
  save: false,
};

const mutations = {
  setCity(state, city) {
    state.city = city;
  },
  setStreet(state, street) {
    state.street = street;
  },
  setFlat(state, flat) {
    state.flat = flat;
  },
  setFullName(state, fullName) {
    state.fullName = fullName;
  },
  setPostcode(state, postcode) {
    state.postcode = postcode;
  },
  setSave(state, save) {
    state.save = save;
  },
};

export const address = {
  namespaced: true,
  state,
  mutations,
};
