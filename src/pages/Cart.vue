<template>
  <section class="cart">
    <h2 class="visually-hidden">Оформление заказа</h2>
    <div class="container cart__container">
      <section class="cart-goods">
        <h3 class="cart__title cart-goods__title">Корзина</h3>
        <ul class="cart-goods__list">
          <li class="cart-goods__null" v-if="!cartProducts.length">В корзине нет товаров</li>
          <li v-else v-for="cartProduct in cartProducts" :key="cartProduct.id" class="cart-goods__item item">
            <img class="item__img" :src="`${API_URI}/${cartProduct.images.present}`" :alt="cartProduct.title" />
            <div class="item__detail">
              <h4 class="item__title">{{ cartProduct.title }}</h4>
              <p class="item__vendor-code">Артикул: {{ cartProduct.id }}</p>
            </div>
            <Control :classType="'item'" :id="cartProduct.id" :price="cartProduct.price" />
          </li>
        </ul>
      </section>
      <CartTotal :total="cartTotalPrice" :totalCount="cartTotalCount" :city="selectedCity" />
      <Address :count="cartTotalCount" @city-value="setSelectedCity" />
    </div>
  </section>
</template>

<script>
  import CartTotal from '@/components/CartTotal.vue';
  import Address from '@/components/Address.vue';
  import { useStore } from 'vuex';
  import { computed, onMounted, ref } from 'vue';
  import { API_URI } from '@/const';
  import Control from '@/components/Control.vue';
  export default {
    name: 'Cart',
    components: {
      CartTotal,
      Address,
      Control,
    },
    setup() {
      const store = useStore();
      const selectedCity = ref('');
      const cartProducts = computed(() => store.state.cart.cartProducts);
      const cartTotalPrice = computed(() => store.getters['cart/cartTotalPrice']);
      const cartTotalCount = computed(() => store.getters['cart/cartTotalCount']);

      const setSelectedCity = (city) => {
        selectedCity.value = city;
      };

      onMounted(() => {
        store.dispatch('cart/fetchGoodsList');
      });

      return {
        API_URI,
        cartProducts,
        cartTotalPrice,
        cartTotalCount,
        selectedCity,
        setSelectedCity,
      };
    },
    emits: ['vnode-unmounted'],
  };
</script>
