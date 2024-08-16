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
        Tg:
        <a href="https://t.me/Mrshmallowww" target="_blank" class="design__link">&#64;Mrshmallowww</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import { useStore } from '@/store';
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

<style lang="scss" scoped>
  .footer {
    background-color: $color-primary;
    color: $color-secondary;
    padding: 80px 0;

    @include laptop {
      padding: 50px 0;
    }

    @include tablet {
      padding: 40px 0;
    }

    @include mobile {
      padding: 25px 0;
    }

    &__container {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr 1fr;
      gap: 30px;
      grid-template-areas: 'logo catalog customer contacts';

      @include laptop {
        grid-template-columns: 395px 235px 280px;
        grid-template-areas:
          'logo . .'
          'catalog customer contacts';
      }

      @include tablet {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          'logo .'
          'catalog contacts'
          'catalog customer';
      }

      @include mobile {
        grid-template-columns: 1fr;
        grid-template-areas:
          'logo'
          'catalog'
          'customer'
          'contacts';
        gap: 15px;
      }
    }

    &__logo-link {
      place-self: start;
      grid-area: logo;

      @include mobile {
        margin-bottom: 15px;
      }
    }

    &__logo {
      width: 146px;
    }

    &__column-title {
      font-weight: 700;
      font-size: 32px;
      line-height: 1.3;
      margin-bottom: 40px;

      @include mobile {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 20px;
        margin-bottom: 0;
        cursor: pointer;

        &::after {
          content: '';
          display: block;
          width: 18px;
          height: 18px;
          background-image: url('@/assets/img/arrow-footer.svg');
          background-repeat: no-repeat;
          background-position: center 1px;
        }

        &_open {
          &::after {
            background-position: center -2px;
            transform: rotate(180deg);
          }
        }
      }
    }

    &__list {
      font-weight: 400;
      font-size: 22px;
      line-height: 1.5;

      @include mobile {
        font-size: 14px;
        line-height: 17px;
        display: none;
        padding-top: 15px;
        padding-bottom: 10px;

        &_show {
          display: block;
        }
      }

      &_double {
        column-count: 2;

        @include laptop {
          column-count: auto;
        }
      }

      &_contacts {
        font-weight: 500;
        font-size: 16px;
        line-height: 1.3;
        margin-bottom: 36px;

        @include mobile {
          font-size: 13px;
          margin-bottom: 20px;
        }
      }
    }

    &__item {
      margin-bottom: 15px;

      &_contact {
        margin-bottom: 21px;

        @include mobile {
          margin-bottom: 15px;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__link {
      transition: color 0.25s ease-in-out;

      &:hover {
        color: $color-main;
      }
    }

    &__catalog {
      grid-area: catalog;
    }

    &__customer {
      grid-area: customer;

      @include mobile {
        margin-bottom: 10px;
      }
    }

    &__contacts {
      grid-area: contacts;

      @include mobile {
        margin-bottom: 25px;

        .footer__column-title {
          cursor: default;

          &::after {
            display: none;
          }
        }

        .footer__list {
          display: block;
        }
      }
    }

    &__copyright {
      &-brand {
        font-weight: 500;
        font-size: 16px;
        line-height: 1.3;
        grid-column: 1;

        @include mobile {
          font-size: 14px;
          margin-bottom: 15px;
        }
      }
    }
  }

  .social {
    display: flex;
    gap: 20px;

    &__link {
      transition: color 0.25s ease-in-out;

      &:hover {
        color: $color-main;
      }
    }
  }

  .design {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.3;
    grid-column: 4;

    @include laptop {
      grid-column: 3;
    }

    @include tablet {
      grid-column: 2;
    }

    @include tablet {
      grid-column: 1;
    }

    @include mobile {
      font-size: 14px;
    }

    &__name {
      margin-bottom: 10px;
    }

    &__link {
      transition: color 0.25s ease-in-out;

      &:hover {
        color: $color-main;
      }
    }
  }
</style>
