const snakeToCamel = (str: string) => str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase())

export function camelCaseReviver(this: Record<string, unknown>, key: string, value: string) {
  const camelCaseKey = snakeToCamel(key)

  if (this instanceof Array || camelCaseKey === key) {
    return value
  } else {
    this[camelCaseKey] = value
    return
  }
}
