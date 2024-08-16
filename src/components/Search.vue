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

<style lang="scss" scoped>
  .search {
    width: 100%;
    max-width: 818px;
    height: 50px;
    position: relative;

    @include mobile {
      height: 44px;
    }

    &__input {
      width: 100%;
      height: 100%;
      outline: none;
      border: 1px solid $color-grey-light;
      border-radius: 16px;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      padding-left: 24px;
      padding-right: 54px;

      &::-webkit-search-cancel-button {
        display: none;
      }

      &:focus {
        border: 1px solid $color-main;
      }

      @include mobile {
        padding-right: 44px;
      }
    }

    &__button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 26px;
      line-height: 0;
      border: 0;
      background-color: transparent;
      transition: color 0.25s ease-in-out;

      &:hover {
        color: $color-main;
      }

      @include mobile {
        right: 15px;
      }
    }
  }
</style>
