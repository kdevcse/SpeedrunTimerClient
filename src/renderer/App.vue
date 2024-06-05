<template>
  <RouterView class="router-view"/>
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
