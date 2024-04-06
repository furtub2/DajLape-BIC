<template>
  <q-card flat bordered class="my-card">
    <q-item>
      <q-item-section avatar>
        <q-skeleton type="QAvatar" animation="fade" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" animation="fade" />
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-skeleton height="200px" square animation="fade" />

    <q-card-section>
      <q-skeleton type="text" class="text-subtitle2" animation="fade" />
      <q-skeleton type="text" class="text-subtitle2" animation="fade" />
      <q-skeleton type="text" class="text-subtitle2" animation="fade" />
      <q-skeleton
        type="text"
        width="50%"
        class="text-subtitle2"
        animation="fade"
      />
    </q-card-section>
    <q-card-actions>
      <q-skeleton type="circle" animation="fade" size="3em" />
      <q-space />
      <q-skeleton type="circle" animation="fade" size="3em" />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
