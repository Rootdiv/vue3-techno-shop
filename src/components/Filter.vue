<template>
  <aside :class="['catalog__filter', 'filter', { filter_show: isShow }]">
    <form class="filter__form" @submit.prevent="applyFilter">
      <h3 :class="['filter__title', { filter__title_show: isShow }]" @click="hideMobileFilter">Фильтры</h3>
      <div class="filter__fields-list">
        <fieldset class="filter__field">
          <legend class="filter__field-title">Цена</legend>
          <div class="filter__flex">
            <label>
              <input v-model="minPrice" type="number" placeholder="от" class="filter__input" />
            </label>
            <label>
              <input v-model="maxPrice" type="number" placeholder="до" class="filter__input" />
            </label>
          </div>
        </fieldset>
        <fieldset class="filter__field">
          <legend class="filter__field-title">Категория</legend>
          <label class="filter__label-select">
            <select id="category" v-model="category" class="filter__input filter__input_select">
              <option value="" selected>Все категории</option>
              <option v-for="(label, value, index) in categories" :key="index" :value="value">
                {{ label }}
              </option>
            </select>
          </label>
        </fieldset>
        <fieldset class="filter__field">
          <legend class="filter__field-title">Диагональ</legend>
          <div class="filter__flex">
            <label>
              <input v-model="minDisplay" type="number" placeholder="от" class="filter__input" />
            </label>
            <label>
              <input v-model="maxDisplay" type="number" placeholder="до" class="filter__input" />
            </label>
          </div>
        </fieldset>
        <fieldset class="filter__field">
          <legend class="filter__field-title">Цвет</legend>
          <div class="filter__flex filter__flex_column">
            <label class="custom-label">
              <input
                v-model="color"
                type="checkbox"
                value="white"
                class="filter__checkbox custom-checkbox" />Белый
            </label>
            <label class="custom-label">
              <input
                v-model="color"
                type="checkbox"
                value="black"
                class="filter__checkbox custom-checkbox" />Черный
            </label>
            <label class="custom-label">
              <input
                v-model="color"
                type="checkbox"
                value="silver"
                class="filter__checkbox custom-checkbox" />Серебристый
            </label>
            <label class="custom-label">
              <input
                v-model="color"
                type="checkbox"
                value="red"
                class="filter__checkbox custom-checkbox" />Красный
            </label>
            <label class="custom-label">
              <input
                v-model="color"
                type="checkbox"
                value="green"
                class="filter__checkbox custom-checkbox" />Зеленый
            </label>
            <label class="custom-label">
              <input
                v-model="color"
                type="checkbox"
                value="gold"
                class="filter__checkbox custom-checkbox" />Золотой
            </label>
          </div>
        </fieldset>
      </div>
      <button class="filter__apply" type="submit">Применить фильтр</button>
      <button class="filter__reset" type="reset" @click="resetFilter">Очистить все</button>
    </form>
  </aside>
</template>

<script lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useStore } from '@/store';
  import type { Ref } from 'vue';

  type FilterType = {
    minprice: string;
    maxprice: string;
    category: string;
    mindisplay: string;
    maxdisplay: string;
    color: string;
  };

  export default {
    name: 'FilterComponent',
    props: { categories: { type: Object, required: true }, isShow: Boolean },
    emits: ['update:is-show'],
    setup(_, { emit }) {
      const hideMobileFilter = () => {
        emit('update:is-show', false);
      };

      const router = useRouter();
      const route = useRoute();
      const store = useStore();

      const minPrice = ref('');
      const maxPrice = ref('');
      const category = ref('');
      const minDisplay = ref('');
      const maxDisplay = ref('');
      const color = ref<string[]>([]);
      const filter: Ref<FilterType> = ref({} as FilterType);

      const resetFilter = () => {
        minPrice.value = '';
        maxPrice.value = '';
        category.value = '';
        minDisplay.value = '';
        maxDisplay.value = '';
        color.value = [];
        filter.value = {} as FilterType;
      };

      const filtered = () => {
        if (minPrice.value && +minPrice.value > 0) {
          filter.value.minprice = minPrice.value;
        } else {
          Reflect.deleteProperty(filter.value, 'minprice');
        }
        if (maxPrice.value && +maxPrice.value > 0) {
          filter.value.maxprice = maxPrice.value;
        } else {
          Reflect.deleteProperty(filter.value, 'maxprice');
        }
        if (category.value !== '') {
          filter.value.category = category.value;
        } else {
          Reflect.deleteProperty(filter.value, 'category');
        }
        if (minDisplay.value && +minDisplay.value > 0) {
          filter.value.mindisplay = minDisplay.value;
        } else {
          Reflect.deleteProperty(filter.value, 'mindisplay');
        }
        if (maxDisplay.value && +maxDisplay.value > 0) {
          filter.value.maxdisplay = maxDisplay.value;
        } else {
          Reflect.deleteProperty(filter.value, 'maxdisplay');
        }
        if (color.value.length > 0) {
          filter.value.color = color.value.toString();
        } else {
          Reflect.deleteProperty(filter.value, 'color');
        }
      };

      const applyFilter = () => {
        filtered();
        if (Object.keys(filter.value).length) {
          router.push({
            path: 'filter',
            query: filter.value,
          });
          store.commit('goods/setPage', 1);
          const paramsURL = new URLSearchParams(filter.value).toString();
          store.dispatch('goods/fetchGoods', paramsURL);
        } else {
          resetFilter();
          router.push({});
        }
      };

      onMounted(() => {
        if (route.path === '/filter') {
          if (route.query.minPrice && typeof route.query.minPrice === 'string') {
            minPrice.value = route.query.minPrice;
          }
          if (route.query.maxPrice && typeof route.query.maxPrice === 'string') {
            maxPrice.value = route.query.maxPrice;
          }
          if (route.query.category && typeof route.query.category === 'string') {
            category.value = route.query.category;
          }
          if (route.query.minDisplay && typeof route.query.minDisplay === 'string') {
            minDisplay.value = route.query.minDisplay;
          }
          if (route.query.maxDisplay && typeof route.query.maxDisplay === 'string') {
            maxDisplay.value = route.query.maxDisplay;
          }
          if (route.query.color && typeof route.query.color === 'string') {
            color.value = route.query.color.split(',');
          }
          router.push({ query: route.query });
          //Запрос на сервер происходит в родительском компоненте
        }
      });

      watch(
        () => route.path,
        () => {
          if (route.path !== '/filter') {
            resetFilter();
          }
        },
      );

      return {
        hideMobileFilter,
        minPrice,
        maxPrice,
        category,
        minDisplay,
        maxDisplay,
        color,
        applyFilter,
        resetFilter,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .filter {
    padding-top: 78px;
    max-width: 340px;

    @include tablet {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      background-color: $color-secondary;
      z-index: 150;
      padding: 14px 20px 26px;
      max-width: 350px;

      &_show {
        display: block;
      }
    }

    @include mobile {
      max-width: 320px;
    }

    &__form {
      position: relative;
    }

    &__title {
      font-weight: 700;
      font-size: 26px;
      line-height: 32px;
      margin-bottom: 30px;

      @include tablet {
        display: flex;
        gap: 5px;
        align-items: center;
        font-size: 22px;
        line-height: 27px;
        justify-content: flex-end;

        &::after {
          content: '';
          transform: rotate(270deg);
          display: block;
          width: 18px;
          height: 18px;
          background-image: url('@/assets/img/arrow.svg');
        }

        &_show {
          cursor: pointer;
        }
      }

      @include mobile {
        font-size: 14px;
        line-height: 17px;
      }
    }

    &__fields-list {
      margin-bottom: 40px;

      @include mobile {
        margin-bottom: 30px;
      }
    }

    &__field {
      margin-bottom: 30px;

      @include mobile {
        margin-bottom: 15px;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 10px;

        @include mobile {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }

    &__label-select {
      position: relative;

      &::after {
        position: absolute;
        content: '';
        right: 33px;
        top: 50%;
        transform: translateY(calc(-50% - 3px)) rotate(45deg);
        display: block;
        width: 10px;
        height: 10px;
        border-width: 2px;
        border-style: solid;
        border-color: transparent $color-primary $color-primary transparent;
      }
    }

    &__flex {
      display: flex;
      gap: 10px;

      @include laptop {
        gap: 20px;
      }

      @include tablet {
        gap: 10px;
      }

      &_column {
        flex-direction: column;
        font-size: 16px;
        line-height: 20px;
      }
    }

    &__input {
      width: 100%;
      font-size: 16px;
      line-height: 20px;
      padding: 0 10px;
      height: 38px;
      outline: none;
      border: 1px solid $color-primary;

      &:focus {
        content: '';
        border: 1px solid $color-main;
      }

      @include mobile {
        font-size: 14px;
        line-height: 17px;
        height: 35px;
      }

      &_select {
        appearance: none;
        width: 100%;
        color: $color-grey;
        background-color: #fff;
        border: 1px solid $color-primary;
      }

      &::placeholder {
        color: $color-grey;
      }
    }

    &__checkbox {
      margin-right: 25px;
    }

    &__apply {
      outline: none;
      display: block;
      margin: 0 auto;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      background-color: $color-primary;
      color: $color-secondary;
      padding: 8px 20px;
      border: 1px solid $color-primary;
      transition: background-color 0.25s ease-in-out, border 0.25s ease-in-out;

      @include tablet {
        margin-bottom: 15px;
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

    &__reset {
      position: absolute;
      top: 5px;
      right: 4px;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: $color-grey;
      background-color: transparent;
      border: none;
      transition: color 0.25s ease-in-out;

      @include tablet {
        position: static;
        display: block;
        margin: 0 auto;
      }

      @include mobile {
        font-size: 12px;
        line-height: 15px;
      }

      &:hover {
        color: $color-main;
      }
    }
  }

  .custom {
    &-label {
      cursor: pointer;
      position: relative;
    }

    &-checkbox {
      appearance: none;
      outline: none;
      z-index: -1;
      width: 0;
      height: 0;

      &::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 1px;
        border: 1px solid $color-primary;

        @include mobile {
          top: 0;
        }
      }

      &:focus::before {
        border: 1px solid $color-main;
      }

      &:checked::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 2px;
        width: 16px;
        height: 6px;
        border-left: 2px solid $color-primary;
        border-bottom: 2px solid $color-primary;
        transform: rotate(-45deg);

        @include mobile {
          top: 1px;
        }
      }
    }
  }
</style>
