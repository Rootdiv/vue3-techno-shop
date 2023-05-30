<template>
  <Header />
  <div class="main">
    <RouterView />
  </div>
  <Footer />
</template>

<script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  export default {
    components: {
      Header,
      Footer,
    },
  };
</script>
