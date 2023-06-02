<template>
  <section class="cart__address address">
    <h3 class="cart__title address__title">Адрес доставки</h3>
    <form class="address__form" @submit.prevent="saveAddress">
      <label class="address__label-select">
        <select class="address__item address__item_select" v-model="city" @change="changeOption">
          <option value="" disabled selected>Город</option>
          <option v-for="city of cities" :key="city.name" :value="city.value" v-text="city.name" />
        </select>
      </label>
      <label><input type="text" v-model.trim="street" class="address__item" placeholder="Улица, дом" /></label>
      <label><input type="text" v-model.trim="flat" class="address__item" placeholder="Квартира" /></label>
      <label><input type="text" v-model.trim="fullName" class="address__item" placeholder="ФИО" /></label>
      <label><input type="text" v-model.trim="postcode" class="address__item" placeholder="Индекс" /></label>
      <button :disabled="count === 0" class="address__item address__item_btn">Сохранить</button>
      <label class="address__label-save custom-label">
        <input type="checkbox" v-model="save" class="address__save custom-checkbox" />
        Запомнить этот адрес
      </label>
    </form>
  </section>
</template>

<script>
  import { onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
  export default {
    name: 'Address',
    props: {
      count: {
        type: Number,
        default: 0,
      },
    },
    setup(_, { emit }) {
      const cities = [
        { value: 'Moscow', name: 'Москва' },
        { value: 'St. Petersburg', name: 'Санкт-Петербург' },
        { value: 'Kazan', name: 'Казань' },
        { value: 'Yekaterinburg', name: 'Екатеринбург' },
        { value: 'Chelyabinsk', name: 'Челябинск' },
        { value: 'Kaliningrad', name: 'Калининград' },
        { value: 'Novosibirsk', name: 'Новосибирск' },
        { value: 'Volgograd', name: 'Волгоград' },
      ];

      const store = useStore();

      const city = computed({
        get: () => store.state.address.city,
        set: (value) => store.commit('address/setCity', value),
      });
      const street = computed({
        get: () => store.state.address.street,
        set: (value) => store.commit('address/setStreet', value),
      });
      const flat = computed({
        get: () => store.state.address.flat,
        set: (value) => store.commit('address/setFlat', value),
      });
      const fullName = computed({
        get: () => store.state.address.fullName,
        set: (value) => store.commit('address/setFullName', value),
      });
      const postcode = computed({
        get: () => store.state.address.postcode,
        set: (value) => store.commit('address/setPostcode', value),
      });
      const save = computed({
        get: () => store.state.address.save,
        set: (value) => store.commit('address/setSave', value),
      });

      const changeOption = () => {
        emit('city-value', city.value);
      };

      onMounted(() => {
        const storage = localStorage.getItem('address-ts');
        const cartAddress = storage ? JSON.parse(storage) : null;
        if (cartAddress) {
          store.commit('address/setCity', cartAddress.city);
          store.commit('address/setStreet', cartAddress.street);
          store.commit('address/setFlat', cartAddress.flat);
          store.commit('address/setFullName', cartAddress.fullName);
          store.commit('address/setPostcode', cartAddress.postcode);
          store.commit('address/setSave', true);
          emit('city-value', cartAddress.city);
        }
      });

      const saveAddress = () => {
        if (
          city.value !== '' &&
          street.value !== '' &&
          flat.value !== '' &&
          fullName.value !== '' &&
          postcode.value !== '' &&
          save.value
        ) {
          localStorage.setItem('address-ts', JSON.stringify(store.state.address));
        } else {
          localStorage.removeItem('address-ts');
        }
      };

      return { cities, changeOption, city, street, flat, fullName, postcode, save, saveAddress };
    },
    emits: ['city-value'],
  };
</script>
