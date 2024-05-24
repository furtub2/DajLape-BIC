<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card>
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">{{ editMode ? 'Edit Offer' : 'Create a New Offer' }}</div>
          <q-btn icon="close" flat round dense @click="dialogVisible = false" />
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            v-model="offer.petName"
            label="Pet Name"
            placeholder="Enter pet name"
            :rules="[(val) => !!val || 'Pet name is required']"
          />
          <q-input
            v-model="offer.age"
            label="Age"
            placeholder="Enter pet age"
            type="number"
            :rules="[(val) => !!val || 'Age is required']"
          />
          <q-input
            v-model="offer.description"
            label="Description"
            placeholder="Enter pet description"
            type="textarea"
            :rules="[(val) => !!val || 'Description is required']"
          />
          <q-select
            v-model="offer.petType"
            label="Pet Type"
            :options="['dog', 'cat']"
            :rules="[(val) => !!val || 'Pet type is required']"
          />
          <q-input
            v-model="offer.localization"
            label="Localization"
            placeholder="Enter localization"
            :rules="[(val) => !!val || 'Localization is required']"
          />
          <q-input
            v-model="offer.breeds"
            label="Breeds"
            placeholder="Enter breeds"
            :rules="[(val) => !!val || 'Breeds are required']"
          />
          <q-input
            label="Upload Image"
            type="file"
            @change="onFileChange"
            accept="image/*"
          />
          <div class="row justify-end q-mt-md">
            <q-btn flat label="Cancel" @click="dialogVisible = false" />
            <q-btn
              class="q-ml-sm"
              color="primary"
              :label="editMode ? 'Update Offer' : 'Create Offer'"
              rounded
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from 'src/store/session';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { BaseOffer } from './models';
import { handleAxiosError } from 'app/utils/errorHandler';


const props = defineProps<{
  isOpen: boolean,
  editMode: boolean,
  offerData: BaseOffer | null,
}>();

const emit = defineEmits(['update:isOpen', 'offerSaved']);

const dialogVisible = ref(props.isOpen);
const $q = useQuasar();
const sessionStore = useSessionStore();
const offer = ref<BaseOffer>({
  image: '',
  petName: '',
  age: '',
  description: '',
  petType: 'dog',
  localization: '',
  breeds: '',
  shelterId: sessionStore.getUserId || undefined,
});

watch(() => props.isOpen, (newVal) => {
  dialogVisible.value = newVal;
  if (newVal) {
    resetForm();
    if (props.editMode && props.offerData) {
      offer.value = { ...props.offerData };
    }
  }
});

watch(dialogVisible, (newVal) => {
  if (!newVal) {
    emit('update:isOpen', false);
  }
});

const resetForm = () => {
  offer.value = {
    image: '',
    petName: '',
    age: '',
    description: '',
    petType: 'dog',
    localization: '',
    breeds: '',
    shelterId: sessionStore.getUserId || undefined,
  };
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      offer.value.image = file.name; // Store the image name
      // Save the image to the frontend server
      saveImage(file);
    };
    reader.readAsDataURL(file);
  }
};

const saveImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    await axios.post('/images', formData); // Adjust the endpoint as necessary
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const onSubmit = async () => {
  try {
    if (!sessionStore.token) {
      throw new Error('User not authenticated');
    }
    if (!offer.value.shelterId) {
      throw new Error('Shelter ID not found');
    }

    const endpoint = props.editMode
      ? 'http://localhost:5000/shelter/updateOffer'
      : 'http://localhost:5000/shelter/createOffer';

    const response = await axios.post(endpoint, offer.value, {
      headers: {
        Authorization: `Bearer ${sessionStore.token}`,
      },
    });
    console.log('Offer saved successfully:', response.data);
    $q.notify({
      type: 'positive',
      message: `Offer ${props.editMode ? 'updated' : 'created'} successfully!`,
    });
    emit('offerSaved', response.data);
    dialogVisible.value = false;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    $q.notify({
      type: 'negative',
      message: errorMessage,
    });
    console.error(`Error ${props.editMode ? 'updating' : 'creating'} offer:`, error);
  }
};
</script>
