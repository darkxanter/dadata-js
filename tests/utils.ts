import ApiClient from '../src/api/client'

import fetch from 'node-fetch'
// @ts-expect-error fetch
globalThis.fetch = fetch

export function getApiClient() {
  return new ApiClient({ token: import.meta.env.VITE_DADATA_TOKEN as string })
}
