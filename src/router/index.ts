import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/pages/Catalog.vue';
import Cart from '@/pages/Cart.vue';
import Card from '@/pages/Card.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  {
    name: 'catalog',
    //Параметр category может отсутствовать
    path: '/',
    alias: ['/filter', '/search'],
    component: Catalog,
  },
  {
    //Если :id не передан, возвращаем на главную
    path: '/card',
    redirect: '/',
  },
  {
    name: 'card',
    //Путь будет найден, только если :id состоит из цифр
    path: '/card/:id(\\d+)',
    component: Card,
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart,
  },
  {
    //Путь для ошибки 404
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ el: 'body', top: 0, behavior: 'smooth' }),
});

export default router;
