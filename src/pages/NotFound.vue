<template>
  <div class="root">
    <h1>Ничего не найдено</h1>
    <p class="description">Информация по адресу {{ currentUrl }} отсутствует в нашем интернет-магазине</p>
  </div>
</template>

<script setup>
  const currentUrl = window.location;
  defineEmits(['vnode-unmounted']);
</script>

<style scoped>
  .root {
    padding: 100px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .description {
    padding-top: 10px;
    font-size: 22px;
  }
</style>
