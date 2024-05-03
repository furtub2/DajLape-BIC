<template>
  <q-page padding >
    <q-btn color="primary" flat icon="arrow_back" @click="returnToPreviousSite()"/>
    <div class="row q-gutter-md">
    <div class="col-7 q-gutter-sm">
      <q-card >
        <div class="text-h4 q-pa-sm">Name</div>
      <ImageSection class="q-pa-md"/>
    </q-card>
    <q-card>
        Description
      </q-card>
    </div>
    <div class="col-4 q-gutter-sm">
      <q-card> Contact </q-card>

      <q-card >Shelter Info</q-card>
      <q-card>Localization</q-card>
    </div>
    <div>
      <q-card>Other proposition</q-card>
    </div>
  </div>


  </q-page>
</template>
<script setup lang="ts">
import ImageSection from 'components/ImageSection/ImageSection.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const returnToPreviousSite = () => router.back()

</script>
