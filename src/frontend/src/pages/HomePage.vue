<template>
  <q-page padding>
    <div class="row justify-center wrap">
      <q-field label="The main categories"/>
      <AnimalsCategories :categories="categories"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AnimalsCategories from 'src/components/AnimalsCategories.vue'
import { ref } from 'vue';

const categories = ref(['Dogs', 'Cats', 'Birds' ])
</script>
