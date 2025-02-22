// import _import from "eslint-plugin-import";
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
// import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
// import { fixupPluginRules } from "@eslint/compat";
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { version } from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/*.config.ts', '**/*.config.js', '**/*.config.mjs'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  ...compat.extends(
    // "airbnb",
    // "airbnb-typescript",
    // "airbnb/hooks",
    'plugin:@typescript-eslint/recommended',
    // 'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ),
  react.configs.flat.recommended, // This is not a plugin object, but a shareable config object
  react.configs.flat['jsx-runtime'], // Add this if you are using React 17+
  {
    plugins: {
      // import: fixupPluginRules(_import),
      'jsx-a11y': jsxA11Y,
      react,
      // "react-hooks": fixupPluginRules(reactHooks),
      '@typescript-eslint': typescriptEslint,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 2015,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',

        ecmaFeatures: {
          tsx: true,
        },
      },
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'no-console': 'error',
      'react/require-default-props': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx'],
        },
      ],

      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      // "react-hooks/rules-of-hooks": "error",
      // "react-hooks/exhaustive-deps": "warn",
      'import/prefer-default-export': 'off',
      'linebreak-style': 'off',
      'jsx-quotes': ['error', 'prefer-single'],
    },
  },
];
