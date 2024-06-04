<template>
  <v-menu :activator="props.activator" target="cursor">
    <v-list>
      <v-list-item>
        <RouterLink to="/config">Configuration</RouterLink>
      </v-list-item>
      <v-list-item>
        <p>Hello?</p>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('ContextMenu mounted');
});
const props = defineProps({
  activator: String
});
const model = defineModel();

</script>

<style scoped>
</style>