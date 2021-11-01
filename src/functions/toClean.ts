import { ToCleanConfig } from '../interfaces/ToCleanConfig'
import { regexpEscape } from '../utils/regexpEscape'

const defaultConfig: ToCleanConfig = {
  decimalMark: '.',
  thousandSeparator: ',',
  precision: [2, 2],
}

export function toClean(
  value: number,
  {
    decimalMark = '.',
    thousandSeparator = ',',
    precision = [2, 2],
  }: ToCleanConfig = defaultConfig
): string {
  if (precision.length !== 2)
    throw new Error('`precision` property must got two elements')

  if (Number.isNaN(value)) return 'NaN'

  const fixedValue = value.toFixed(precision[1])
  const dotIndex = fixedValue.lastIndexOf('.')

  let valueWithDotIndex =
    precision[0] > 0
      ? fixedValue.slice(0, dotIndex) +
        decimalMark +
        fixedValue.slice(dotIndex + 1)
      : fixedValue + decimalMark

  console.log(valueWithDotIndex)

  if (precision[0] > 0) {
    const numZeros =
      dotIndex > -1
        ? precision[0] - (valueWithDotIndex.length - dotIndex - 1)
        : precision[0]

    for (let i = 0; i < numZeros; i++) valueWithDotIndex += '0'
  }

  const regexpDecimalMark = regexpEscape(decimalMark)
  const thousandSeparatorRegexp = new RegExp(
    `\\d(?=(\\d{3})+${regexpDecimalMark})`,
    'g'
  )
  const trimRegexp = new RegExp(`${regexpDecimalMark}$`)

  return valueWithDotIndex
    .replace(thousandSeparatorRegexp, `$&${thousandSeparator}`)
    .replace(trimRegexp, '')
}
