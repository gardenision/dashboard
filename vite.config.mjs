import { fileURLToPath, URL } from 'node:url';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: ['leaflet'],
        noDiscovery: true
    },
    plugins: [
        vue(),
        Components({
            resolvers: [PrimeVueResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            leaflet: path.resolve(__dirname, 'node_modules/leaflet/dist/leaflet-src.esm.js')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://api.gardenision.com',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, '')
                rewrite: (path) => path.replace(/^\/api/, '/api')
            },
            '/auth': {
                target: 'https://api.gardenision.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/auth/, '/broadcasting/auth')
            }
        }
    },
    css: {
        preprocessorOptions: {
            css: {
                // opsional, tapi bisa bantu Vite kenali file CSS dari node_modules
            }
        }
    }
});
