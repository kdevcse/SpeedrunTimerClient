import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Type Error on 'vue' could be related to: https://github.com/vitejs/vite/issues/10481
// Switched to 'node' module resolution as a result

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
});
