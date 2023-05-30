<template>
  <ul class="pagination__list">
    <li class="pagination__item">
      <button
        type="button"
        @click="$emit('change-page', 1)"
        :class="['pagination__arrow pagination__arrow_start', { pagination__arrow_disabled: currentPage === 1 }]"
        aria-label="Перейти на первую страницу" />
    </li>
    <li v-for="pageNumber in totalPages" :key="pageNumber" class="pagination__item">
      <button
        type="button"
        @click="$emit('change-page', pageNumber)"
        :class="['pagination__link', { pagination__link_active: currentPage === pageNumber }]"
        v-text="pageNumber" />
    </li>
    <li class="pagination__item">
      <button
        type="button"
        @click="$emit('change-page', totalPages)"
        :class="['pagination__arrow pagination__arrow_end', { pagination__arrow_disabled: currentPage === totalPages }]"
        aria-label="Перейти на последнюю страницу" />
    </li>
  </ul>
</template>

<script setup>
  defineProps({ totalPages: Number, currentPage: Number });
  defineEmits(['change-page']);
</script>
