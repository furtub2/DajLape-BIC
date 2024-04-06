<template>
  <div class="row">
    <q-input
      v-model="searchAnimal"
      placeholder="Find friend for you"
      class="col-6"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-separator horizontal />
    <q-input v-model="searchPlace" placeholder="The whole poland" class="col-4">
      <template #prepend>
        <q-icon name="place" />
      </template>
    </q-input>
    <q-btn icon="search" class="col-2" color="primary" label="search" square />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const searchAnimal = ref();
const searchPlace = ref();
</script>
