import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router';
import { store, key } from './store';

createApp(App).use(router).use(store, key).mount('#app');
