<template>
  <div class="overlay" :class="{ overlay_open: statusSend }" @click="closeModal">
    <div class="modal" :class="{ modal_open: statusSend }">
      <div v-show="statusSend === 'confirm'" class="confirm">
        <div class="confirm__title">Ваша заявка успешно отправлена</div>
        <div class="confirm__message">
          <b>Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</b>
        </div>
        <div class="confirm__icon">
          <svg width="100" height="100">
            <use href="@/assets/img/sprite.svg#confirm"></use>
          </svg>
        </div>
      </div>
      <div v-show="statusSend === 'error'" class="error">
        <div class="error__title">Упс... Что-то пошло не так</div>
        <div class="error__message">
          <b>Не удалось отправить заказ. Пожалуйста, повторите отправку еще раз</b>
        </div>
        <div class="error__icon">
          <svg width="100" height="100">
            <use href="@/assets/img/sprite.svg#error"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, watch } from 'vue';
  export default {
    name: 'SendModal',
    props: { sended: { type: String, required: true } },
    emits: ['update:sended'],
    setup(props, { emit }) {
      const statusSend = ref('');

      const closeModal = () => {
        statusSend.value = '';
        emit('update:sended', '');
      };

      watch(props, () => {
        statusSend.value = props.sended;
      });

      return { statusSend, closeModal };
    },
  };
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-timing-function: ease-in-out;

    &_open {
      opacity: 100%;
      visibility: visible;
    }
  }

  .modal {
    max-width: 980px;
    width: 100%;
    margin: auto;
    padding: 77px 0 85px;
    background-color: #fff;
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-timing-function: ease-in-out;

    &_open {
      visibility: visible;
      opacity: 100%;
    }

    @include tablet {
      max-width: 780px;
    }

    @include mobile {
      max-width: 420px;
    }
  }

  .confirm,
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    &__title {
      max-width: 580px;
      font-size: 34px;
      line-height: 1.5;
      margin-bottom: 40px;

      @include mobile {
        max-width: 320px;
        font-size: 22px;
      }
    }

    &__message {
      max-width: 624px;
      font-weight: 700;
      font-size: 18px;
      line-height: 1.5;
      margin-bottom: 64px;

      @include mobile {
        max-width: 250px;
        font-size: 14px;
      }
    }
  }
</style>
