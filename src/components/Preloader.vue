<template>
  <div class="preloader">
    <img src="@/assets/img/preloader.svg" alt="Загрузка..." />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PreloaderComponent',
    inheritAttrs: false,
    customOptions: {},
  };
</script>

<style lang="scss" scoped>
  .preloader {
    position: absolute;
    inset: 0;
    z-index: 100;
    background-color: $color-secondary;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      transform: rotate(0);
      animation: rotation 1s infinite linear;
    }
  }
</style>
