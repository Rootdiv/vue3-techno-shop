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
