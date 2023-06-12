<template>
  <form class="header__search search" @submit.prevent="searching">
    <input v-model.trim="search" type="search" class="search__input" />
    <button class="search__button" aria-label="Найти товар">
      <svg width="24" height="24">
        <use href="@/assets/img/sprite.svg#search" />
      </svg>
    </button>
  </form>
</template>

<script lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useStore } from '@/store';

  export default {
    name: 'SearchComponent',
    setup() {
      const router = useRouter();
      const route = useRoute();
      const store = useStore();

      const search = ref('');

      const searching = () => {
        if (search.value) {
          router.push({
            query: { search: search.value },
          });
          store.commit('goods/setPage', 1);
          const paramsURL = new URLSearchParams({ search: search.value }).toString();
          store.dispatch('goods/fetchGoods', paramsURL);
        }
      };

      watch(
        () => route.query,
        () => {
          if (!route.query.search) {
            search.value = '';
          }
        },
      );

      return { search, searching };
    },
  };
</script>
