import { DaDataAddress } from './common'

export interface DaDataBankInfo {
  /** Банковский идентификационный код (БИК) ЦБ РФ */
  bic: string | null
  /** Банковский идентификационный код в системе SWIFT */
  swift: string | null
  /** ИНН */
  inn: string | null
  /** КПП */
  kpp: string | null

  /** Регистрационный номер в ЦБ РФ */
  registrationNumber: string | null
  /** Корреспондентский счет в ЦБ РФ */
  correspondentAccount: string | null
  /** Казначейские счета (для УФК) */
  treasuryAccounts: string[] | null

  /** Наименование */
  name: DaDataBankName | null

  /** Город для платежного поручения (поля справочника Tnp + Nnp) */
  paymentCity: string | null

  /** Тип кредитной организации */
  opf: DaDataBankOPF | null

  /** Управление ЦБ РФ, к которому относится банк */
  cbr: DaDataBankCBR | null

  /** Адрес */
  address: DaDataAddress | null

  /** Состояние */
  state: DaDataBankState | null
}

export interface DaDataBankName {
  /** Платежное наименование */
  payment: string | null
  /** Полное наименование (не заполняется) */
  full: string | null
  /** Краткое наименование */
  short: string | null
}

/** Тип кредитной организации */
export interface DaDataBankOPF {
  /** Полное название (не заполняется) */
  full: string | null
  /** Краткое название (не заполняется */
  short: string | null
  /**
   * BANK        — банк
   * BANK_BRANCH — филиал банка
   * NKO         — небанковская кредитная организация (НКО)
   * NKO_BRANCH  — филиал НКО
   * RKC         — расчетно-кассовый центр
   * CBR         - управление ЦБ РФ (март 2021)
   * TREASURY    - управление Казначейства (март 2021)
   * OTHER       — другой
   * */
  type: string | null
}

/** Состояние банка */
export interface DaDataBankState {
  /** дата актуальности сведений */
  actualityDate: string | null
  /** Дата регистрации  */
  registrationDate: string | null
  /** Дата ликвидации */
  liquidationDate: string | null
  /**
   * Статус организации
   * - ACTIVE — действующая
   * - LIQUIDATING — ликвидируется
   * - LIQUIDATED — ликвидирована
   * */
  status: string | null
}

/** Управление ЦБ РФ, к которому относится банк */
export interface DaDataBankCBR {
  name: DaDataBankName | null
  bic: string | null
  address: DaDataAddress | null
}
