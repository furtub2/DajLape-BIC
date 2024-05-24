<template>
    <q-dialog v-model="dialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete Offer</div>
        </q-card-section>
  
        <q-card-section>
          <p>Are you sure you want to delete this offer?</p>
          <div class="q-gutter-md">
            <q-btn color="negative" label="Delete" @click="deleteOffer" />
            <q-btn flat label="Cancel" @click="dialogVisible = false" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue';
  import axios from 'axios';
  import { useQuasar } from 'quasar';
  import { useSessionStore } from 'src/store/session';
import { handleAxiosError } from 'app/utils/errorHandler';
  
  const props = defineProps({
    isOpen: Boolean,
    offerId: Number,
  });
  
  const emit = defineEmits(['update:isOpen', 'offerDeleted']);
  
  const dialogVisible = ref(props.isOpen);
  
  watch(() => props.isOpen, (newVal) => {
    dialogVisible.value = newVal;
  });
  
  watch(dialogVisible, (newVal) => {
    if (!newVal) {
      emit('update:isOpen', false);
    }
  });
  
  const $q = useQuasar();
  const sessionStore = useSessionStore();
  
  const deleteOffer = async () => {
    try {
      await axios.delete(`http://localhost:5000/shelter/deleteOffer/${props.offerId}`, {
        headers: {
          Authorization: `Bearer ${sessionStore.token}`,
        },
      });
      $q.notify({
        type: 'positive',
        message: 'Offer deleted successfully!',
      });
      emit('offerDeleted', props.offerId);
      dialogVisible.value = false;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      $q.notify({
        type: 'negative',
        message: errorMessage,
      });
      console.error('Error deleting offer:', error);
    }
  };
  </script>
  