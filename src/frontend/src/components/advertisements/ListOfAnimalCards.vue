<template>
  <div v-for="offer in offers" :key="offer.id" class="q-ma-sm">
    <div v-if="!isLoading">
      <AnimalCardComponent :offer="offer" />
    </div>
    <div v-else>
      <SkeletonAnimalCardComponent />
    </div>
  </div>
</template>
<script setup lang="ts">
import AnimalCardComponent from 'components/animal-card/AnimalCardComponent.vue';
import SkeletonAnimalCardComponent from 'src/components/animal-card/SkeletonAnimalCardComponent.vue';
import { onMounted, ref } from 'vue';
import { Offer } from '../models';

const isLoading = ref(false);
const offers = ref<Array<Offer>>();
const getALlOffers = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:5000/getAllOffers');
    const data = await response.json();
    offers.value = data;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    throw error;
  }
};
onMounted(getALlOffers);
</script>
