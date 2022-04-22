import { describe, it, expect } from 'vitest'
import simpleHash from '../src/utils/hash'

describe('hash', () => {
  it('compare two simple objects', () => {
    const hash1 = simpleHash({ param1: 'a', param2: 'b' })
    const hash2 = simpleHash({ param2: 'b', param1: 'a' })

    expect(hash2).toBe(hash1)
  })
})
