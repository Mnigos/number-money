export function regexpEscape(value: string): string {
  return value.replace(/[$()*+./?[\\\]^{|}-]/g, '\\$&')
}
