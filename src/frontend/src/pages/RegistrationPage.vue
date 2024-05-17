<template>
  <div class="row items-center" style="height: 90vh">
    <div class="col-4 offset-1">
      <q-img src="~assets/Logo_Full.png" />
    </div>
    <div class="col-4 offset-1">
      <RegistrationSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import RegistrationSection from 'src/components/RegistrationSection.vue';
</script>
