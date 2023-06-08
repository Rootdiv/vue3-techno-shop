<template>
  <footer class="footer">
    <h2 class="visually-hidden">Меню и контакты сайта</h2>
    <div class="container footer__container">
      <RouterLink to="/" class="footer__logo-link">
        <img src="@/assets/img/logo.svg" alt="Логотип Techno Shop" class="footer__logo" />
      </RouterLink>
      <div class="footer__column footer__catalog" @click="toggleShowCatalog">
        <h3 :class="['footer__column-title', { 'footer__column-title_open': isShowCatalog }]">Каталог</h3>
        <ul :class="['footer__list', 'footer__list_double', { footer__list_show: isShowCatalog }]">
          <li v-for="(value, category, index) in categories" :key="index" class="footer__item">
            <RouterLink class="footer__link" :to="{ name: 'catalog', query: { category } }">
              {{ value }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="footer__column footer__customer" @click="toggleShowCustomer">
        <h3 :class="['footer__column-title', { 'footer__column-title_open': isShowCustomer }]">Покупателям</h3>
        <ul :class="['footer__list', { footer__list_show: isShowCustomer }]">
          <li class="footer__item">
            <a href="#" class="footer__link">Оплата заказа</a>
          </li>
          <li class="footer__item">
            <a href="#" class="footer__link">Условия доставки</a>
          </li>
          <li class="footer__item">
            <a href="#" class="footer__link">Условия возврата заказа</a>
          </li>
          <li class="footer__item">
            <a href="#" class="footer__link">Блог</a>
          </li>
        </ul>
      </div>
      <div class="footer__column footer__contacts">
        <h3 class="footer__column-title">Контакты</h3>
        <ul class="footer__list footer__list_contacts">
          <li class="footer__item footer__item_contact">
            Тел:
            <a href="tel:+79149239223" class="footer__link">8 914 923 92 - 23</a>
          </li>
          <li class="footer__item footer__item_contact">
            Email:
            <a href="mailto:TechnoSHOP@gmail.com" class="footer__link">TechnoSHOP@gmail.com</a>
          </li>
        </ul>
        <ul class="footer__social social">
          <li class="social__item">
            <a href="#" class="social__link" aria-label="Отправить сообщение в WhatsApp">
              <svg width="26" height="26">
                <use href="@/assets/img/sprite.svg#whatsApp" />
              </svg>
            </a>
          </li>
          <li class="social__item">
            <a href="#" class="social__link" aria-label="Перейти в YouTube">
              <svg width="26" height="26">
                <use href="@/assets/img/sprite.svg#youTube" />
              </svg>
            </a>
          </li>
          <li class="social__item">
            <a href="#" class="social__link" aria-label="Перейти в группу Телеграм">
              <svg width="26" height="26">
                <use href="@/assets/img/sprite.svg#telegram" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer__copyright-brand">&copy; TechnoSHOP, 2022</div>
      <div class="footer__copyright-design design">
        <div class="design__name">Design by Anastasia Ilina</div>
        Tg: <a href="https://t.me/Mrshmallowww" target="_blank" class="design__link">&#64;Mrshmallowww</a>
      </div>
    </div>
  </footer>
</template>

<script>
  import { useStore } from 'vuex';
  import { computed, onMounted, ref } from 'vue';
  import { RouterLink } from 'vue-router';

  export default {
    name: 'FooterComponent',
    components: { RouterLink },
    setup() {
      const isShowCatalog = ref(false);
      const isShowCustomer = ref(false);

      const store = useStore();
      const categories = computed(() => store.state.categories.categories);

      const toggleShowCatalog = () => {
        if (window.innerWidth <= 560) {
          isShowCatalog.value = !isShowCatalog.value;
        }
      };

      const toggleShowCustomer = () => {
        if (window.innerWidth <= 560) {
          isShowCustomer.value = !isShowCustomer.value;
        }
      };

      onMounted(() => {
        store.dispatch('categories/fetchCategory');
      });

      return { categories, isShowCatalog, toggleShowCatalog, isShowCustomer, toggleShowCustomer };
    },
  };
</script>
