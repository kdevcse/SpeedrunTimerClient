<template>
</template>

<script setup lang="ts">
import ContextMenu from 'primevue/contextmenu';
import { ref } from 'vue';

const contxtMenu = ref();

function show() {
  contxtMenu.value.show();
}


</script>

<style scoped>
</style>