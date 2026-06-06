import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'PukangDatav',
      fileName: (format) => (format === 'es' ? 'pukang-datav.es.js' : 'pukang-datav.umd.cjs'),
      cssFileName: 'pukang-datav',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue', 'echarts'],
      output: {
        globals: {
          vue: 'Vue',
          echarts: 'echarts',
        },
        exports: 'named',
      },
    },
  },
})
