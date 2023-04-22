<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Stopwatch from './components/Stopwatch.vue';
import { SpeedrunInfo } from '../common/types/speedrun';

const isSupported = ref(false);
const speedrun: SpeedrunInfo = 
{
  title: 'My Speedrun',
  game: 'Banjo Cowzooie',
  splits: [
    {
      name: 'spiral mountain'
    },
    {
      name: 'Mumbo\'s Mountain'
    },
    {
      name: 'TTC'
    }
  ]
};

onMounted(() => {
  isSupported.value = typeof(Worker) !== "undefined";
});

</script>

<template>
  <div>
    <stopwatch :speedrun="speedrun" v-if="isSupported"></stopwatch>
    <div v-else>
      <p>Sorry, your browser does not support this application</p>
    </div>
  </div>
</template>

<style scoped>
</style>
