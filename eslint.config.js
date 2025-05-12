import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-plugin-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js, prettier },
    extends: ['js/recommended'],
    ignores: ['.nuxt/**/*', 'playwright-report/**/*'],
    rules: {
      'prettier/prettier': 'error',
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginVue.configs['flat/essential'],
])
