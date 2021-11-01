import { toClean } from './toClean'

describe('toClean function', () => {
  it('should return formatted number', () => {
    expect.hasAssertions()
    const value = 1.23
    const formattedValue = toClean(value)

    expect(formattedValue).toStrictEqual(`${value}`)
  })

  it('should return formatted number with another decimal mark', () => {
    expect.hasAssertions()
    const value = 1.23
    const formattedValue = toClean(value, { decimalMark: ',' })

    expect(formattedValue).toBe('1,23')
  })

  it('should return formatted number with another thousand separator', () => {
    expect.hasAssertions()

    const value = 123_000
    const formattedValue = toClean(value, { thousandSeparator: ' ' })

    expect(formattedValue).toBe('123 000.00')
  })

  it('should return formatted number with precision 0', () => {
    expect.hasAssertions()

    const value = 123
    const formattedValue = toClean(value, { precision: [0, 0] })

    expect(formattedValue).toBe(`${value}`)
  })

  it('should return value with 14 decimal places', () => {
    expect.hasAssertions()

    const value = 1.123_456_789_123_34
    const formattedValue = toClean(value, {
      precision: [14, 14],
    })

    expect(formattedValue).toStrictEqual(`${value}`)
  })

  it('should return a value with 14 decimal places(zeros)', () => {
    expect.hasAssertions()

    // eslint-disable-next-line unicorn/no-zero-fractions
    const value = 1.000_000_000_000_00
    const formattedValue = toClean(value, { precision: [14, 14] })

    // eslint-disable-next-line unicorn/no-zero-fractions
    expect(formattedValue).toStrictEqual(`1.00000000000000`)
  })

  it('should throw error with precision', () => {
    expect.hasAssertions()
    const value = 1.23
    const formattedValue = () =>
      toClean(value, {
        precision: [2, 4, 5],
      })

    expect(formattedValue).toThrow(
      new Error('`precision` property must got two elements')
    )
  })

  it('should return NaN value', () => {
    expect.hasAssertions()
    const value = Number.NaN
    const formattedValue = toClean(value)

    expect(formattedValue).toBe('NaN')
  })
})
