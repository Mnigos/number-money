import { toClean } from './toClean'
import { ToMoneyConfig } from '../interfaces'

const defaultConfig: ToMoneyConfig = {
  decimalMark: '.',
  thousandSeparator: '',
  precision: [2, 2],
  symbol: '',
  symbolBehind: false,
  useParens: false,
}

export function toMoney(
  value: number,
  {
    decimalMark = '.',
    thousandSeparator = '',
    precision = [2, 2],
    symbol = '',
    symbolBehind = false,
    useParens = false,
  }: ToMoneyConfig = defaultConfig
): string {
  if (precision.length !== 2)
    throw new Error('`precision` property must got two elements')

  if (Number.isNaN(value)) return 'NaN'
  if (value === Number.POSITIVE_INFINITY) return 'Infinity'
  if (value === Number.NEGATIVE_INFINITY)
    return useParens ? '(Infinity)' : '-Infinity'

  const negative = value < 0
  const valueAbs = Math.abs(value)

  const cleanedValue = toClean(valueAbs, {
    decimalMark,
    thousandSeparator,
    precision: [precision[0], precision[1]],
  })

  let number = symbolBehind
    ? `${cleanedValue} ${symbol}`
    : symbol + cleanedValue

  if (negative) number = useParens ? `(${number})` : `-${number}`

  return number
}
