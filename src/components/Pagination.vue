<template>
  <ul class="pagination__list">
    <li class="pagination__item">
      <button
        type="button"
        :class="[
          'pagination__arrow pagination__arrow_start',
          { pagination__arrow_disabled: currentPage === 1 },
        ]"
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
        :class="[
          'pagination__arrow pagination__arrow_end',
          { pagination__arrow_disabled: currentPage === totalPages },
        ]"
        aria-label="Перейти на последнюю страницу"
        @click="$emit('change-page', totalPages)" />
    </li>
  </ul>
</template>

<script lang="ts">
  export default {
    name: 'PaginationComponent',
    inheritAttrs: false,
    customOptions: {},
  };
</script>

<script setup lang="ts">
  defineProps({
    totalPages: { type: Number, required: true },
    currentPage: { type: Number, required: true },
  });
  defineEmits(['change-page']);
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 21px;
    font-size: 18px;
    line-height: 22px;

    &__arrow {
      display: block;
      width: 18px;
      height: 18px;
      border: none;
      background-color: transparent;
      background-image: url('@/assets/img/arrow.svg');
      background-repeat: no-repeat;
      background-position: center;

      &_start {
        transform: rotate(180deg);
      }

      &:hover {
        color: $color-main;
      }

      &_disabled {
        opacity: 30%;
        pointer-events: none;
      }
    }

    &__list {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 2px solid transparent;
      border-radius: 2px;
      background-color: transparent;
      transition: border-color 0.2s ease, color 0.25s ease-in-out;

      &:hover {
        color: $color-main;
      }

      &_active {
        border-color: $color-main;
        pointer-events: none;
      }
    }
  }
</style>
