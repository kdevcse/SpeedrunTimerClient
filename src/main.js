import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { HubConnectionBuilder } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5000/signalr")
  .build();

createApp(App).mount("#app");
