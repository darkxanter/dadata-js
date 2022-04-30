/// <reference types="vitest" />
import { defineConfig } from 'vite'
import * as path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(() => ({
  plugins: [
    dts({
      exclude: ['./src/vite-env.d.ts', './src/env.d.ts'],
    }),
  ],
  test: {
    environment: 'jsdom',
    includeSource: ['src/**/*.{js,ts}'],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'dadata',
      formats: ['cjs', 'es'],
    },
  },
}))
