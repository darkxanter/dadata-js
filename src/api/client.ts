import { DaDataBankInfo } from '../models/bank'
import { DaDataOrganizationInfo } from '../models/organization'
import { DaDataSuggestion } from '../models/suggestion'
import { validateSuggestions } from '../utils/guards'
import { camelCaseReviver } from '../utils/json'
import { DaDataBankRequest, DaDataOrganizationRequest } from './requests'

export interface ApiClientOptions {
  /**
   * @default https://suggestions.dadata.ru/suggestions/api/4_1/rs
   */
  endpoint?: string
  token?: string
}

export default class ApiClient {
  readonly endpoint: string
  readonly token: string | undefined

  constructor(options?: ApiClientOptions) {
    const { endpoint = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs', token } = options ?? {}
    this.endpoint = endpoint.replace(/\/$/, '')
    this.token = token
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
    return this.makeRequest('suggest/bank', { ...options, query })
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
    return this.makeRequest('findById/bank', { query })
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
    return this.makeRequest('suggest/party', { ...options, query })
  }

  /**
   * Находит компанию или ИП по ИНН или ОГРН.
   * Возвращает все доступные сведения о компании, в отличие от метода suggest, который возвращает только базовые поля.
   */
  findOrganizationById(query: string): Promise<DaDataSuggestion<DaDataOrganizationInfo>[]> {
    return this.makeRequest('findById/party', { query })
  }

  protected async makeRequest<TRequest extends object, TResult extends object>(
    requestPath: string,
    request: TRequest,
  ): Promise<DaDataSuggestion<TResult>[]> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })

    if (this.token) {
      headers.set('Authorization', `Token ${this.token}`)
    }

    const response = await fetch(`${this.endpoint}/${requestPath}`, {
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
