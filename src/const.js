export const API_URI = `${location.protocol}//${location.hostname}:3024`;

export const formatPrice = price =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
