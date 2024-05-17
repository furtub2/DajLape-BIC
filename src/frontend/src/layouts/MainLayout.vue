<template>
  <q-layout view="hLh lpr lFf">
    <q-header elevated>
      <q-toolbar glossy>
        <q-toolbar-title style="cursor: pointer" @click="redirectToHomePage">
          <q-icon name="img:src/assets/Logo.svg" size="xl" /> Podaj Łapę
        </q-toolbar-title>
        <q-space />
        <div v-if="!isLoggedIn">
        <q-btn label="Sign In" flat @click="router.push('/SignIn')" />
        <q-btn label="Sign Up" flat @click="router.push('/SignUp')" />
      </div>
      <div v-if="isLoggedIn">
        <q-btn v-if="isShelter" label="Create Offer" flat @click="redirectToCreateOffer"/>
        <q-btn  label="Logout" flat @click="logout" />
      </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <SearchBar />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import SearchBar from 'src/components/SearchBar.vue';
import { useSessionStore } from 'src/store/session';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const sessionStore = useSessionStore();

const isLoggedIn = computed(() => sessionStore.isLoggedIn);
const isShelter = computed(() => sessionStore.isShelter)

const redirectToHomePage = () => router.push('/');

const logout = () => {
  sessionStore.logout();
  redirectToHomePage();
}
const redirectToCreateOffer = () => router.push('/CreateOffer')
</script>
