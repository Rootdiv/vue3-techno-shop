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
          <Pagination
            :total-pages="totalPages"
            :current-page="currentPage"
            @change-page="setCurrentPage" />
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
  import { LocationQuery, useRoute, useRouter } from 'vue-router';
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

      const newParamsURL = (params: LocationQuery) => {
        store.dispatch('goods/fetchGoods', params);
      };

      const setCurrentPage = (page: number) => {
        const query = { ...route.query, page: String(page) };
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
        () => route.query,
        () => {
          store.dispatch('goods/fetchGoods', route.query);
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

<style lang="scss" scoped>
  .catalog {
    &__container {
      position: relative;
    }

    &__title {
      font-weight: 700;
      font-size: 44px;
      line-height: 54px;
      margin-bottom: 10px;

      @include mobile {
        font-size: 30px;
        line-height: 37px;
      }
    }

    &__wrapper {
      display: grid;
      grid-template-columns: 4fr 340px;
      gap: 72px 30px;

      @include desktop {
        grid-template-columns: 3fr 340px;
        column-gap: 20px;
      }

      @include laptop {
        grid-template-columns: 2fr 310px;
        row-gap: 80px;
      }

      @include tablet {
        grid-template-columns: 1fr;
        row-gap: 50px;
      }

      @include mobile {
        row-gap: 40px;
      }
    }

    &__pagination {
      grid-column: 2 span;

      @include tablet {
        grid-column: auto;
      }
    }

    &__filter-btn {
      display: none;

      @include tablet {
        display: flex;
        gap: 5px;
        align-items: center;
        position: absolute;
        top: 16px;
        right: 20px;
        font-weight: 700;
        font-size: 22px;
        line-height: 27px;
        background-color: transparent;
        border: none;

        &::after {
          content: '';
          transform: rotate(90deg);
          display: block;
          width: 18px;
          height: 18px;
          background-image: url('@/assets/img/arrow.svg');
        }
      }

      @include mobile {
        top: 11px;
        font-size: 14px;
        line-height: 17px;
      }
    }
  }

  .goods {
    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 340px));
      gap: 40px 30px;

      @include desktop {
        gap: 20px;
        justify-content: space-evenly;
      }

      @include laptop {
        grid-template-columns: repeat(auto-fill, 310px);
      }

      @include mobile {
        grid-template-columns: repeat(auto-fill, 145px);
        gap: 10px;
      }
    }

    &__not-found {
      padding: 10px;
      text-align: center;
    }
  }

  .overlay-filter {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
</style>
