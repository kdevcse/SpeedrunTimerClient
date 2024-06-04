<template>
  <main>
    <RouterView id="main-view" @contextmenu="openContextMenu">
    </RouterView>
    <div>
      <v-menu activator="#main-view" target="cursor">
        <v-list>
          <v-list-item>
            <RouterLink to="/config">Configuration</RouterLink>
          </v-list-item>
          <v-list-item>
            <p>Hello?</p>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { nextTick } from 'vue';

const isSupported = ref(false);
const showContextMenu = ref(true);
const contextMenuPosition = ref({ x: 0, y: 0 });

onMounted(() => {
  isSupported.value = typeof(Worker) !== "undefined";
});

async function openContextMenu(event: MouseEvent) {
  console.log('Opening context menu');
  showContextMenu.value = false;
  event.preventDefault();
  await nextTick();
  showContextMenu.value = true;
  contextMenuPosition.value = {
    x: event.clientX,
    y: event.clientY
  };
}

</script>

<style>
main {
  display: flex;
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
