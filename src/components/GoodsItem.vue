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

<script setup lang="ts">
  import { API_URI, formatPrice } from '@/const';
  import ButtonCart from './ButtonCart.vue';
  import { RouterLink } from 'vue-router';
  import { toRefs } from 'vue';
  import { Product } from '@/store/types';
  const props = defineProps<{ goods: Product; }>();
  const { goods } = toRefs(props);
</script>

<style lang="scss" scoped>
  .goods-item {
    min-height: 450px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    @include laptop {
      min-height: 420px;
    }

    @include mobile {
      min-height: 252px;
    }

    &__image {
      display: block;
      width: 100%;
      margin-bottom: 10px;

      @include mobile {
        margin-bottom: 5px;
      }
    }

    &__title {
      font-weight: 500;
      font-size: 22px;
      line-height: 27px;

      @include mobile {
        font-size: 14px;
        line-height: 17px;
      }
    }

    &__buy {
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: space-between;
      padding-right: 40px;

      @include mobile {
        gap: 10px;
        flex-direction: column;
        align-items: flex-start;
        padding-right: 0;
      }
    }

    &__price {
      font-weight: 700;
      font-size: 22px;
      line-height: 27px;

      @include mobile {
        font-size: 14px;
        line-height: 17px;
      }
    }

    &__to-card {
      outline: none;
      background-color: transparent;
      border: 1px solid $color-primary;
      padding: 8px 20px;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      transition: background-color 0.25s ease-in-out, border 0.25s ease-in-out;

      &_remove {
        background-color: $color-primary;
        color: $color-secondary;
      }

      @include mobile {
        font-size: 12px;
        line-height: 15px;
      }

      &:hover {
        background-color: $color-main;
        border: 1px solid $color-main;
      }

      &:focus {
        background-color: $color-main-sub;
        border: 1px solid $color-main-sub;
      }

      &:disabled {
        cursor: default;
        background-color: $color-grey-light;
        border: 1px solid $color-grey-light;
      }
    }
  }
</style>
