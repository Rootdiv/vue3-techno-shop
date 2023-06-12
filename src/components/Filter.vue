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
              <option v-for="(label, value, index) in categories" :key="index" :value="value">{{ label }}</option>
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
              <input v-model="color" type="checkbox" value="white" class="filter__checkbox custom-checkbox" />Белый
            </label>
            <label class="custom-label">
              <input v-model="color" type="checkbox" value="black" class="filter__checkbox custom-checkbox" />Черный
            </label>
            <label class="custom-label">
              <input
                v-model="color"
                type="checkbox"
                value="silver"
                class="filter__checkbox custom-checkbox" />Серебристый
            </label>
            <label class="custom-label">
              <input v-model="color" type="checkbox" value="red" class="filter__checkbox custom-checkbox" />Красный
            </label>
            <label class="custom-label">
              <input v-model="color" type="checkbox" value="green" class="filter__checkbox custom-checkbox" />Зеленый
            </label>
            <label class="custom-label">
              <input v-model="color" type="checkbox" value="gold" class="filter__checkbox custom-checkbox" />Золотой
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
