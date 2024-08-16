<template>
  <section :class="['card', { ['card_error']: status === 'error' }]">
    <Preloader v-if="status === 'loading'" />
    <div v-else-if="status === 'success'" class="container">
      <div class="card__details">
        <div class="card__gallery">
          <div class="swiper card__image">
            <swiper-container
              :space-between="10"
              :slides-per-view="1"
              :thumbs="{
                slideThumbActiveClass: 'card__thumb-btn_active',
              }"
              thumbs-swiper=".swiper-slide-thumb">
              <swiper-slide
                v-for="(image, index) in cardItem.images.large"
                :key="index"
                class="swiper-slide">
                <img :src="`${API_URI}/${image}`" alt="" />
              </swiper-slide>
            </swiper-container>
          </div>
          <div v-show="cardItem.images.small.length !== 1" class="swiper card__slider-thumb">
            <swiper-container
              :breakpoints="breakpoints"
              :slides-per-view="3"
              :scrollbar="{
                draggable: true,
              }"
              class="swiper-slide-thumb">
              <swiper-slide
                v-for="(image, index) in cardItem.images.small"
                :key="index"
                class="swiper-slide">
                <button class="card__thumb-btn">
                  <img :src="`${API_URI}/${image}`" alt="" />
                </button>
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
        <div class="card__info">
          <h2 class="card__title">{{ cardItem.title }}</h2>
          <p class="card__vendor-code">Артикул: {{ cardItem.id }}</p>
          <Control :id="cardItem.id" :class-type="'card'" :price="cardItem.price" />
          <ul class="card__params-list">
            <li
              v-for="(param, key, index) in cardItem.characteristic"
              :key="index"
              class="card__params-item">
              <span>{{ key }}:</span><span>{{ param }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="card__description">
        <div class="card__description-title">Описание</div>
        <div class="card__description-text">
          <p v-for="(item, index) in cardItem.description" :key="index" v-text="item" />
        </div>
      </div>
    </div>
    <p v-else class="card__error"><b>Товар не найден</b></p>
  </section>
  <Recommended v-if="status !== 'error'" :id="cardId" :category="cardItem.category" />
</template>

<script lang="ts">
  import Preloader from '@/components/Preloader.vue';
  import Recommended from '@/components/Recommended.vue';
  import Control from '@/components/Control.vue';

  import { API_URI } from '@/const';
  import { useStore } from '@/store';
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { register } from 'swiper/element/bundle';

  register();
  export default {
    name: 'CardPage',
    components: {
      Preloader,
      Recommended,
      Control,
    },
    emits: ['vnode-unmounted'],
    setup() {
      const cardId = ref('');

      const route = useRoute();
      const store = useStore();
      const status = computed(() => store.state.product.status);
      const cardItem = computed(() => store.state.product);

      cardId.value = String(route.params.id);

      const breakpoints = {
        320: {
          spaceBetween: 15,
        },
        768: {
          spaceBetween: 20,
        },
        1024: {
          spaceBetween: 27,
        },
        1600: {
          spaceBetween: 44,
        },
      };

      onMounted(() => {
        store.dispatch('product/fetchProduct', cardId.value);
      });

      //Обновляем данные на странице если выбран продукт из рекомендаций
      watch(
        () => route.params.id,
        (newId) => {
          store.dispatch('product/fetchProduct', newId);
          cardId.value = String(newId);
        },
      );

      return {
        API_URI,
        cardId,
        status,
        cardItem,
        breakpoints,
      };
    },
  };
</script>

<style lang="scss">
  .card {
    margin-bottom: 70px;
    position: relative;
    min-height: 80vh;

    &_error {
      min-height: unset;
    }

    @include tablet {
      margin-bottom: 50px;
    }

    &__details {
      display: flex;
      gap: 30px;
      margin-bottom: 70px;

      @include desktop {
        gap: 20px;
      }

      @include laptop {
        margin-bottom: 57px;
      }

      @include tablet {
        flex-wrap: wrap;
        justify-content: center;
        gap: 50px;
        margin-bottom: 50px;
      }

      @include mobile {
        gap: 30px;
        margin-bottom: 30px;
      }
    }

    &__gallery {
      max-width: 710px;
      width: 100%;

      @include desktop {
        max-width: calc(50% - 10px);
      }

      @include tablet {
        max-width: 310px;
      }

      @include mobile {
        max-width: 200px;
      }
    }

    &__image {
      display: block;
      margin-bottom: 20px;

      @include tablet {
        margin-bottom: 10px;
      }
    }

    &__slider-thumb {
      max-width: 447px;

      @include laptop {
        max-width: 285px;
      }

      @include tablet {
        max-width: 270px;
      }

      @include mobile {
        max-width: 200px;
      }
    }

    &__thumb-btn {
      width: 120px;
      border: none;
      background-color: transparent;
      margin-bottom: 10px;

      @include laptop {
        width: 77px;
      }

      @include mobile {
        width: 57px;
      }
    }

    &__thumb-btn_active &__thumb-btn {
      outline: 2px solid $color-main;
      outline-offset: -2px;
    }

    &__info {
      width: 100%;
      padding-top: 120px;

      @include desktop {
        padding-top: 78px;
      }

      @include desktop {
        padding-top: 46px;
      }
    }

    &__title {
      font-weight: 700;
      font-size: 44px;
      line-height: 54px;
      margin-bottom: 20px;

      @include laptop {
        font-size: 30px;
        line-height: 37px;
      }

      @include mobile {
        font-size: 22px;
        line-height: 27px;
      }
    }

    &__vendor-code {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 63px;

      @include laptop {
        margin-bottom: 30px;
      }

      @include tablet {
        font-size: 16px;
        line-height: 20px;
      }

      @include mobile {
        font-size: 12px;
        line-height: 15px;
      }
    }

    &__control {
      display: flex;
      align-items: center;
      margin-bottom: 70px;
      max-width: 826px;
      gap: 50px;
      flex-wrap: wrap;

      @include laptop {
        margin-bottom: 60px;
      }

      @include tablet {
        margin-bottom: 50px;
      }

      @include mobile {
        gap: 25px 40px;
      }
    }

    &__count {
      max-width: 120px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
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

      @include tablet {
        font-size: 20px;
        line-height: 24px;
      }
    }

    &__price {
      font-weight: 500;
      font-size: 34px;
      line-height: 41px;

      @include tablet {
        font-size: 26px;
        line-height: 32px;
      }

      @include mobile {
        font-size: 20px;
        line-height: 24px;
      }
    }

    &__add-cart {
      position: relative;
      width: 352px;
      height: 57px;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: $color-secondary;
      background-color: $color-main;
      border: transparent;
      transition: background-color 0.25s ease-in-out, border 0.25s ease-in-out;

      @include desktop {
        width: 340px;
      }

      @include tablet {
        max-width: 310px;
        margin: 0 auto;
      }

      @include mobile {
        max-width: 200px;
        height: 47px;
        font-size: 12px;
        line-height: 15px;
      }

      &:hover {
        background-color: $color-main-sub;
        border-style: $color-main-sub;
      }
    }

    &__params-list {
      font-size: 18px;
      line-height: 1.4;

      @include laptop {
        font-size: 16px;
      }

      @include mobile {
        font-size: 12px;
      }
    }

    &__params-item {
      display: grid;
      grid-template-columns: 270px 1fr;
      gap: 80px;

      @include laptop {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
      }

      @include mobile {
        gap: 30px;
      }
    }

    &__description {
      max-width: 1450px;
    }

    &__description-title {
      font-weight: 700;
      font-size: 26px;
      line-height: 32px;
      margin-bottom: 20px;

      @include tablet {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 25px;
      }

      @include mobile {
        margin-bottom: 10px;
      }
    }

    &__description-text {
      font-size: 18px;
      line-height: 1.4;

      @include laptop {
        font-size: 16px;
      }

      @include mobile {
        font-size: 12px;
      }
    }

    &__error {
      padding-top: 100px;
      font-size: 20px;
      text-align: center;
    }
  }
</style>
