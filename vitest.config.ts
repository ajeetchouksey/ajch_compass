import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

// Inherits the @/ alias, the react() and tailwindcss() plugins, and the
// __APP_VERSION__ define from vite.config.ts — do not hand-duplicate any
// of that here.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
      },
    },
  }),
)
