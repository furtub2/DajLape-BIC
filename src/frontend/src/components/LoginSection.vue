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
<script setup lang="ts"></script>
