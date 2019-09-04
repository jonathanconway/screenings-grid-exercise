import { createSelectorCreator } from "reselect";
import { memoize } from "lodash";

export const exclude = <T>(obj: T, keyToExclude: keyof T): T =>
  Object
    .keys(obj)
    .filter(key => key !== keyToExclude)
    .reduce((acc, key) => ({
      ...acc,
      [key]: obj[key as keyof T]
    }), {}) as T;

const hashFn = <T>(...args: T[]) => args.reduce((acc: string, val: T) => acc + '-' + JSON.stringify(val), "");

export const createBoundlessCacheDeepEqualsSelector = createSelectorCreator(
  memoize as <F extends Function>(func: F, option1: <T>(...args: T[]) => string) => F,
  hashFn
);
