<template>
    <button type="button"
      class="text-white flex  items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group border-2 border-gray-700">
      <slot name="icon"></slot>
      <span>{{ title }}</span>
    </button>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    title: String
  });
  </script>