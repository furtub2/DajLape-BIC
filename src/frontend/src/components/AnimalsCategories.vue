<template>
  <q-list v-for="category in props.categories" :key="category">
    <q-item class="column items-center">
      <q-btn icon="pets" round color="primary" size="xl" />
      <q-label>{{ category }}</q-label>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
const props = defineProps<{
  categories: Array<string>;
}>();
</script>
