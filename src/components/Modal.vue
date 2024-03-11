<template>
      <div v-show="isModalVisible">
        <p>Holaaaaaaa</p>
        <div class="absolute bg-black opacity-70 inset-0 z-0"></div>
        <div class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
          <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
              <!-- Aquí va el slot para el contenido del modal -->
              <slot name="content"></slot>
            </div>
            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <!-- Aquí van los slots para los botones del modal -->
              <slot name="buttons"></slot>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  
  const props = defineProps({
    isModalVisible: Boolean
  });
  </script>