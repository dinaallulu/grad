import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/views/index.blade.php' , 'resources/js/App.jsx'],
            refresh: true,
        }),
        react(),
    ],
    // When i want to call /resources/js -> write @
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
