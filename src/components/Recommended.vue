<template>
  <section class="recommended">
    <div class="container">
      <h2 class="recommended__title">Возможно вам также понравится</h2>
      <div class="recommended__carousel" v-show="status === 'success'">
        <swiper-container
          :space-between="10"
          :breakpoints="breakpoints"
          :pagination="{
            clickable: true,
          }"
          class="swiper-wrapper">
          <swiper-slide v-for="goods in goodsCategory" :key="goods.id" class="swiper-slide">
            <GoodsItem :goods="goods" />
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </section>
</template>

<script>
  import GoodsItem from '@/components/GoodsItem.vue';
  import { useStore } from 'vuex';
  import { computed, watch } from 'vue';
  import { register } from 'swiper/element/bundle';

  register();
  export default {
    name: 'Recommended',
    components: { GoodsItem },
    props: {
      id: String,
      category: String,
    },
    setup(props) {
      const store = useStore();

      const status = computed(() => store.state.recommended.status);
      const goodsCategory = computed(() => store.getters['recommended/recommendItems'](props.id));

      const breakpoints = {
        520: {
          spaceBetween: 20,
          slidesPerView: 1,
        },
        620: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1600: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1920: {
          slidesPerView: 5,
        },
      };

      //Загружаем данные для рекомендаций по категории выбранного товара
      watch(
        () => props.category,
        (category) => {
          store.dispatch('recommended/fetchRecommendGoods', category);
        },
      );

      return { status, goodsCategory, breakpoints };
    },
  };
</script>
