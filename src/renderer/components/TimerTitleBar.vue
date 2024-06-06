<template>
  <!--Shelve in case we figure out a work around-->
  <v-hover v-slot:default="{ isHovering, props }">
    <div v-bind="props" class="toolbar-container">
      <v-expand-transition>
        <v-toolbar absolute :height="isHovering ? 36 : 0">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-spacer>
          </v-spacer>
          <v-btn icon>
            <v-icon class="draggable-area">mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </v-expand-transition>
    </div>
  </v-hover>
</template>

<style scoped>
.draggable-area {
  -webkit-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
}

.toolbar-container {
  height: 36px;
  overflow: hidden;
  z-index: 1;
  -webkit-app-region: no-drag;
}
</style>