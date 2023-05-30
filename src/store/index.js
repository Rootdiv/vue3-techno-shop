import { createStore } from 'vuex';
import { goods } from './goodsModule';
import { categories } from './categoriesModule';
import { recommended } from './recommendedModule';
import { product } from './productModule';
import { cart } from './cartModule';

export const store = createStore({
  modules: {
    goods,
    categories,
    recommended,
    product,
    cart,
  },
});
