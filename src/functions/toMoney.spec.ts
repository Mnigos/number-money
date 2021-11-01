import { toMoney } from './toMoney'

describe('toMoney function', () => {
  it('should return formatted number', () => {
    expect.hasAssertions()
    const value = 1.23
    const formattedValue = toMoney(value)

    expect(formattedValue).toStrictEqual(`${value}`)
  })

  // @TODO Implement own toClean function
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should return value with 14 decimal places', () => {
    expect.hasAssertions()
    const value = 1.123_456_789_123_34
    const formattedValue = toMoney(value, {
      precision: [14, 14],
    })

    expect(formattedValue).toStrictEqual(`${value}`)
  })

  it('should throw error with precision', () => {
    expect.hasAssertions()
    const value = 1.23
    const formattedValue = () =>
      toMoney(value, {
        precision: [2, 4, 5],
      })

    expect(formattedValue).toThrow(
      new Error('`precision` property must got two elements')
    )
  })

  it('should return NaN value', () => {
    expect.hasAssertions()
    const value = Number.NaN
    const formattedValue = toMoney(value)

    expect(formattedValue).toBe('NaN')
  })

  it('should return Infinity value', () => {
    expect.hasAssertions()
    const value = Number.POSITIVE_INFINITY
    const formattedValue = toMoney(value)

    expect(formattedValue).toBe('Infinity')
  })

  it('should return negative Inifnity value', () => {
    expect.hasAssertions()
    const value = Number.NEGATIVE_INFINITY
    const formattedValue = toMoney(value)

    expect(formattedValue).toBe('-Infinity')
  })

  it('should return negative Infinity value with Parens', () => {
    expect.hasAssertions()
    const value = Number.NEGATIVE_INFINITY
    const formattedValue = toMoney(value, { useParens: true })

    expect(formattedValue).toBe('(Infinity)')
  })

  it('should return value with symbol', () => {
    expect.hasAssertions()
    const value = 1.23
    const formattedValue = toMoney(value, { symbol: '$' })

    expect(formattedValue).toStrictEqual(`$${value}`)
  })

  it('should return value with symbol behind', () => {
    expect.hasAssertions()
    const value = 1.23
    const formattedValue = toMoney(value, { symbol: '$', symbolBehind: true })

    expect(formattedValue).toStrictEqual(`${value} $`)
  })

  it('should return negative value', () => {
    expect.hasAssertions()
    const value = -1.23
    const formattedValue = toMoney(value)

    expect(formattedValue).toStrictEqual(`${value}`)
  })

  it('should return value with parens', () => {
    expect.hasAssertions()
    const value = -1.23
    const formattedValue = toMoney(value, { useParens: true })

    expect(formattedValue).toStrictEqual(`(${Math.abs(value)})`)
  })
})
