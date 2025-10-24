import js from '@eslint/js';
import htmlPlugin from 'eslint-plugin-html';

export default [
    // Базовая рекомендованная конфигурация
    js.configs.recommended,

    // Конфигурация для JavaScript файлов
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                // Браузерные глобальные объекты
                document: 'readonly',
                window: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                // Дополнительные браузерные API которые могут понадобиться
                HTMLElement: 'readonly',
                Event: 'readonly',
                CustomEvent: 'readonly'
            }
        },
        plugins: {
            html: htmlPlugin
        },
        rules: {
            'indent': ['error', 4],
            'no-unused-vars': 'error',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-mixed-spaces-and-tabs': 'error',
            'no-multi-spaces': 'error',
            'no-trailing-spaces': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'keyword-spacing': ['error', { 'before': true, 'after': true }],
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'space-infix-ops': 'error',
            'space-before-blocks': 'error'
        }
    },

    // Конфигурация для HTML файлов
    {
        files: ['src/**/*.html'],
        plugins: {
            html: htmlPlugin
        },
        rules: {
            'indent': ['error', 4],
            'no-mixed-spaces-and-tabs': 'error'
        }
    },

    // Игнорируемые файлы и директории
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            '*.min.js'
        ]
    }
];