<template>
  <q-page>
    <q-card >
      <q-btn color="primary" flat icon="arrow_back" @click="returnToPreviousSite()"/>
      <ImageSection />
    </q-card>
    <q-card> Contact </q-card>
  </q-page>
</template>
<script setup lang="ts">
import ImageSection from 'components/ImageSection/ImageSection.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const returnToPreviousSite = () => router.back()

</script>
