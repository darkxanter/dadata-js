import { describe, it, expect, assert } from 'vitest'
import { DaDataBankInfo } from '../src/models/bank'
import { DaDataSuggestions } from '../src/models/suggestion'
import { camelCaseReviver } from '../src/utils/json'
import { exampleBankResponse } from './exampleResponse'

describe('json parse', () => {
  it('parse reviver check', () => {
    const parsedResponse = JSON.parse(exampleBankResponse, camelCaseReviver) as DaDataSuggestions<DaDataBankInfo>
    const suggestion = parsedResponse.suggestions[0]

    expect('unrestrictedValue' in suggestion, 'must exists camelCase key').toBeTruthy()
    expect('unrestricted_value' in suggestion, 'must not exists snake_case key').toBeFalsy()

    const data = suggestion.data
    expect('correspondentAccount' in data, 'must exists camelCase key').toBeTruthy()
    expect('correspondent_account' in data, 'must not exists snake_case key').toBeFalsy()

    expect('registrationNumber' in data, 'must exists camelCase key').toBeTruthy()
    expect('registration_number' in data, 'must not exists snake_case key').toBeFalsy()
    const state = data.state
    assert(state)
    expect('actualityDate' in state, 'must exists camelCase key').toBeTruthy()
    expect('actuality_date' in state, 'must not exists snake_case key').toBeFalsy()
  })
})
