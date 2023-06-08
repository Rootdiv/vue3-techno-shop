<template>
  <article class="goods-item">
    <RouterLink :to="{ name: 'card', params: { id: goods.id } }" class="goods-item__link">
      <img
        :src="`${API_URI}/${goods.images.present}`"
        :alt="goods.title"
        width="340"
        height="340"
        class="goods-item__image" />
      <h3 class="goods-item__title">{{ goods.title }}</h3>
    </RouterLink>
    <div class="goods-item__buy">
      <p class="goods-item__price">{{ formatPrice(goods.price) }}</p>
      <ButtonCart :id="goods.id" class="goods-item__to-card" :price="goods.price" />
    </div>
  </article>
</template>

<script setup>
  import { API_URI, formatPrice } from '@/const';
  import ButtonCart from './ButtonCart.vue';
  import { RouterLink } from 'vue-router';
  import { toRefs } from 'vue';
  const props = defineProps({ goods: { type: Object, required: true } });
  const { goods } = toRefs(props);
</script>
