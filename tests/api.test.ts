import { describe, it } from 'vitest'
import { checkResponse, getApiClient } from './utils'

describe('api test', () => {
  it('suggest/bank', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.suggestBank('сбер')
    checkResponse(suggestions)
  })

  it('findById/bank', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.findBankById('044525225')
    checkResponse(suggestions)
  })

  it('suggest/party', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.suggestOrganization('сбер')
    checkResponse(suggestions)
  })

  it('findById/party', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.findOrganizationById('7707083893')
    checkResponse(suggestions)
  })

  it('suggest/address', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.suggestAddress('г Москва, ул Сухонская, д 9')
    checkResponse(suggestions)
  })

  it('geolocate/address', async () => {
    const apiClient = getApiClient()
    const suggestions = await apiClient.geolocateAddress({ lat: 55.878, lon: 37.653 })
    checkResponse(suggestions)
  })
})
