<template>
  <q-form class="q-gutter-md" @submit.prevent="onSubmit" ref="registrationForm">
    <q-input
      v-model="shelter.email"
      label="Email"
      placeholder="example@email.com"
      :rules="[
        (val) => !!val || 'Email is required',
        (val) => /.+@.+\..+/.test(val) || 'Email must be valid'
      ]"
    />
    <q-input
      v-model="shelter.password"
      label="Password"
      placeholder="**************"
      type="password"
      :rules="[(val) => !!val || 'Password is required']"
    />
    <q-input
      v-model="confirmPassword"
      label="Confirm Password"
      type="password"
      placeholder="**************"
      :rules="[
        (val) => !!val || 'Confirm Password is required',
        (val) => val === shelter.password || 'Passwords must match',
      ]"
    />
    <div>
      <q-btn
        class="full-width"
        color="primary"
        label="Register"
        rounded
        @click="onSubmit"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Shelter } from '../models';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { handleAxiosError } from 'app/utils/errorHandler';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const confirmPassword = ref<string>('');
const shelter = ref<Shelter>({ email: '', password: '', role: 'shelter' });

const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const onSubmit = async () => {
  if (!shelter.value.email || !shelter.value.password || shelter.value.password !== confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: 'Please fill out all fields correctly.'
    });
    return;
  }

  try {
    // Wysyłanie danych do API
    await axios.post(
      'http://localhost:5000/auth/register',
      shelter.value
    );
    $q.notify({
      type: 'positive',
      message: 'Registration successful!'
    });
    errorMessage.value = null;
    router.push('/SignIn');
  } catch (error) {
    errorMessage.value = handleAxiosError(error);
    $q.notify({
      type: 'negative',
      message: errorMessage.value
    });
    successMessage.value=null
  }
};
</script>
