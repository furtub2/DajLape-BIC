<template>
  <div>
    <q-carousel
    v-model="slide"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
    >
    <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const slide = ref(1);
</script>
