export const deepMergeObjects = (...objects) => {
  return objects.reduce((merged, obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        merged[key] = deepMergeObjects(merged[key] || {}, value)
      } else {
        merged[key] = value
      }
    }
    return merged
  }, {})
}
