<template>
  <div :class="`${classType}__control`">
    <div :class="`${classType}__count`">
      <button
        type="button"
        :class="`${classType}__btn ${classType}__btn_dec`"
        aria-label="Уменьшить количество товара"
        @click="minusItem(id)">
        –
      </button>
      <output :class="`${classType}__number`">{{ countItem }}</output>
      <button
        type="button"
        :class="`${classType}__btn ${classType}__btn_inc`"
        aria-label="Увеличить количество товара"
        @click="plusItem(id)">
        +
      </button>
    </div>
    <p :class="`${classType}__price`">{{ formattedPrice }}</p>
    <ButtonCart v-if="classType === 'card'" :id="id" class="card__add-cart" :price="price" :count="countItem">
      В корзину
    </ButtonCart>
    <button
      v-else
      type="button"
      class="item__remove-cart"
      aria-label="Удалить товар из корзины"
      @click="removeItem(id)">
      <svg width="32" height="32">
        <use href="@/assets/img/sprite.svg#remove"></use>
      </svg>
    </button>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { formatPrice } from '@/const';
  import { ref, onMounted, watch } from 'vue';
  import ButtonCart from './ButtonCart.vue';

  export default {
    name: 'ControlComponent',
    components: { ButtonCart },
    props: {
      classType: { type: String, required: true },
      id: { type: String, required: true },
      price: { type: Number, required: true },
    },
    setup(props) {
      const store = useStore();
      const isAddedCart = ref(false);
      const formattedPrice = ref('');
      const countItem = ref(1);

      const minusItem = (id) => {
        if (countItem.value !== 1 && countItem.value > 0) {
          countItem.value--;
        }
        if (isAddedCart.value) {
          store.commit('cart/decrementItemCount', id);
        }
      };

      const plusItem = (id) => {
        countItem.value++;
        if (isAddedCart.value) {
          store.commit('cart/incrementItemCount', id);
        }
      };

      const removeItem = (id) => {
        store.dispatch('cart/removeItem', id);
      };

      watch(countItem, () => {
        formattedPrice.value = formatPrice(props.price * countItem.value);
      });

      onMounted(() => {
        isAddedCart.value = store.getters['cart/addedCart'](props.id);
        formattedPrice.value = formatPrice(props.price * countItem.value);
        countItem.value = isAddedCart.value ? store.getters['cart/cartItemCount'](props.id).count : countItem.value;
      });

      return {
        countItem,
        minusItem,
        plusItem,
        formattedPrice,
        removeItem,
      };
    },
  };
</script>
