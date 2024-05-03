<template>
  <q-layout view="hLh lpr lFf">
    <q-header elevated>
      <q-toolbar glossy>
        <q-toolbar-title
          style="cursor: pointer"
          @click="redirectToHomePage">
          <q-icon name="img:src/assets/Logo.svg" size="xl"/>  Podaj Łapę
        </q-toolbar-title>
        <q-space/>
        <q-btn label="Sign In" flat @click="router.push('/LoginPage')"/>
        <q-btn label="Sign Up" flat @click="console.log('register')"/>
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
import { useRouter } from 'vue-router';

const router = useRouter()
// const leftDrawerOpen = ref(false);

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }


const redirectToHomePage = () => router.push('/')
</script>
