<template>
  <button type="button" :class="{ 'goods-item__to-card_remove': addedInCart }" @click="addToCart()">
    <slot>{{ addedInCart ? 'В корзине' : 'В корзину' }}</slot>
  </button>
</template>

<script>
  import { useStore } from 'vuex';
  import { ref, onMounted } from 'vue';
  export default {
    props: {
      id: { type: String, required: true },
      price: { type: Number, required: true },
      count: { type: Number, default: 1 },
    },
    setup(props) {
      const store = useStore();
      const addedInCart = ref(false);

      const addToCart = () => {
        const countCart = store.getters['cart/cartTotalCount'];
        store.dispatch('cart/addToCart', { ...props });
        addedInCart.value = true;
        if (addedInCart.value && countCart === 1) {
          addedInCart.value = false;
        }
      };

      onMounted(() => {
        addedInCart.value = store.getters['cart/addedCart'](props.id);
      });

      return { addToCart, addedInCart };
    },
  };
</script>
