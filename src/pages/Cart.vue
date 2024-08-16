<template>
  <section class="cart">
    <h2 class="visually-hidden">Оформление заказа</h2>
    <div class="container cart__container">
      <section class="cart-goods">
        <h3 class="cart__title cart-goods__title">Корзина</h3>
        <ul class="cart-goods__list">
          <li v-if="!cartProducts.length" class="cart-goods__null">В корзине нет товаров</li>
          <li
            v-for="cartProduct in cartProducts"
            v-else
            :key="cartProduct.id"
            class="cart-goods__item item">
            <img
              class="item__img"
              :src="`${API_URI}/${cartProduct.images.present}`"
              :alt="cartProduct.title" />
            <div class="item__detail">
              <h4 class="item__title">{{ cartProduct.title }}</h4>
              <p class="item__vendor-code">Артикул: {{ cartProduct.id }}</p>
            </div>
            <Control :id="cartProduct.id" :class-type="'item'" :price="cartProduct.price" />
          </li>
        </ul>
      </section>
      <CartTotal :total="cartTotalPrice" :total-count="cartTotalCount" :city="selectedCity" />
      <AddressComponent :count="cartTotalCount" @city-value="setSelectedCity" />
    </div>
  </section>
</template>

<script lang="ts">
  import CartTotal from '@/components/CartTotal.vue';
  import AddressComponent from '@/components/Address.vue';
  import { useStore } from '@/store';
  import { computed, onMounted, ref } from 'vue';
  import { API_URI } from '@/const';
  import Control from '@/components/Control.vue';
  export default {
    name: 'CartPage',
    components: {
      CartTotal,
      AddressComponent,
      Control,
    },
    emits: ['vnode-unmounted'],
    setup() {
      const store = useStore();
      const selectedCity = ref('');
      const cartProducts = computed(() => store.state.cart.cartProducts);
      const cartTotalPrice = computed<number>(() => store.getters['cart/cartTotalPrice']);
      const cartTotalCount = computed<number>(() => store.getters['cart/cartTotalCount']);

      const setSelectedCity = (city: string) => {
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
  };
</script>

<style lang="scss">
  .cart {
    &__container {
      display: grid;
      grid-template-columns: 3fr 2fr;
      justify-content: space-between;
      gap: 70px 30px;

      @include desktop {
        grid-template-columns: minmaix(59%, 848px) minmaix(34%, 494px);
        column-gap: 20px;
      }

      @include laptop {
        grid-template-columns: 1fr;
        gap: 50px;
      }
    }

    &__title {
      font-weight: 700;
      font-size: 44px;
      line-height: 54px;
    }

    &__total {
      padding-top: 94px;

      @include laptop {
        order: 1;
        margin-bottom: 120px;
      }

      @include tablet {
        margin-bottom: 80px;
      }
    }
  }

  .cart-goods {
    &__title {
      margin-bottom: 40px;
    }

    &__item {
      max-width: 990px;
      margin-bottom: 30px;

      @include desktop {
        max-width: 848px;
      }

      @include laptop {
        max-width: 100%;
      }

      @include tablet {
        margin-bottom: 20px;
      }

      @include mobile {
        margin-bottom: 25px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__null {
      font-weight: 700;
      padding: 10px;
      display: flex;
      justify-content: center;
    }
  }

  .item {
    display: flex;
    align-items: flex-start;

    @include mobile {
      position: relative;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-right: 18px;
      gap: 20px 18px;
    }

    &__img {
      display: block;
      width: 200px;
      object-fit: cover;
      margin-right: 30px;

      @include desktop {
        width: 137px;
        margin-right: 8px;
      }

      @include mobile {
        width: 104px;
        margin-right: 0;
      }
    }

    &__detail {
      flex-basis: 353px;
      margin-right: 25px;
      display: flex;
      flex-direction: column;
      padding-top: 28px;

      @include desktop {
        flex-basis: 320px;
        padding-top: 17px;
      }

      @include tablet {
        flex-basis: 160px;
        margin-right: 7px;
      }

      @include mobile {
        padding-top: 0;
        margin-right: 0;
      }
    }

    &__title {
      min-height: 54px;
      margin-bottom: 14px;
      font-weight: 700;
      font-size: 22px;
      line-height: 27px;

      @include desktop {
        min-height: auto;
      }

      @include tablet {
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 12px;
      }
    }

    &__vendor-code {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;

      @include tablet {
        font-size: 12px;
        line-height: 15px;
      }
    }

    &__control {
      display: flex;
      align-self: center;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      gap: 15px;

      @include mobile {
        justify-content: flex-start;
        gap: 39px;
      }
    }

    &__count {
      max-width: 120px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    &__btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: transparent;
      font-size: 30px;
      line-height: 1;
      border: 1px solid $color-primary;
      transition: background-color 0.25s ease-in-out, border 0.25s ease-in-out;

      &:hover {
        background-color: $color-main;
        border: 1px solid $color-main;
      }

      &:focus {
        background-color: $color-main-sub;
        border: 1px solid $color-main-sub;
      }
    }

    &__number {
      font-size: 30px;
      line-height: 37px;
    }

    &__price {
      font-weight: 500;
      font-size: 22px;
      line-height: 27px;
      white-space: nowrap;
    }

    &__remove-cart {
      min-width: 32px;
      width: 32px;
      height: 32px;
      border: none;
      background-color: transparent;
      color: $color-grey-light;

      &:hover {
        color: $color-main;
      }

      &:focus {
        color: $color-main-sub;
      }

      @include mobile {
        position: absolute;
        top: 2px;
        right: 0;
        min-width: 18px;
        width: 18px;
        height: 18px;
      }
    }
  }
</style>
