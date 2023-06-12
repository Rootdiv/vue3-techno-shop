import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { goodsModule } from './goods/module';
import { categoriesModule } from './categories/module';
import { recommendedModule } from '@/store/recommended/module';
import { productModule } from './product/module';
import { cartModule } from './cart/module';
import { addressModule } from '@/store/address/module';
import { RootState } from './types';
import { InjectionKey } from 'vue';

export const store = createStore<RootState>({
  modules: {
    goods: goodsModule,
    categories: categoriesModule,
    recommended: recommendedModule,
    product: productModule,
    cart: cartModule,
    address: addressModule,
  },
});

//объявляем ключ инъекции с помощью интерфейса InjectionKey из Vue
export const key: InjectionKey<Store<RootState>> = Symbol();

//Создаём свой useStore с ключом (чтобы не импортировать дополнительно ключ)
//при этом необходимо заменить все импорты useStore в компонентах
export const useStore = () => baseUseStore(key);
