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
        <RouterLink
          to="/cart"
          class="header__cart"
          aria-label="Перейти в корзину"
          :data-count="totalCount">
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

<style lang="scss" scoped>
  .header {
    padding: 26px 0;

    @include mobile {
      padding: 15px 0;
    }

    &__container {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      gap: 32px;

      @include desktop {
        grid-template-columns: 1fr 2fr 1fr;
      }

      @include laptop {
        grid-template-columns: 1fr 3fr 2fr;
      }

      @include tablet {
        grid-template-columns: 1fr 1fr;
        gap: 25px;
      }

      @include mobile {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: space-between;
      }
    }

    &__logo-link {
      // align-self: start;
      // justify-self: start;
      place-self: start;
    }

    &__logo {
      display: block;

      @include mobile {
        width: 56px;
      }
    }

    &__search {
      justify-self: center;

      @include desktop {
        justify-self: start;
      }

      @include laptop {
        width: 100%;
      }

      @include tablet {
        order: 1;
        grid-column: 2 span;
      }
    }

    &__nav {
      justify-self: end;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 330px;
      width: 100%;

      @include mobile {
        max-width: 212px;
      }
    }

    &__phone {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      transition: color 0.25s ease-in-out;

      &:hover {
        color: $color-main;
      }

      @include mobile {
        font-size: 14px;
        line-height: 17px;
      }
    }

    &__cart {
      position: relative;
      transition: color 0.25s ease-in-out;

      &:hover svg {
        color: $color-main;
      }

      &::after {
        content: attr(data-count);
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: $color-main;
        width: 25px;
        height: 25px;
        position: absolute;
        right: -10px;
        bottom: -7px;
      }
    }
  }
</style>
