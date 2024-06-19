import { defineConfig } from 'vite';
import { resolve, basename } from 'path';
import * as glob from 'glob';

// Get all files in the 'src/renderer/workers' directory
const workerFiles = glob.sync('src/renderer/workers/*.ts');

// Create an entry for each worker file
const workerEntries = Object.fromEntries(
  workerFiles.map((file) => [
    basename(file, '.ts'), // Use the base name of the file as the key
    resolve(__dirname, file), // Use the absolute path of the file as the value
  ])
);

export default defineConfig({
  build: {
    outDir: '.vite/renderer/main_window/assets/workers',
    target: 'esnext',
    rollupOptions: {
      input: workerEntries,
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
});