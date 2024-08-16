<template>
  <section class="cart__total total">
    <h3 class="visually-hidden">Итог</h3>
    <div class="total__wrapper">
      <ul class="total__table">
        <li class="total__row total__row_header">
          <span>Итого</span>
          <span>{{ total + delivery - discount }} &#8381;</span>
        </li>
        <li class="total__row total__row_gray">
          <span>Товары, {{ totalCount }} шт.</span>
          <span>{{ total }} &#8381;</span>
        </li>
        <li class="total__row total__row_gray">
          <span>Скидка</span>
          <span>{{ discount }} &#8381;</span>
        </li>
        <li class="total__row total__row_gray total__row_gap">
          <span>Доставка</span>
          <span>{{ delivery }} &#8381;</span>
        </li>
        <li class="total__row">
          <span>Дата</span>
          <span>{{ dateStart }} - {{ dateEnd }}</span>
        </li>
        <li class="total__row">
          <span>Оплата</span>
          <span>Картой</span>
        </li>
      </ul>
      <div class="total__order">
        <button :disabled="!agree" class="total__submit" @click="sendCart">Оформить заказ</button>
        <label class="total__agree custom-label">
          <input
            v-model="agree"
            type="checkbox"
            required
            class="total__agree-checkbox custom-checkbox" />
          <span>
            Согласен с <a href="#" class="total__agree-link">условиями</a> правил пользования
            торговой площадкой и&nbsp;правилами возврата
          </span>
        </label>
      </div>
    </div>
  </section>
  <SendModal v-model:sended="sended" />
</template>

<script lang="ts">
  import { ref, watch, onMounted, computed } from 'vue';
  import { useStore } from '@/store';
  import SendModal from './SendModal.vue';

  export default {
    components: { SendModal },
    props: {
      total: { type: Number, required: true },
      totalCount: { type: Number, required: true },
      city: { type: String, required: true },
    },
    setup(props) {
      const delivery = ref(0);
      const percent = ref(0);
      const discount = ref(0);
      const deliveryDay = ref(3);
      const dateStart = ref('01');
      const dateEnd = ref('03 июля');

      const store = useStore();

      const agree = computed({
        get: () => store.state.cart.agreeSend,
        set: (value) => store.commit('cart/setAgree', value),
      });

      const sended = computed({
        get: () => store.state.cart.sended,
        set: (value) => store.commit('cart/setSended', value),
      });

      const sendCart = () => {
        const payload = { delivery: delivery.value, discount: discount.value };
        if (agree.value && delivery.value) {
          store.dispatch('cart/sendCart', payload);
        }
      };

      const setDeliveryDate = () => {
        const date = new Date();
        dateStart.value = new Intl.DateTimeFormat('ru', { day: '2-digit', month: 'long' }).format(
          date,
        );
        const periodDay = date.setDate(date.getDate() + deliveryDay.value);
        dateEnd.value = new Intl.DateTimeFormat('ru', { day: '2-digit', month: 'long' }).format(
          periodDay,
        );
      };

      watch(props, () => {
        if (props.total === 0) {
          delivery.value = 0;
        }

        if (props.totalCount >= 10) {
          percent.value = 5;
          discount.value = Math.floor((props.total / 100) * percent.value);
        } else if (props.totalCount >= 20) {
          percent.value = 10;
          discount.value = Math.floor((props.total / 100) * percent.value);
        } else {
          percent.value = 0;
          discount.value = 0;
        }

        switch (true) {
          case props.city === 'Kazan':
            deliveryDay.value = 4;
            break;
          case props.city === 'Yekaterinburg':
            deliveryDay.value = 6;
            break;
          case props.city === 'Chelyabinsk':
            deliveryDay.value = 7;
            break;
          case props.city === 'Kaliningrad':
            deliveryDay.value = 10;
            break;
          case props.city === 'Novosibirsk':
            deliveryDay.value = 12;
            break;
          case props.city === 'Volgograd':
            deliveryDay.value = 8;
            break;
          default:
            deliveryDay.value = 3;
            break;
        }

        setDeliveryDate();
      });

      onMounted(() => {
        if (props.total) {
          setDeliveryDate();
          delivery.value = 500;
        }
        store.commit('cart/setAgree', false);
      });

      return { delivery, discount, dateStart, dateEnd, agree, sendCart, sended };
    },
  };
</script>

<style lang="scss" scoped>
  .total {
    position: relative;

    @include laptop {
      padding-top: 0;
    }

    @include mobile {
      padding-top: 15px;
      padding-bottom: 25px;

      &::before {
        content: '';
        position: absolute;
        left: calc((100vw - 95%) / -2);
        top: 0;
        display: block;
        width: 100vw;
        height: 1px;
        background-color: $color-primary;
      }

      &::after {
        content: '';
        position: absolute;
        left: calc((100vw - 95%) / -2);
        bottom: 0;
        display: block;
        width: 100vw;
        height: 1px;
        background-color: $color-primary;
      }
    }

    &__wrapper {
      border: 1px solid $color-grey;
      border-radius: 20px;
      padding: 40px 20px;

      @include laptop {
        max-width: 454px;
        margin: 0 auto;
      }

      @include mobile {
        border-width: 0;
        padding: 0;
      }
    }

    &__table {
      margin-bottom: 50px;

      @include mobile {
        margin-bottom: 25px;
      }
    }

    &__row {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      padding: 0 10px;
      margin-bottom: 20px;

      @include mobile {
        padding: 0;
        margin-bottom: 10px;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &_header {
        font-weight: 700;
        font-size: 22px;
        line-height: 27px;
        padding-bottom: 9px;
        border-bottom: 1px solid $color-grey-light;
        margin-bottom: 27px;

        @include mobile {
          position: relative;
          padding-left: 0;
          padding-right: 0;
          padding-bottom: 4px;
          margin-bottom: 14px;
          border-bottom: 0;

          &::after {
            content: '';
            position: absolute;
            left: calc((100vw - 95%) / -2);
            bottom: 0;
            display: block;
            width: 100vw;
            height: 1px;
            background-color: $color-grey-light;
          }
        }
      }

      &_gray {
        color: $color-grey;
      }

      &_gap {
        margin-bottom: 40px;

        @include mobile {
          margin-bottom: 25px;
        }
      }
    }

    &__order {
      display: flex;
      justify-content: space-between;
      gap: 17px;

      @include desktop {
        flex-wrap: wrap;
        max-width: 352px;
        margin: 0 auto;
      }
    }

    &__submit {
      outline: none;
      flex-basis: 352px;
      height: 57px;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: $color-secondary;
      background-color: $color-main;
      border: transparent;
      transition: background-color 0.25s ease-in-out, border 0.25s ease-in-out;

      @include mobile {
        font-size: 12px;
        line-height: 15px;
      }

      &:hover {
        background-color: $color-main-sub;
        border: 1px solid $color-main-sub;
      }

      &:focus {
        background-color: $color-main;
        border: 1px solid $color-main-dark;
      }

      &:disabled {
        cursor: default;
        background-color: $color-grey-light;
        border: 1px solid $color-grey-light;
      }
    }

    &__agree {
      flex-basis: 292px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: $color-grey;
    }

    &__agree-link {
      font-weight: 700;
      color: $color-primary;

      &:hover {
        color: $color-main;
      }
    }
  }
</style>
