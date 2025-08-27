import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  globalIgnores([
    'dist/**',
    'node_modules/**',
    '.eslintrc.cjs',
    'app/_document.js',
    'postcss.config.mjs',
    'eslint.config.mjs',
    'coverage/**',
    '.next/**',
  ]),
  ...compat.config({
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'next',
      'prettier',
      'next/typescript',
      'eslint:recommended',
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['@typescript-eslint'],
    rules: {
      'no-console': 'warn',
      'prefer-spread': 'warn',
      'require-await': 'warn',
      'no-useless-catch': 'warn',
      'consistent-return': 'warn',
      'no-case-declarations': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'jsx-quotes': ['warn', 'prefer-single'],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
    },
    overrides: [
      {
        files: ['*.ts'],
        rules: {
          '@typescript-eslint/explicit-module-boundary-types': 'warn',
        },
      },
      {
        files: ['**/__tests__/**/*.ts', '**/__tests__/**/*.tsx'],
        rules: {
          '@next/next/no-img-element': 'off',
        },
      },
    ],
  }),
];

export default eslintConfig;
