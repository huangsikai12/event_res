import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    // host:"172.17.7.32",
    port:5174,
    // proxy:{
    //   "/api":{
    //     target:"http://event.huangsikai.top",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/\/api/, ''), //重写真实路径,替换/api
    //   }
    // }
  },
  plugins: [vue()],
})
