<template>
  <RouterView v-if="isSupported"/>
  <template v-else>
    <p>Web Workers are not supported in this browser.</p>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isSupported = ref(false);

onMounted(() => {
  isSupported.value = typeof(Worker) !== "undefined";
});

</script>

<style>
</style>
