<template>
  <q-carousel
    v-model="slide"
    swipeable
    animated
    control-color="white"
    navigation
    padding
    arrows
  >
    <q-carousel-slide
      :name="1"
      :img-src="imgUrl"
    />
    {{ imgUrl }}
  </q-carousel>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps({
  imageUrl:String
})
const imgUrl = computed(() => props.imageUrl)
const slide = ref(1);
</script>
