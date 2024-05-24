<template>
  <q-card>
    <q-card-section>
      <q-avatar size="100px" class="absolute-center">
        <q-img src="~assets/Logo.svg" alt="avatar" />
      </q-avatar>
    </q-card-section>
    <q-card-section>
      <div class="q-pt-lg">
        <div class="col text-h6 ellipsis flex justify-center">
          <h2 class="text h-2 text-uppercase q-my-none text-weight-regular">
            <span style="color: #f34d3d">Hello!</span>
          </h2>
        </div>
      </div>
      <div>
        <p class="row inline justify-center items-center">
          <label>
            Login in a way that is convenient for you. If you don't have an
            account yet
          </label>
          <q-btn flat color="primary" dense label="put them on now." @click="goToSignUp"/>
        </p>
      </div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md" @submit.prevent="onSubmit">
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
        <div>
          <q-btn
            class="full-width"
            color="primary"
            label="Login"
            rounded
            type="submit"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User } from './models';
import { useSessionStore } from 'src/store/session';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { handleAxiosError } from 'app/utils/errorHandler';

const $q = useQuasar();
const sessionStore = useSessionStore();
const router = useRouter();
const user = ref<User>({ email: '', password: '' });

const onSubmit = async () => {
  if (!user.value.email || !user.value.password) {
    $q.notify({
      type: 'negative',
      message: 'Please fill out all fields correctly.'
    });
    return;
  }

  try {
    await sessionStore.login(user.value.email, user.value.password);
    $q.notify({
      type: 'positive',
      message: 'Login successful!'
    });
    router.push('/');
    console.log('Login successful');
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    $q.notify({
      type: 'negative',
      message: errorMessage
    });
    console.error('Login failed', error);
  }
};

const goToSignUp = () => {
  router.push('/SignUp');
};
</script>
