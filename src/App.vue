<script setup>
import { onMounted, ref } from 'vue';
import Stopwatch from './components/Stopwatch.vue';

const isSupported = ref(false);

onMounted(() => {
  isSupported.value = typeof(Worker) !== "undefined";
});

</script>

<template>
  <div>
    <stopwatch v-if="isSupported"></stopwatch>
    <div v-else>
      <p>Sorry, your browser does not support this application</p>
    </div>
  </div>
</template>

<style scoped>
</style>
