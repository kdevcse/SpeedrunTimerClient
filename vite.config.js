import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true
  },
  plugins: [
    mkcert(),
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Speedrun Timer',
        short_name: 'STA',
        description: 'A highly customizable speedrun timer app',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
});
