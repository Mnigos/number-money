import { toMoney } from './main'
import { ToMoneyConfig } from './interfaces'

describe('toMoney function', () => {
  it('Should return formatted number', () => {
    const value = 1.23
    const formattedValue = toMoney(value)

    expect(formattedValue).toEqual(`${value}`)
  })

  it('Should throw error with precision', () => {
    const value = 1.23
    const formattedValue = () =>
      toMoney(value, {
        precision: [2, 4, 5],
      })

    expect(formattedValue).toThrow(
      Error('`precision` property must got two elements')
    )
  })

  it('Should return NaN value', () => {
    const value = NaN
    const formattedValue = toMoney(value)

    expect(formattedValue).toEqual('NaN')
  })

  it('Should return Infinity value', () => {
    const value = Number.POSITIVE_INFINITY
    const formattedValue = toMoney(value)

    expect(formattedValue).toEqual('Infinity')
  })

  it('Should return negative Inifnity value', () => {
    const value = Number.NEGATIVE_INFINITY
    const formattedValue = toMoney(value)

    expect(formattedValue).toEqual('-Infinity')
  })

  it('Should return negative Infinity value with Parens', () => {
    const value = Number.NEGATIVE_INFINITY
    const formattedValue = toMoney(value, { useParens: true })

    expect(formattedValue).toEqual('(Infinity)')
  })

  it('Should return value with symbol', () => {
    const value = 1.23
    const formattedValue = toMoney(value, { symbol: '$' })

    expect(formattedValue).toEqual(`$${value}`)
  })

  it('Should return value with symbol behind', () => {
    const value = 1.23
    const formattedValue = toMoney(value, { symbol: '$', symbolBehind: true })

    expect(formattedValue).toEqual(`${value} $`)
  })

  it('Should return negative value', () => {
    const value = -1.23
    const formattedValue = toMoney(value)

    expect(formattedValue).toEqual(`${value}`)
  })

  it('Should return value with parens', () => {
    const value = -1.23
    const formattedValue = toMoney(value, { useParens: true })

    expect(formattedValue).toEqual(`(${Math.abs(value)})`)
  })
})
