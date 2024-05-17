<template>
  <q-form class="q-gutter-md">
    <q-input
      v-model="shelter.email"
      label="Email"
      placeholder="exsample@email.com"
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

const confirmPassword = ref<string>();
const shelter = ref<Shelter>({ email: '', password: '', role: 'shelter' });

const onSubmit = async () => {
  try {
    // Wysyłanie danych do API
    const response = await axios.post(
      'http://localhost:5000/auth/register',
      shelter.value
    );
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Error during registration:', error);
    // Tutaj można dodać logikę obsługi błędów
  }
};
</script>
