<template>
  <q-card flat bordered class="my-card">
    <q-item>
      <q-item-section avatar>
        <q-icon round size="3em" color="grey" name="pets" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ offer.petName }}</div>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item-section height="200px" square>
      <q-img :src="imageUrl"/>
      {{ props.offer.image?.name }}
    </q-item-section>
    
    <q-card-section>
      <div>
        {{ offer.description }} 
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn icon="favorite" flat color="red" size="1.5em" round />
      <q-space />
      <q-btn
        icon="info"
        flat
        round
        color="blue"
        size="1.5em"
        @click="redirectToMoreInfo"
      />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Offer } from '../models';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  offer: Offer;
}>();
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
    if(!props.offer.image)
      return
    const buffer = await props.offer.image.data;
    const base64Image = arrayBufferToBase64(buffer);
    imageUrl.value = `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};
const router = useRouter();
const redirectToMoreInfo = () =>
  router.push(`/moreInfo/?offerId=${props.offer.id}`);
  onMounted(() => {
  fetchImage();
});
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  width: 350px;
}
</style>
