import ApiClient from '../src/api/client'

import fetch from 'node-fetch'
import { expect } from 'vitest'
// @ts-expect-error fetch
globalThis.fetch = fetch

export function getApiClient() {
  return new ApiClient({ token: import.meta.env.VITE_DADATA_TOKEN as string })
}

export function checkResponse(suggestions: unknown[]) {
  expect(Array.isArray(suggestions)).toBeTruthy()
  expect(suggestions.length).toBeGreaterThan(0)
}
