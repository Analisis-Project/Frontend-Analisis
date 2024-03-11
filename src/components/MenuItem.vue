<template>
    <li>
      <a @click="showButtons = !showButtons; $emit('open-sidebar') " href="#"
        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
        <slot name="icon"></slot>
        <span v-if="isOpen" class="ms-3">{{ title }}</span>
      </a>
      <div v-if="isOpen && showButtons" class="grid grid-cols-2 gap-4 mt-2 ">
        <slot></slot>
      </div>
    </li>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  
  const props = defineProps({
    title: String,
    isOpen: Boolean
  });
  
  const showButtons = ref(false);
  </script>