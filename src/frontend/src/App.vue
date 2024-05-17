<template>
  <router-view />
</template>

<script setup lang="ts">
import { useSessionStore } from './store/session';

const sessionStore = useSessionStore();
sessionStore.$subscribe((mutation, state) => {
  if(state.token)
  localStorage.setItem('token', state.token);
});
</script>
