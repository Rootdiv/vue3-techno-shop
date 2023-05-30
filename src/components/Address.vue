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
  import { ref, onMounted } from 'vue';
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

      const city = ref('');
      const street = ref('');
      const flat = ref('');
      const fullName = ref('');
      const postcode = ref('');
      const save = ref(false);

      const changeOption = () => {
        emit('city-value', city.value);
      };

      onMounted(() => {
        const storage = localStorage.getItem('address-ts');
        const cartAddress = storage ? JSON.parse(storage) : null;
        if (cartAddress) {
          city.value = cartAddress.city;
          street.value = cartAddress.street;
          flat.value = cartAddress.flat;
          fullName.value = cartAddress.fullName;
          postcode.value = cartAddress.postcode;
          save.value = true;
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
          const dataForm = {};
          dataForm.city = city.value;
          dataForm.street = street.value;
          dataForm.flat = flat.value;
          dataForm.fullName = fullName.value;
          dataForm.postcode = postcode.value;
          localStorage.setItem('address-ts', JSON.stringify(dataForm));
        } else {
          localStorage.removeItem('address-ts');
        }
      };

      return { cities, changeOption, city, street, flat, fullName, postcode, save, saveAddress };
    },
    emits: ['city-value'],
  };
</script>
