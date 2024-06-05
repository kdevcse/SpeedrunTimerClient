<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list-item title="Settings"></v-list-item>
      <v-divider></v-divider>
      <v-tabs v-model="tab" direction="vertical">
        <v-tab text="General" value="1"></v-tab>
        <v-tab text="User" value="2"></v-tab>
        <v-tab text="Layout" value="3"></v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-list-item link title="Exit" to="/timer"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <v-confirm-edit class="settings-validation-container">
        <v-tabs-window v-model="tab" class="config-container">
          <v-tabs-window-item value="1">
            <h2>General</h2>
            <v-form>

            </v-form>
          </v-tabs-window-item>
          <v-tabs-window-item value="2">
            <h2>User</h2>
            <v-form>

            </v-form>
          </v-tabs-window-item>
          <v-tabs-window-item value="3">
            <h2>Layout</h2>
            <v-form>

            </v-form>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-confirm-edit>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
//This link shows how to make a collapsable drawer https://vuetifyjs.com/en/components/navigation-drawers/#expand-on-hover
import { ref } from 'vue';

const tab = ref("1");
</script>

<style scoped>
.config-container {
  padding: 2em;
}
.settings-validation-container {
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  bottom: 1em;
}
</style>