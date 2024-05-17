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
          <label
            >Login in a way that is convenient for you. If you don't have an
            account yet</label
          >
          <q-btn flat color="primary" dense label="put them on now." />
        </p>
      </div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-input v-model="user.email" label="Email" placeholder="exsample@email.com" />
        <q-input
          v-model="user.password"
          label="Password"
          placeholder="**************"
          type="password"
        />
        <div>
          <q-btn
            class="full-width"
            color="primary"
            label="Login"
            rounded
            @click="onSubmit"
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
const sessionStore = useSessionStore();
const router = useRouter();
const user = ref<User>({email:'',password:''});
const onSubmit = async () => {
  try {
    await sessionStore.login(user.value.email, user.value.password);
    // Redirect or show success message
    router.push('/')
    console.log('Login successful');
  } catch (error) {
    console.error('Login failed', error);
    // Show error message
  }
};
</script>
