// https://confluence.hflabs.ru/pages/viewpage.action?pageId=204669103

export interface DaDataAddressInfo {
  /** Индекс */
  postalCode?: string
  /** Страна */
  country?: string
  /** Двухсимвольный код страны ISO 3166 (19.7+) */
  countryIsoCode?: string
  /** Федеральный округ (19.5+) */
  federalDistrict?: string
  /** Код ФИАС региона (либо код OSM, начиная с версии 20.7) */
  regionFiasId?: string
  /** Код КЛАДР региона */
  regionKladrId?: string
  /** Код региона ISO 3166 (19.7+) */
  regionIsoCode?: string
  /** Регион с типом */
  regionWithType?: string
  /** Тип региона (сокращенный) */
  regionType?: string
  /** Тип региона */
  regionTypeFull?: string
  /** Регион */
  region?: string
  /** Код ФИАС района в регионе (либо код OSM, начиная с версии 20.7) */
  areaFiasId?: string
  /** Код КЛАДР района в регионе */
  areaKladrId?: string
  /** Район в регионе с типом */
  areaWithType?: string
  /** Тип района в регионе (сокращенный) */
  areaType?: string
  /** Тип района в регионе */
  areaTypeFull?: string
  /** Район в регионе */
  area?: string
  /** Код ФИАС города (либо код OSM, начиная с версии 20.7) */
  cityFiasId?: string
  /** Код КЛАДР города */
  cityKladrId?: string
  /** Город с типом */
  cityWithType?: string
  /** Тип города (сокращенный) */
  cityType?: string
  /** Тип города */
  cityTypeFull?: string
  /** Город */
  city?: string
  /** Код ФИАС района города (либо код OSM, начиная с версии 20.7) */
  cityDistrictFiasId?: string
  /** Код КЛАДР района города */
  cityDistrictKladrId?: string
  /** Район города с типом */
  cityDistrictWithType?: string
  /** Тип района города (сокращенный) */
  cityDistrictType?: string
  /** Тип района города */
  cityDistrictTypeFull?: string
  /** Район города */
  cityDistrict?: string
  /** Код ФИАС нас. пункта (либо код OSM, начиная с версии 20.7) */
  settlementFiasId?: string
  /** Код КЛАДР нас. пункта */
  settlementKladrId?: string
  /** Населенный пункт с типом */
  settlementWithType?: string
  /** Тип населенного пункта (сокращенный) */
  settlementType?: string
  /** Тип населенного пункта */
  settlementTypeFull?: string
  /** Населенный пункт */
  settlement?: string
  /** Код ФИАС улицы (либо код OSM, начиная с версии 20.7) */
  streetFiasId?: string
  /** Код КЛАДР улицы */
  streetKladrId?: string
  /** Улица с типом */
  streetWithType?: string
  /** Тип улицы (сокращенный) */
  streetType?: string
  /** Тип улицы */
  streetTypeFull?: string
  /** Улица */
  street?: string
  /** Код ФИАС участка (21.12+) */
  steadFiasId?: string
  /** Тип участка (сокращенный) (21.12+) */
  steadType?: string
  /** Тип участка (21.12+) */
  steadTypeFull?: string
  /** Участок (21.12+) */
  stead?: string
  /** Код ФИАС дома (либо код OSM, начиная с версии 20.7) */
  houseFiasId?: string
  /** Код КЛАДР дома */
  houseKladrId?: string
  /** Тип дома (сокращенный) */
  houseType?: string
  /** Тип дома */
  houseTypeFull?: string
  /** Дом */
  house?: string
  /** Тип корпуса/строения (сокращенный) */
  blockType?: string
  /** Тип корпуса/строения */
  blockTypeFull?: string
  /** Корпус/строение */
  block?: string
  /** Код ФИАС квартиры ( 20.10+) */
  flatFiasId?: string
  /** Тип квартиры (сокращенный) */
  flatType?: string
  /** Тип квартиры */
  flatTypeFull?: string
  /** Квартира */
  flat?: string
  /** Абонентский ящик */
  postalBox?: string

  /**
   * Код ФИАС:
   * - ROOM.ROOMGUID, если квартира найдена в ФИАС по точному совпадению (начиная с версии 21.4);
   * - HOUSE.HOUSEGUID, если найден только дом в ФИАС по точному совпадению;
   * - ADDROBJ.AOGUID в противном случае.
   *
   * Либо код OSM (начиная с версии 20.7)
   */
  fiasId?: string
  /** Уровень детализации, до которого адрес найден в ФИАС */
  fiasLevel?: DaDataFiasLevel
  /** Код КЛАДР */
  kladrId?: string
  /** Идентификатор объекта в международной базе GeoNames. Для российских адресов не заполняется */
  geonameId?: string
  /** Признак центра района или региона: */
  capitalMarker?: DaDataCapitalMarker

  /** Код ОКАТО */
  okato?: string
  /** Код ОКТМО */
  oktmo?: string
  /** Код ИФНС для физических лиц */
  taxOffice?: string
  /** Код ИФНС для организаций */
  taxOfficeLegal?: string
  divisions?: DaDataDivisions

  /**
   * Для организаций — адрес как в ЕГРЮЛ.
   *
   * Для банков — адрес как в справочнике БИК.
   *
   * В остальных случаях — пустое.
   */
  source?: string

  /**
   * Список исторических названий объекта нижнего уровня.
   *
   * Если подсказка до улицы — это прошлые названия этой улицы, если до города — города.
   */
  historyValues?: string[]

  // Дополнительные поля, заполняются в зависимости от тарифа «Дадаты»
  // Заполняются при выборе конкретной подсказки или через метод API findById. До этого они пустые.

  // Все тарифы «Дадаты»

  /** Координаты: широта */
  geoLat?: string
  /** Координаты: долгота */
  geoLon?: string
  /** Код точности координат */
  qcGeo?: DaDataQcGeo
  /** Иерархический код адреса в ФИАС (СС+РРР+ГГГ+ППП+СССС+УУУУ+ДДДД) */
  fiasCode?: string
  /** Признак актуальности адреса в ФИАС:
   * - 0 — актуальный
   * - 1–50 — переименован
   * - 51 — переподчинен
   * - 99 — удален
   * */
  fiasActualityState?: string
  /** Административный округ (только для Москвы) */
  cityArea?: string

  // Тарифы «Расширенный» и «Максимальный»

  /** Внутри кольцевой? */
  beltwayHit?: string
  /** Расстояние от кольцевой в километрах */
  beltwayDistance?: string

  // Тариф «Максимальный»

  /** Площадь квартиры */
  flatArea?: string
  /** Рыночная стоимость м² */
  squareMeterPrice?: string
  /** Рыночная стоимость квартиры */
  flatPrice?: string
  /** Часовой пояс */
  timezone?: string
  /** Ближайшие станции метро (не более 3 станций в радиусе 5 км): */
  metro?: DaDataMetro[]
}

/**
 * Уровень детализации, до которого адрес найден в ФИАС:
 * - 0 — страна
 * - 1 — регион
 * - 3 — район
 * - 4 — город
 * - 5 — район города
 * - 6 — населенный пункт
 * - 7 — улица
 * - 8 — дом
 * - 9 — квартира (21.4+)
 * - 65 — планировочная структура
 * - 75 — земельный участок (21.12+)
 * - -1 — иностранный или пустой.
 */
export type DaDataFiasLevel = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '65' | '75' | '-1'

/**
 * Признак центра района или региона:
 * - 1 — центр района (Московская обл, Одинцовский р-н, г Одинцово)
 * - 2 — центр региона (Новосибирская обл, г Новосибирск)
 * - 3 — центр района и региона (Томская обл, г Томск)
 * - 4 — центральный район региона (Тюменская обл, Тюменский р-н)
 * - 0 — ничего из перечисленного (Московская обл, г Балашиха)
 */
export type DaDataCapitalMarker = '0' | '1' | '2' | '3' | '4'

/**
 * Код точности координат:
 * - 0 — точные координаты
 * - 1 — ближайший дом
 * - 2 — улица
 * - 3 — населенный пункт
 * - 4 — город
 * - 5 — координаты не определены, отсутствуют в справочнике
 * - 6 — не загружен справочник с геокоординатами
 */
export type DaDataQcGeo = '0' | '1' | '2' | '3' | '4' | '5' | '6'

export interface DaDataDivisions {
  /** Поля адреса в Административно-территориальном делении (22.3+) */
  administrative?: DaDataDivisionAdministrative
  /** Поля адреса в Муниципальном делении (22.3+) */
  municipal?: DaDataDivisionMunicipal
}

/** Поля адреса в Административно-территориальном делении (22.3+) */
export interface DaDataDivisionAdministrative {
  /** Район в регионе */
  area?: DaDataDivisionAddress
  /** Город */
  city?: DaDataDivisionAddress
  /** Населенный пункт */
  settlement?: DaDataDivisionAddress
  /** Район города */
  cityDistrict?: DaDataDivisionAddress
}

export interface DaDataDivisionMunicipal {
  /** не заполняется */
  area?: DaDataDivisionAddress
  /** не заполняется */
  subArea?: DaDataDivisionAddress
  /** не заполняется */
  city?: DaDataDivisionAddress
  /** не заполняется */
  settlement?: DaDataDivisionAddress
}

export interface DaDataDivisionAddress {
  /** Код ФИАС */
  fiasId?: string
  /** Код КЛАДР */
  kladrId?: string
  /** Тип (сокращенный) */
  type?: string
  /** Тип */
  typeFull?: string
  /** Наименование */
  name?: string
  /** Наименование с типом */
  nameWithType?: string
}

export interface DaDataMetro {
  /** название станции */
  name?: string
  /** название линии */
  line?: string
  /** расстояние до станции в километрах */
  distance?: number
}
