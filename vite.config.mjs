import { resolve } from 'path';
import glsl from 'vite-plugin-glsl'
const root = resolve(__dirname, 'src');
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

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
        allAssets: resolve(root, 'all-assets', 'index.html'),
        index: resolve(root, 'index.html'),

      },
    },
  },
  plugins: [
    glsl(
      {
        include: [
          '**/*.glsl', '**/*.wgsl',
          '**/*.vert', '**/*.frag',
          '**/*.vs', '**/*.fs'
        ],
        exclude: undefined,          // Glob pattern, or array of glob patterns to ignore
        warnDuplicatedImports: true, // Warn if the same chunk was imported multiple times
        defaultExtension: 'glsl',    // Shader suffix when no extension is specified
        compress: false,             // Compress output shader code
        watch: true,                 // Recompile shader on change
        root: '/'                    // Directory for root imports
      }
    ),
    vue(),
    react()
  ],
  server: {
    open: true,
    host: true,
  }
};