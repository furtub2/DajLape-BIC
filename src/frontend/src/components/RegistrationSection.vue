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
          <h4 class="text h-2 text-uppercase q-my-none text-weight-regular">
            <span style="color: #f34d3d">Sign Up</span>
          </h4>
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="row justify-center">
      <q-btn-toggle
        v-model="selectRole"
        push
        glossy
        dense
        toggle-color="primary"
        :options="roles"
      />
    </q-card-actions>
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-input label="Username" placeholder="exsample@email.com" />
        <q-input
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
          ></q-btn>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const selectRole = ref('shelter');
const roles = ref([
  { label: 'Shelter', value: 'shelter' },
  { label: 'User', value: 'user' },
]);
</script>
