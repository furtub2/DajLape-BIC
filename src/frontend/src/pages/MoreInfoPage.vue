<template>
  <q-page padding>
    <q-btn
      color="primary"
      flat
      icon="arrow_back"
      @click="returnToPreviousSite()"
    />
    <div class="row q-gutter-md">
      <div class="col-7 q-gutter-sm">
        <q-card>
          <div class="text-h4 q-pa-sm">{{ offer?.petName }}</div>
          <ImageSection class="q-pa-md" :imageUrl="imageUrl"/>
        </q-card>
        <q-card>
          {{ offer?.description }}
        </q-card>
      </div>
      <div class="col-4 q-gutter-sm">
        <q-card></q-card>

        <q-card>Shelter Info</q-card>
        <q-card>Localization: {{ offer?.localization }}</q-card>
      </div>
      <div>
        <q-card>Other proposition</q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import ImageSection from 'components/ImageSection/ImageSection.vue';
import { Offer } from 'src/components/models';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const offer = ref<Offer>();

const shelter = ref();

const imageUrl = ref();

const arrayBufferToBase64 = (buffer:Buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const fetchImage = async () => {
  try {
    if(!offer.value || !offer.value.image)
      return
    const buffer = await offer.value.image.data;
    const base64Image = arrayBufferToBase64(buffer);
    imageUrl.value = `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};
const getOffer = async () => {
  try {
    const { offerId } = router.currentRoute.value.query;
    const response = await fetch(
      `http://localhost:5000/getSpecificOffer/?offerId=${offerId}`
    );
    offer.value = await response.json();
    fetchImage(offer.value?.image)
  } catch (error) {
    throw error;
  }
};
const getShelterInfo = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/getShelterInfo/?shelterId=${offer.value?.shelterId}`
    );
    shelter.value = await response.json();
  } catch (error) {
    throw error;
  }
};

const returnToPreviousSite = () => router.back();
onMounted(getOffer);
onMounted(getShelterInfo);
</script>
