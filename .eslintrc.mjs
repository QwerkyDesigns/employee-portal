export default {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:tailwindcss/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'next',
        'next/core-web-vitals'
    ],

    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js'],
            parser: '@typescript-eslint/parser'
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tailwindcss: true
        },
        project: './tsconfig.json'
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'tailwindcss'],
    rules: {
        indent: ['off', 4],
        'linebreak-style': ['off', 'unix'],
        quotes: ['off', 'single'],
        semi: ['off', 'always'],
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'tailwindcss/classnames-order': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/no-contradicting-classname': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@next/next/no-img-element': 'off'

    }
};
