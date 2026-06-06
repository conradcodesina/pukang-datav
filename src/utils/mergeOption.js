const isPlainObject = (value) => Object.prototype.toString.call(value) === '[object Object]'

export const mergeOption = (baseOption, overrideOption) => {
  if (Array.isArray(baseOption) && Array.isArray(overrideOption)) {
    return baseOption.map((baseItem, index) => {
      const overrideItem = overrideOption[index]

      if (overrideItem === undefined) return baseItem
      return mergeOption(baseItem, overrideItem)
    }).concat(overrideOption.slice(baseOption.length))
  }

  if (isPlainObject(baseOption) && isPlainObject(overrideOption)) {
    return Object.keys(overrideOption).reduce(
      (result, key) => ({
        ...result,
        [key]: mergeOption(result[key], overrideOption[key]),
      }),
      { ...baseOption }
    )
  }

  return overrideOption === undefined ? baseOption : overrideOption
}
