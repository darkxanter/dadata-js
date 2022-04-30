export interface DaDataQuery {
  /** Запрос */
  query: string
}

export interface DaDataRequest {
  /**
   * Количество результатов (максимум — 20)
   * @default 10
   * */
  count?: number
}

export interface DaDataBankRequest extends DaDataRequest {
  /**
   * Ограничение по статусу банка
   * @link https://confluence.hflabs.ru/pages/viewpage.action?pageId=262996120
   */
  status?: string[]
  /**
   * Ограничение по типу банка
   * @link https://confluence.hflabs.ru/pages/viewpage.action?pageId=262996122
   */
  type?: string[]
  /**
   * Ограничение по региону или городу
   * @link https://confluence.hflabs.ru/pages/viewpage.action?pageId=527106238
   */
  location?: Record<string, string>[]
  /**
   * Приоритет города при ранжировании
   * @link https://confluence.hflabs.ru/pages/viewpage.action?pageId=527106242
   */
  location_boost?: Record<string, string>[]
}

export interface DaDataOrganizationRequest extends DaDataRequest {
  /**
   * КПП для поиска по филиалам
   */
  kpp?: string
  /**
   * Головная организация (MAIN) или филиал (BRANCH)
   */
  branch_type?: string
  /**
   * Юрлицо (LEGAL) или индивидуальный предприниматель (INDIVIDUAL)
   */
  type?: string
}

export interface DaDataAddressRequest extends DaDataRequest {
  /**
   * Чтобы искать адреса только в определенном регионе или городе, укажите их в параметре locations.
   * Можно указать несколько ограничений, но не более 100.
   * */
  locations?: DaDataAddressRequestLocation[]
  /**
   * Географическое ограничение 20.4+
   *
   * Требует лицензию на модули address и geo.
   */
  locations_geo?: DaDataAddressRequestLocationGeo[]
  /** Приоритет города при ранжировании */
  locations_boost?: DaDataAddressRequestLocationKladr[]
  /** Гранулярные подсказки по адресу */
  from_bound?: DaDataAddressRequestGranularBound
  /** Гранулярные подсказки по адресу */
  to_bound?: DaDataAddressRequestGranularBound
  /** Подсказки 20.3+ умеют возвращать адреса латиницей, если в запросе указать параметр language = en: */
  language?: 'ru' | 'en'
}

export interface DaDataAddressRequestLocationKladr {
  /** Ограничение по КЛАДР-коду */
  kladr_id?: string
}

/**
 * Ограничение сектора поиска адреса (API)
 * @link https://confluence.hflabs.ru/pages/viewpage.action?pageId=204669108
 */
export interface DaDataAddressRequestLocation
  extends DaDataAddressRequestLocationKladr,
    Record<string, string | undefined> {
  /** ISO-код страны */
  country_iso_code?: string
  /** ISO-код региона */
  region_iso_code?: string

  /**
   * ФИАС-код региона, области, города, населенного пункта либо улицы
   *
   * Ограничение по fias_id дома не поддерживается
   */
  fias_id?: string

  /** Ограничение по названию страны */
  country?: string
  /** Ограничение по названию региона */
  region?: string
  /** Ограничение по названию района */
  area?: string
  /** Ограничение по названию города */
  city?: string
  /** Ограничение по названию населенного пункта */
  settlement?: string
  /** Ограничение по названию улицы */
  street?: string

  /** Ограничение по полному типу региона */
  region_type_full?: string
  /** Ограничение по полному типу района в регионе */
  area_type_full?: string
  /** Ограничение по полному типу города */
  city_type_full?: string
  /** Ограничение по полному типу населенного пункта */
  settlement_type_full?: string
  /** Ограничение по полному типу улицы */
  street_type_full?: string
}

export interface DaDataAddressRequestLocationGeo {
  /** Географическая широта */
  lat: number
  /** Географическая долгота */
  lon: number
  /** Радиус поиска в метрах (по умолчанию – 100, максимум – 100000) */
  radius_meters?: number
}

export interface DaDataAddressRequestGranularBound {
  value: DaDataAddressRequestGranularAddressType
}

export type DaDataAddressRequestGranularAddressType =
  | 'country'
  | 'region'
  | 'area'
  | 'city'
  | 'settlement'
  | 'street'
  | 'house'
