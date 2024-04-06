<template>
  <q-page padding>
    <q-card>
    <div class="text-h5 q-mb-lg" align="center">The main categories</div>
    <div class="row justify-center wrap">
      <AnimalsCategories :categories="categories"/>
    </div>
  </q-card>
  <q-card flat>
    <div class="text-h5 q-my-lg" align="center">Announcements to be promoted</div>
    <div class="row inline justify-center">
      <ListOfAnimalsCards/>
    </div>
  </q-card>
  </q-page>
</template>

<script setup lang="ts">
import AnimalsCategories from 'src/components/AnimalsCategories.vue'
import ListOfAnimalsCards from 'src/components/advertisements/ListOfAnimalCards.vue'
import { ref } from 'vue';

const categories = ref(['Dogs', 'Cats', 'Birds' ])
</script>
