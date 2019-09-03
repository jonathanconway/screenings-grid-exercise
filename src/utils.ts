export const exclude = <T>(obj: T, keyToExclude: keyof T): T =>
  Object
    .keys(obj)
    .filter(key => key !== keyToExclude)
    .reduce((acc, key) => ({
      ...acc,
      [key]: obj[key as keyof T]
    }), {}) as T;