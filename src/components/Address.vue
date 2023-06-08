<template>
  <section class="cart__address address">
    <h3 class="cart__title address__title">Адрес доставки</h3>
    <form class="address__form" @submit.prevent="saveAddress">
      <label class="address__label-select">
        <select v-model="city" class="address__item address__item_select" @change="changeOption">
          <option value="" disabled selected>Город</option>
          <option v-for="cityItem of cities" :key="cityItem.name" :value="cityItem.value" v-text="cityItem.name" />
        </select>
      </label>
      <label><input v-model.trim="street" type="text" class="address__item" placeholder="Улица, дом" /></label>
      <label><input v-model.trim="flat" type="text" class="address__item" placeholder="Квартира" /></label>
      <label><input v-model.trim="fullName" type="text" class="address__item" placeholder="ФИО" /></label>
      <label><input v-model.trim="postcode" type="text" class="address__item" placeholder="Индекс" /></label>
      <button :disabled="count === 0" class="address__item address__item_btn">Сохранить</button>
      <label class="address__label-save custom-label">
        <input v-model="save" type="checkbox" class="address__save custom-checkbox" />
        Запомнить этот адрес
      </label>
    </form>
  </section>
</template>

<script>
  import { onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
  export default {
    name: 'AddressComponent',
    props: {
      count: {
        type: Number,
        default: 0,
      },
    },
    emits: ['city-value'],
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
  };
</script>
