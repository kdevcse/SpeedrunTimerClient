<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list-item title="Settings"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="General"></v-list-item>
      <v-list-item link title="User"></v-list-item>
      <v-list-item link title="Layout"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Back" to="/timer"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <h1>Configuration</h1>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
//This link shows how to make a collapsable drawer https://vuetifyjs.com/en/components/navigation-drawers/#expand-on-hover
</script>

<style scoped>
</style>