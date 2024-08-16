<template>
  <section class="cart__address address">
    <h3 class="cart__title address__title">Адрес доставки</h3>
    <form class="address__form" @submit.prevent="saveAddress">
      <label class="address__label-select">
        <select v-model="city" class="address__item address__item_select" @change="changeOption">
          <option value="" disabled selected>Город</option>
          <option
            v-for="cityItem of cities"
            :key="cityItem.name"
            :value="cityItem.value"
            v-text="cityItem.name" />
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

<script lang="ts">
  import { onMounted, computed } from 'vue';
  import { useStore } from '@/store';
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

<style lang="scss">
  .address {
    margin-bottom: 110px;

    @include desktop {
      max-width: 700px;
    }

    @include laptop {
      max-width: 100%;
      margin-bottom: 10px;
    }

    &__title {
      margin-bottom: 30px;

      @include mobile {
        margin-bottom: 20px;
      }
    }

    &__form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      color: $color-grey;

      @include desktop {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      @include tablet {
        gap: 10px 20px;
      }

      @include mobile {
        grid-template-columns: 1fr;
      }
    }

    &__label-select {
      position: relative;

      &::after {
        position: absolute;
        content: '';
        right: 43px;
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

    &__item {
      outline: none;
      width: 100%;
      height: 50px;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      padding: 0 10px;
      color: $color-primary;
      border: 1px solid $color-primary;

      &:focus {
        border: 1px solid $color-main;
      }

      ::placeholder {
        color: $color-grey;
      }

      &_select {
        appearance: none;
        color: $color-grey;
        background-color: #fff;

        option {
          color: $color-primary;
        }
      }

      &_btn {
        outline: none;
        font-weight: 500;
        color: $color-secondary;
        background-color: $color-primary;
        transition: background-color 0.25s ease-in-out, border 0.25s ease-in-out;

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
    }

    &__label-save {
      grid-column: -2;
      display: flex;
      gap: 8px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      padding-top: 2px;
    }
  }
</style>
