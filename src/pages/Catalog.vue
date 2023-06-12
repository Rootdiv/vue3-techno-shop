<template>
  <section class="catalog">
    <div class="container catalog__container">
      <h2 class="catalog__title">Каталог</h2>
      <div class="catalog__wrapper">
        <div class="catalog__goods goods">
          <Preloader v-if="status === 'loading'" />
          <ul v-else-if="goodsItem.length" class="goods__list">
            <li v-for="goods in goodsItem" :key="goods.id" class="goods__item">
              <GoodsItem :goods="goods" />
            </li>
          </ul>
          <div v-else class="goods__not-found"><b>Нет товаров по вашему запросу</b></div>
        </div>
        <button type="button" class="catalog__filter-btn" @click="showMobileFilter">Фильтры</button>
        <FilterComponent v-model:is-show="mobileFilter" :categories="categories" />
        <div v-show="goodsItem.length" class="catalog__pagination pagination">
          <Pagination :total-pages="totalPages" :current-page="currentPage" @change-page="setCurrentPage" />
        </div>
      </div>
    </div>
  </section>
  <div v-show="mobileFilter" class="overlay-filter" />
</template>

<script lang="ts">
  import Preloader from '@/components/Preloader.vue';
  import GoodsItem from '@/components/GoodsItem.vue';
  import FilterComponent from '@/components/Filter.vue';
  import Pagination from '@/components/Pagination.vue';
  import { computed, onMounted, watch, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from '@/store';

  export default {
    name: 'CatalogPage',
    components: {
      Preloader,
      GoodsItem,
      FilterComponent,
      Pagination,
    },
    emits: ['vnode-unmounted'],
    setup() {
      const store = useStore();
      const status = computed(() => store.state.goods.status);
      const goodsItem = computed(() => store.state.goods.items);
      const currentPage = computed(() => store.state.goods.page);
      const totalPages = computed(() => store.state.goods.pages);
      const categories = computed(() => store.state.categories.categories);
      const route = useRoute();
      const router = useRouter();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newParamsURL = (param: any) => {
        const paramsURL = new URLSearchParams(param).toString();
        store.dispatch('goods/fetchGoods', paramsURL);
      };

      const setCurrentPage = (page: number) => {
        const query = { ...route.query, page };
        router.push({ path: route.path, query });
        newParamsURL(query);
      };

      const mobileFilter = ref(false);

      const showMobileFilter = () => {
        mobileFilter.value = true;
      };

      onMounted(() => {
        store.commit('goods/setPage', Number(route.query.page || 1));
        store.dispatch('categories/fetchCategory');
        newParamsURL(route.query);
      });

      watch(
        () => [route.path, route.query],
        () => {
          if (route.path !== '/filter') {
            if (route.query.category) {
              store.commit('goods/setPage', 1);
              const category = `category=${route.query.category}`;
              store.dispatch('goods/fetchGoods', category);
            } else if (!route.query?.page && !route.query?.category && !route.query?.search) {
              //Условие для корректного перехода по страницам и на главную страницу
              store.commit('goods/setPage', 1);
              store.dispatch('goods/fetchGoods');
            }
          }
        },
      );

      return {
        status,
        goodsItem,
        categories,
        currentPage,
        totalPages,
        setCurrentPage,
        mobileFilter,
        showMobileFilter,
      };
    },
  };
</script>

<style scoped>
  .overlay-filter {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
</style>
