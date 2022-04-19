export interface DaDataSuggestion<T> {
  value: string
  unrestictedValue: string
  data: T
}

export interface DaDataSuggestions<T> {
  suggestions: DaDataSuggestion<T>[]
}
