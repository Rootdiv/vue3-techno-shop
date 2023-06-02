<template>
  <div class="overlay" :class="{ overlay_open: statusSend }" @click="closeModal">
    <div class="modal" :class="{ modal_open: statusSend }">
      <div class="confirm" v-show="statusSend === 'confirm'">
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

<script>
  import { ref, watch } from 'vue';
  export default {
    name: 'SendModal',
    props: { sended: String },
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
    emits: ['update:sended'],
  };
</script>
