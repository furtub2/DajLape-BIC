<template>
    <div>
      <div v-if="!isLoading">
      <AnimalCardComponent />
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
</script>
