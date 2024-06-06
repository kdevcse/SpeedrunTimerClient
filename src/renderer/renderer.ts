import { createApp } from "vue";
import "./global-style.css"; // Global style
import App from "./App.vue";
import Router from "./router";

// PrimeVue
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

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
