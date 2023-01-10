module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    // 1. 接入 prettier 的规则
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: false
      }
    ],
    'vue/no-setup-props-destructure': 0,
    'no-undef': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/ban-types': 0,
    'vue/prefer-import-from-vue': 0,
    '@typescript-eslint/no-empty-function': 0,
    'vue/no-reserved-component-names': 0
  }
}
