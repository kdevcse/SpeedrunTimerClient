<script setup>
import { ref } from 'vue'
import {signalR} from '@microsoft/signalr';

defineProps({
  msg: String,
})

const count = ref(0)

function connectSingalR() {
  
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
}
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
