<template>
  <main>
    <RouterView id="main-view" @contextmenu="openContextMenu"/>
    <ContextMenu ref="menu" :model="items"/>
  </main>
</template>

<script setup lang="ts">
import ContextMenu from 'primevue/contextmenu';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();
const isSupported = ref(false);
const menu = ref();
const items = ref([
  {
    label: 'Configuration',
    command: () => {
      router.push('/config');
    },
  },
]);

onMounted(() => {
  isSupported.value = typeof(Worker) !== "undefined";
});

async function openContextMenu(event: MouseEvent) {
  event.preventDefault();
  menu.value.show(event);
}

</script>

<style>
main {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#main-view {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
}
#main-view::-webkit-scrollbar {
  display: none;
}
</style>
