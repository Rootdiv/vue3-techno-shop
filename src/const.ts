export const API_URI = import.meta.env.DEV ? 'http://localhost:3024' : 'https://api.rootdiv.ru/ts';

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
