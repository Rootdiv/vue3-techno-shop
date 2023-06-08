<template>
  <HeaderComponent />
  <div class="main">
    <RouterView />
  </div>
  <FooterComponent />
</template>

<script>
  import HeaderComponent from '@/components/Header.vue';
  import FooterComponent from '@/components/Footer.vue';
  export default {
    components: {
      HeaderComponent,
      FooterComponent,
    },
  };
</script>
