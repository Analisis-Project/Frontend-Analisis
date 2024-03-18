<template>
  <vue-pdf-app style="height: 100vh;" :pdf="pdf"></vue-pdf-app>
</template>

<script>
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
import pdf from '../assets/documents/Manual-Usuario-para-graphx.pdf';

export default {
  components: {
    VuePdfApp
  },
  data() {
    return {
      pdf
    }
  }
};
</script>