<template>
  <q-form class="q-gutter-md">
    <q-input
      v-model="user.email"
      label="Email"
      placeholder="exsample@email.com"
    />
    <q-input
      v-model="user.password"
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
        (val) => val === user.password || 'Passwords must match',
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
import { User } from '../models';
import axios from 'axios';

const confirmPassword = ref<string>();
const user = ref<User>({ email: '', password: '', role: 'user' });

const onSubmit = async () => {
  try {
    // Wysyłanie danych do API
    const response = await axios.post(
      'http://localhost:5000/auth/register',
      user.value
    );
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Error during registration:', error);
    // Tutaj można dodać logikę obsługi błędów
  }
};
</script>
