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

  export default {
    name: 'SearchComponent',
    setup() {
      const router = useRouter();
      const route = useRoute();

      const search = ref('');

      const searching = () => {
        if (search.value) {
          router.push({
            path: 'search',
            query: { q: search.value },
          });
        }
      };

      watch(
        () => [route.path, route.query],
        () => {
          if (route.path === '/search') {
            //Приводим тип "LocationQueryValue" к типу "string".
            search.value = String(route.query.q);
          } else {
            search.value = '';
          }
        },
      );

      return { search, searching };
    },
  };
</script>
