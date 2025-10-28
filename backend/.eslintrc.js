export default {
  env: {
    node: true,
    es2021: true,
    browser: false
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    process: 'readonly'
  },
  rules: {
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
  }
};
