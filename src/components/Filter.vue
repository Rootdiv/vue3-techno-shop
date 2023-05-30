<template>
  <aside :class="['catalog__filter', 'filter', { filter_show: isShow }]">
    <form class="filter__form" @submit.prevent="applyFilter">
      <h3 :class="['filter__title', { filter__title_show: isShow }]" @click="hideMobileFilter">Фильтры</h3>
      <div class="filter__fields-list">
        <fieldset class="filter__field">
          <legend class="filter__field-title">Цена</legend>
          <div class="filter__flex">
            <label>
              <input type="number" v-model="minPrice" placeholder="от" class="filter__input" />
            </label>
            <label>
              <input type="number" v-model="maxPrice" placeholder="до" class="filter__input" />
            </label>
          </div>
        </fieldset>
        <fieldset class="filter__field">
          <legend class="filter__field-title">Категория</legend>
          <label class="filter__label-select">
            <select v-model="category" class="filter__input filter__input_select" id="category">
              <option value="" selected>Все категории</option>
              <option v-for="(label, value, index) in categories" :key="index" :value="value">{{ label }}</option>
            </select>
          </label>
        </fieldset>
        <fieldset class="filter__field">
          <legend class="filter__field-title">Диагональ</legend>
          <div class="filter__flex">
            <label>
              <input type="number" v-model="minDisplay" placeholder="от" class="filter__input" />
            </label>
            <label>
              <input type="number" v-model="maxDisplay" placeholder="до" class="filter__input" />
            </label>
          </div>
        </fieldset>
        <fieldset class="filter__field">
          <legend class="filter__field-title">Цвет</legend>
          <div class="filter__flex filter__flex_column">
            <label class="custom-label">
              <input type="checkbox" v-model="color" value="white" class="filter__checkbox custom-checkbox" />Белый
            </label>
            <label class="custom-label">
              <input type="checkbox" v-model="color" value="black" class="filter__checkbox custom-checkbox" />Черный
            </label>
            <label class="custom-label">
              <input
                type="checkbox"
                v-model="color"
                value="silver"
                class="filter__checkbox custom-checkbox" />Серебристый
            </label>
            <label class="custom-label">
              <input type="checkbox" v-model="color" value="red" class="filter__checkbox custom-checkbox" />Красный
            </label>
            <label class="custom-label">
              <input type="checkbox" v-model="color" value="green" class="filter__checkbox custom-checkbox" />Зеленый
            </label>
            <label class="custom-label">
              <input type="checkbox" v-model="color" value="gold" class="filter__checkbox custom-checkbox" />Золотой
            </label>
          </div>
        </fieldset>
      </div>
      <button class="filter__apply" type="submit">Применить фильтр</button>
      <button class="filter__reset" type="reset" @click="resetFilter">Очистить все</button>
    </form>
  </aside>
</template>

<script>
  import { ref, onMounted, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  export default {
    name: 'Filter',
    props: { categories: Object, isShow: Boolean },
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
      const color = ref([]);
      const filter = ref({});

      const resetFilter = () => {
        minPrice.value = '';
        maxPrice.value = '';
        category.value = '';
        minDisplay.value = '';
        maxDisplay.value = '';
        color.value = [];
        filter.value = {};
      };

      const filtered = () => {
        if (minPrice.value && minPrice.value > 0) {
          filter.value.minprice = minPrice.value;
        } else {
          delete filter.value.minprice;
        }
        if (maxPrice.value && maxPrice.value > 0) {
          filter.value.maxprice = maxPrice.value;
        } else {
          delete filter.value.maxprice;
        }
        if (category.value !== '') {
          filter.value.category = category.value;
        } else {
          delete filter.value.category;
        }
        if (minDisplay.value && minDisplay.value > 0) {
          filter.value.mindisplay = minDisplay.value;
        } else {
          delete filter.value.mindisplay;
        }
        if (maxDisplay.value && maxDisplay.value > 0) {
          filter.value.maxdisplay = maxDisplay.value;
        } else {
          delete filter.value.maxdisplay;
        }
        if (color.value.length > 0) {
          filter.value.color = color.value.toString();
        } else {
          delete filter.value.color;
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
          minPrice.value = route.query.minprice || minPrice.value;
          maxPrice.value = route.query.maxprice || maxPrice.value;
          category.value = route.query.category || category.value;
          minDisplay.value = route.query.mindisplay || minDisplay.value;
          maxDisplay.value = route.query.maxdisplay || maxDisplay.value;
          color.value = route.query.color ? route.query.color.split(',') : color.value;
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
    emits: ['update:is-show'],
  };
</script>
