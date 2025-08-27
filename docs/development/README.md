# Development Guidelines Documentation

## Overview

This document outlines the development standards, best practices, coding conventions, and workflows for contributing to the Shoes Shop project. Following these guidelines ensures code quality, maintainability, and team collaboration.

## 📋 Table of Contents

1. [Code Style & Formatting](#code-style--formatting)
2. [TypeScript Guidelines](#typescript-guidelines)
3. [React Best Practices](#react-best-practices)
4. [Component Development](#component-development)
5. [State Management](#state-management)
6. [Performance Guidelines](#performance-guidelines)
7. [Git Workflow](#git-workflow)
8. [Code Review Process](#code-review-process)
9. [Documentation Standards](#documentation-standards)
10. [Testing Requirements](#testing-requirements)

## Code Style & Formatting

### 🎨 ESLint & Prettier Configuration

#### **ESLint Rules** (`eslint.config.mjs`)

```javascript
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',

      // React
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // Prettier
      'prettier/prettier': 'error',
    },
  },
];
```

#### **Prettier Configuration** (`.prettierrc`)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": true,
  "quoteProps": "as-needed"
}
```
