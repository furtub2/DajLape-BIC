<template>
  <q-form class="q-gutter-md" @submit.prevent="onSubmit" ref="registrationForm">
    <q-input
      v-model="user.email"
      label="Email"
      placeholder="example@email.com"
      :rules="[
        (val) => !!val || 'Email is required',
        (val) => /.+@.+\..+/.test(val) || 'Email must be valid'
      ]"
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
        type="submit"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User } from '../models';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { handleAxiosError } from 'app/utils/errorHandler';

const $q = useQuasar();
const router = useRouter();
const confirmPassword = ref<string>('');
const user = ref<User>({ email: '', password: '', role: 'user' });

const onSubmit = async () => {
  if (!user.value.email || !user.value.password || user.value.password !== confirmPassword.value) {
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
      user.value
    );
    $q.notify({
      type: 'positive',
      message: 'Registration successful!'
    });
    router.push('/SignIn');
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    $q.notify({
      type: 'negative',
      message: errorMessage
    });
  }
};
</script>
