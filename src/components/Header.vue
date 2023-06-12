<template>
  <header class="header">
    <h1 class="visually-hidden">Techno Shop - Интернет-магазин гаджетов</h1>
    <div class="container header__container">
      <RouterLink to="/" class="header__logo-link">
        <img src="@/assets/img/logo.svg" alt="Логотип Techno Shop" class="header__logo" />
      </RouterLink>
      <Search />
      <div class="header__nav">
        <a href="tel:+79149239223" class="header__phone">
          <svg width="36" height="36">
            <use href="@/assets/img/sprite.svg#phone" />
          </svg>
          <span>8 914 923 92 - 23</span>
        </a>
        <RouterLink to="/cart" class="header__cart" aria-label="Перейти в корзину" :data-count="totalCount">
          <svg width="36" height="36">
            <use href="@/assets/img/sprite.svg#cart" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  export default {
    name: 'HeaderComponent',
  };
</script>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import Search from './Search.vue';
  import { useStore } from '@/store';
  import { computed } from 'vue';
  const totalCount = computed<number>(() => useStore().getters['cart/cartTotalCount']);
</script>
