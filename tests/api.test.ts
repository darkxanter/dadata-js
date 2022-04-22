import { describe, it, expect } from 'vitest'
import { getApiClient } from './utils'

describe('api test', () => {
  it('suggest/bank', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.suggestBank({ query: 'сбер' })
    expect(Array.isArray(suggestions)).toBeTruthy()
  })

  it('findById/bank', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.findBankById('773601001')
    expect(Array.isArray(suggestions)).toBeTruthy()
  })

  it('suggest/party', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.suggestOrganization({ query: 'сбер' })
    expect(Array.isArray(suggestions)).toBeTruthy()
  })

  it('findById/party', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.findOrganizationById('773601001')
    expect(Array.isArray(suggestions)).toBeTruthy()
  })
})
