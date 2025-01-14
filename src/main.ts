import { createApp } from "vue";
import "./global-style.css"; // Global style
import App from "./App.vue";
import Router from "./router";
import { preloadWasm } from "./livesplit-core/preload";

// PrimeVue
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

preloadWasm();

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

createApp(App).use(vuetify).use(Router).mount("#app");
