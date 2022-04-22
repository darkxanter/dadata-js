/// <reference types="vitest" />
import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'dadata',
    },
  },
})
