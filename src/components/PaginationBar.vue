<!-- PaginationBar.vue -->
<template>
    <div class="pagination-bar" role="group">
      <button :disabled="!previous" @click="$emit('go-previous')">Anterior</button>
      <button v-for="n in totalPages" :key="n" :class="{ active: n === currentPage }" @click="$emit('go-to-page', n)">
        {{ n }}
      </button>
      <button :disabled="!next" @click="$emit('go-next')">Siguiente</button>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    previous: string | null
    next: string | null
    currentPage: number
    totalPages: number
  }>()
  </script>
  
  <style scoped>
  .pagination-bar {
    display: flex;
    justify-content: center;
    gap: 4px;
    box-shadow: none;
  }
  .pagination-bar button {
    font-size: 0.7rem;
    max-width: max-content;
    padding: 0.25rem 0.5rem;
  }
  button.active {
    background-color: var(--pico-primary);
    color: var(--pico-primary-inverse);
  }
  </style>
  