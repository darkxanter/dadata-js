import { DaDataSuggestions } from '../models/suggestion'

export function validateSuggestions(suggestions: unknown): suggestions is DaDataSuggestions<unknown> {
  if (suggestions != null && typeof suggestions === 'object' && !Array.isArray(suggestions)) {
    return 'suggestions' in suggestions
  }
  return false
}
