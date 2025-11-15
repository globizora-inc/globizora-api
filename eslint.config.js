// eslint.config.js  — ESLint v9 flat config
import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',      // ✅ 关键：按 ESM 解析 import/export
      globals: {
        ...globals.node,         // ✅ 开启 Node 全局（setTimeout、process 等）
      },
    },
    ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**'],
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      eqeqeq: ['error', 'smart'],
      curly: ['error', 'multi-line'],
      'no-console': 'off'
    },
  },
  // 测试文件放宽
  {
    files: ['**/*.test.*', '**/__tests__/**'],
    rules: { 'no-console': 'off' }
  }
];
