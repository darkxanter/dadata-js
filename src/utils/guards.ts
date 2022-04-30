import { DaDataSuggestions } from '../models/suggestion'

export function validateSuggestions(suggestions: unknown): suggestions is DaDataSuggestions<unknown> {
  if (suggestions != null && typeof suggestions === 'object' && !Array.isArray(suggestions)) {
    return 'suggestions' in suggestions
  }
  return false
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

export function isObjectEmpty(value: object): boolean {
  return Object.keys(value).length === 0
}
