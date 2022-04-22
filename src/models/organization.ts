import { DaDataAddress, DaDataFullName } from './common'

export interface DaDataOrganizationInfo {
  /** Внутренний идентификатор */
  hid: string

  /** ИНН */
  inn: string
  /** КПП */
  kpp: string | null
  /** ОГРН */
  ogrn: string | null
  /** ОГРН */

  ogrnDate: string | null

  /** Адрес */
  address: DaDataAddress | null
  /** Количество филиалов */
  branchCount: number | null
  /**
   * Тип подразделения
   * - MAIN — головная организация
   * - BRANCH — филиал
   * */
  branchType: string | null
  /** Имя ИП */
  fio: DaDataFullName | null
  /** Руководитель */
  management: DaDataOrganizationManagement | null
  /** Наименование */
  name: DaDataOrganizationName | null

  /** Код ОКАТО */
  okato: string | null
  /** Код ОКТМО */
  oktmo: string | null
  /** Код ОКПО */
  okpo: string | null
  /** Код ОКОГУ */
  okogu: string | null
  /** Код ОКФС */
  okfs: string | null
  /** Финансовая информация */
  finance: DaDataFinanceInfo | null
  /** Код ОКВЭД */
  okved: string | null
  /** Версия справочника ОКВЭД (2001 или 2014) */
  okvedType: string | null
  /** Организационно-правовая форма */
  opf: DaDataOrganizationOPF | null
  /** Состояние */
  state: DaDataOrganizationState | null
  /**
   * Тип организации
   * - LEGAL — юридическое лицо
   * - INDIVIDUAL — индивидуальный предприниматель
   * */
  type: string
  /** Количество сотрудников */
  employeeCount: number | null
}

export interface DaDataOrganizationManagement {
  name: string | null
  post: string | null
  disqualified: boolean | null
}

export interface DaDataOrganizationName {
  /** Полное наименование */
  fullWithOpf: string | null
  /** Краткое наименование  */
  shortWithOpf: string | null
  /** Полное наименование без ОПФ */
  full: string | null
  /** Краткое наименование без ОПФ */
  short: string | null
}

export interface DaDataFinanceInfo {
  /** Система налогообложения организации */
  taxSystem: string | null
  /** Доходы по данным бухгалтерской отчетности (за позапрошлый год если не заполнено year)  */
  income: number | null
  /** Расходы по данным бухгалтерской отчетности (за позапрошлый год если не заполнено year)  */
  expense: number | null
  /** Задолженность по налоговым платежам за позапрошлый год */
  debt: number | null
  /** Наложенные штрафы за позапрошлый год  */
  penalty: number | null
  /** Наложенные штрафы за позапрошлый год  */
  year: number | null
}

/** Организационно-правовая форма */

export interface DaDataOrganizationOPF {
  /** Код ОКОПФ */
  code: string | null
  /** Полное название ОПФ  */
  full: string | null
  /** Краткое название ОПФ */
  short: string | null
  /** Версия справочника ОКОПФ */
  type: string | null
}

/** Организационно-правовая форма */
export interface DaDataOrganizationState {
  /** дата актуальности сведений */

  actualityDate: string | null
  /** Дата регистрации  */

  registrationDate: string | null
  /** Дата ликвидации */

  liquidationDate: string | null
  /**
   * Детальный статус
   * @link https://github.com/hflabs/party-state/blob/master/party-state.csv
   * */
  code: string | null
  /**
   * Статус организации
   * - ACTIVE — действующая
   * - LIQUIDATING — ликвидируется
   * - LIQUIDATED — ликвидирована
   * - REORGANIZING — в процессе присоединения к другому юрлицу с последующей ликвидацией
   * - BANKRUPT — банкрот (с февраля 2021)
   * */
  status: string | null
}
