<template>
  <div class="flex h-screen bg-[#0e1117]">
    <Navbar :isOpen="isOpen" @toggle="isOpen = !isOpen" />
    <div class="flex-grow bg-[#0e1117]">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';

</script>