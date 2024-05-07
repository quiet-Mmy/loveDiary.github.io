import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/',            //阿里云
  // base: '/love-diary/',     //gitee
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/themes/variable.scss" as *;'
      }
    }
  },

  server: {
    port: 1100,
    open: true,
    proxy: {
      // '/api': {
      //   target: 'https://www.mrwan.top',
      //   changeOrigin: true,
      //   ws: true,
      // },
    },
  },
  devServer: {
    port: 10000,
  },
})
