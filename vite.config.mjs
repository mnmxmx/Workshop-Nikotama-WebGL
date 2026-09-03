import { resolve } from 'path';
import glsl from 'vite-plugin-glsl'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src');

export default {
  root,
  base: "/",
  publicDir: "../public",
  build: {
    outDir: "../build",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
      },
    },
  },
  plugins: [
    glsl({
      include: ['**/*.glsl', '**/*.vert', '**/*.frag'],
      warnDuplicatedImports: true,
      compress: false,
    }),
    react()
  ],
  server: {
    open: true,
    host: true,
  }
};