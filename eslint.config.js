import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import {defineConfig, globalIgnores} from 'eslint/config';
import {FlatCompat} from '@eslint/eslintrc';

const compat = new FlatCompat();

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      ...compat.extends('google'),
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {ecmaFeatures: {jsx: true}},
    },
    rules: {
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'no-invalid-this': 'off',
      'max-len': ['error', {code: 100}],
    },
  },
]);
