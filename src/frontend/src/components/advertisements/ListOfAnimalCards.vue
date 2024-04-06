<template>
  <div v-for="card in cards" :key="card.id" class="q-ma-sm">
    <div v-if="!isLoading">
      <AnimalCardComponent :name="card.name" />
    </div>
    <div v-else>
      <SkeletonAnimalCardComponent />
    </div>
  </div>
</template>
<script setup lang="ts">
import AnimalCardComponent from 'components/animal-card/AnimalCardComponent.vue';
import SkeletonAnimalCardComponent from 'src/components/animal-card/SkeletonAnimalCardComponent.vue';
import { ref } from 'vue';

const isLoading = ref(false);
const cards = [
  { id: 1, name: 'Fafik' },
  { id: 2, name: 'Bolek' },
  { id: 3, name: 'Krotka' },
  { id: 4, name: 'Azazel' },
  { id: 5, name: 'Sysktus' },
  { id: 6, name: 'Leonida' },
];
</script>
