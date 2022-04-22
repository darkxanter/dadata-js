
export interface DaDataRequest {
  /** Текст запроса */
  query: string
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
  branch_type?: string[]
  /**
   * Юрлицо (LEGAL) или индивидуальный предприниматель (INDIVIDUAL)
   */
  type?: string
}
