<template>
  <HeaderComponent />
  <div class="main">
    <RouterView />
  </div>
  <FooterComponent />
</template>

<script lang="ts">
  import HeaderComponent from '@/components/Header.vue';
  import FooterComponent from '@/components/Footer.vue';
  export default {
    components: {
      HeaderComponent,
      FooterComponent,
    },
  };
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
    padding-top: 44px;
    padding-bottom: 120px;

    @include tablet {
      padding-top: 24px;
      padding-bottom: 80px;
    }

    @include mobile {
      padding-top: 35px;
    }
  }
</style>
