import { DaDataBankInfo } from '../models/bank'
import { DaDataOrganizationInfo } from '../models/organization'
import { DaDataSuggestion } from '../models/suggestion'
import { validateSuggestions } from '../utils/guards'
import simpleHash from '../utils/hash'
import { camelCaseReviver } from '../utils/json'
import { DaDataBankRequest, DaDataOrganizationRequest, DaDataQuery } from './requests'

export interface ApiClientOptions {
  /**
   * @default https://suggestions.dadata.ru/suggestions/api/4_1/rs
   */
  endpoint?: string
  token?: string
  /** @default: true */
  cache?: boolean
}

type MethodType = 'suggest' | 'findById'
type SuggestionsType = 'party' | 'bank'
export type DaDataSuggestionsMethod = `${MethodType}/${SuggestionsType}`

export default class ApiClient {
  readonly endpoint: string
  readonly token: string | undefined
  readonly useCache: boolean
  protected cache = new Map<string, object>()

  constructor(options?: ApiClientOptions) {
    const { endpoint = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs' } = options ?? {}
    this.endpoint = endpoint.replace(/\/$/, '')
    this.token = options?.token
    this.useCache = options?.cache ?? true
  }

  /**
   * Что умеет
   * - Ищет кредитные организации:
   *   - по БИК,
   *   - SWIFT,
   *   - ИНН,
   *   - ИНН + КПП,
   *   - названию,
   *   - адресу до улицы.
   * - Фильтрует по типу: банки, НКО и филиалы.
   * - Фильтрует по региону или городу.
   * - Умеет искать как действующие банки, так и банки на ликвидации.
   * - Учитывает, где вы находитесь (геолокация до города).
   *
   *
   */
  suggestBank(query: string, options?: DaDataBankRequest): Promise<DaDataSuggestion<DaDataBankInfo>[]> {
    return this.request('suggest/bank', { ...options, query })
  }

  /**
   * Находит банк по любому из идентификаторов:
   * - БИК,
   * - SWIFT,
   * - ИНН,
   * - ИНН + КПП (для филиалов),
   * - регистрационному номеру, присвоенному Банком России.
   *
   * Ищет только по точному совпадению, для частичного совпадения используйте метод @see suggestBank.
   */
  findBankById(query: string): Promise<DaDataSuggestion<DaDataBankInfo>[]> {
    return this.request('findById/bank', { query })
  }

  /**
   * Ищет компании и индивидуальных предпринимателей:
   * - по ИНН, ОГРН и КПП;
   * - названию (полному и краткому);
   * - ФИО (для индивидуальных предпринимателей);
   * - ФИО руководителя компании;
   * - адресу до улицы.
   */
  suggestOrganization(
    query: string,
    options?: DaDataOrganizationRequest,
  ): Promise<DaDataSuggestion<DaDataOrganizationInfo>[]> {
    return this.request('suggest/party', { ...options, query })
  }

  /**
   * Находит компанию или ИП по ИНН или ОГРН.
   * Возвращает все доступные сведения о компании, в отличие от метода suggest, который возвращает только базовые поля.
   */
  findOrganizationById(
    query: string,
    options?: DaDataOrganizationRequest,
  ): Promise<DaDataSuggestion<DaDataOrganizationInfo>[]> {
    return this.request('findById/party', { ...options, query })
  }

  clearCache() {
    this.cache.clear()
  }

  async request<TResult extends object>(
    method: DaDataSuggestionsMethod,
    params: DaDataQuery & Record<string, unknown>,
  ): Promise<DaDataSuggestion<TResult>[]> {
    if (!params.query) {
      return []
    }
    if (this.useCache) {
      const cacheKey = this.getCacheKey(method, params)
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey) as DaDataSuggestion<TResult>[]
      }
      const response = this.doRequest<TResult>(method, params)
      this.cache.set(cacheKey, response)
      return response
    }
    return this.doRequest<TResult>(method, params)
  }

  protected getCacheKey(method: DaDataSuggestionsMethod, params: Record<string, unknown>) {
    return `${method}/${simpleHash(params)}`
  }

  protected async doRequest<TResult extends object>(
    requestMethod: DaDataSuggestionsMethod,
    request: Record<string, unknown>,
  ): Promise<DaDataSuggestion<TResult>[]> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })

    if (this.token) {
      headers.set('Authorization', `Token ${this.token}`)
    }

    const response = await fetch(`${this.endpoint}/${requestMethod}`, {
      headers,
      method: 'POST',
      body: JSON.stringify(request),
    })
    const responseData = await response.text()

    if (response.ok) {
      const responseJson: unknown = JSON.parse(responseData, camelCaseReviver)
      if (validateSuggestions(responseJson)) {
        return responseJson.suggestions as DaDataSuggestion<TResult>[]
      }
      throw new Error(`Incorrect response: ${String(responseJson)}`)
    } else {
      throw new Error(`Request failed: ${responseData}`)
    }
  }
}
