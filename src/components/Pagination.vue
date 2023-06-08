<template>
  <ul class="pagination__list">
    <li class="pagination__item">
      <button
        type="button"
        :class="['pagination__arrow pagination__arrow_start', { pagination__arrow_disabled: currentPage === 1 }]"
        aria-label="Перейти на первую страницу"
        @click="$emit('change-page', 1)" />
    </li>
    <li v-for="pageNumber in totalPages" :key="pageNumber" class="pagination__item">
      <button
        type="button"
        :class="['pagination__link', { pagination__link_active: currentPage === pageNumber }]"
        @click="$emit('change-page', pageNumber)"
        v-text="pageNumber" />
    </li>
    <li class="pagination__item">
      <button
        type="button"
        :class="['pagination__arrow pagination__arrow_end', { pagination__arrow_disabled: currentPage === totalPages }]"
        aria-label="Перейти на последнюю страницу"
        @click="$emit('change-page', totalPages)" />
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'PaginationComponent',
    inheritAttrs: false,
    customOptions: {},
  };
</script>

<script setup>
  defineProps({ totalPages: { type: Number, required: true }, currentPage: { type: Number, required: true } });
  defineEmits(['change-page']);
</script>
