import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.ts'], 
    exclude: [
      'node_modules',
      'e2e',            
      'dist',
      '.output',
      '.nuxt',
      '**/vendor/**',
    ],

  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
    },
  },
  
})
