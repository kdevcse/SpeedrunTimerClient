import { createApp } from "vue";
import "./global-style.css"; // Global style
import App from "./App.vue";
import Router from "./router";

// PrimeVue
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-indigo/theme.css'; // theme

createApp(App).use(PrimeVue).use(Router).mount("#app");
