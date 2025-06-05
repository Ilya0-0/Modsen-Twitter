import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },

  {
    ...js.configs.recommended,
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'error',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/order': 'off',
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react'],
            ['^next'],
            ['^~'],
            ['^@'],
            ['^'],
            ['^\\.'],
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  {
    ignores: [
      'node_modules/',
      '.next/',
      'dist/',
      'build/',
      '**/*.config.{mjs,js}',
    ],
  },
];
