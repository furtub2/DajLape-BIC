<template>
  <q-card flat bordered class="my-card">
    <q-item>
      <q-item-section avatar>
        <q-icon round size="3em" color="grey" name="pets" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ props.name }}</div>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item-section height="200px" square>
      <q-img>
        <div class="absolute-full text-subtitle2 flex flex-center">
          here will be photo
        </div>
      </q-img>
    </q-item-section>

    <q-card-section>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptate
        recusandae rem pariatur aliquid, animi reiciendis sit explicabo debitis?
        Ab reiciendis soluta culpa quos nam nihil accusamus sed, eius laborum.
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn icon="favorite" flat color="red" size="1.5em" round />
      <q-space />
      <q-btn icon="info" flat round color="blue" size="1.5em" />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts" setup>
const props = defineProps<{
  name: string;
}>();
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
