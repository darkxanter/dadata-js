export interface DaDataAddress {
    /**
     * Адрес одной строкой:
     * - адрес организации для юридических лиц;
     * - город проживания для индивидуальных предпринимателей.
     *
     * Стандартизован, поэтому может отличаться от записанного в ЕГРЮЛ.
     * */
    value: string | null,
    /**
     * Адрес одной строкой (полный, от региона) стандартизован, поэтому может отличаться от записанного в ЕГРЮЛ.
     * */
    unrestrictedValue: string | null,
    /** Гранулярный адрес */
    data: DaDataGranularAddress | null,
}


export interface DaDataGranularAddress {
    /** Адрес одной строкой как в ЕГРЮЛ */
    source: string
    /**
     * Код проверки адреса
     * - 0 – Адрес распознан уверенно
     * - 1 – Остались «лишние» части.
     * - 3 – Есть альтернативные варианты.
     * */
    qc: number
}

export interface DaDataFullName {
    surname: string | null
    name: string | null
    patronymic: string | null
}
