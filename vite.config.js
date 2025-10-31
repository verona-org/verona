import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: './src/js/script.js',
            name: 'App',
            fileName: 'app'
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {
                    gsap: 'gsap'
                }
            }
        }
    },
    server: {
        port: 3001,
    },
    resolve: {
        // Явно указываем условия разрешения модулей
        mainFields: ['module', 'jsnext:main', 'jsnext', 'main']
    }
})