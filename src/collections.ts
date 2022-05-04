import { isPlainObject, isString } from './assertions';

/**
 * Merge objects or arrays
 */
export function merge(target: any, ...sources: any[]) {
  return sources.reduce((acc: any, source: any) => {
    const keys = Object.keys(source || []);

    keys.forEach(key => {
      const item = source[key];

      if (isPlainObject(item)) {
        acc[key] = merge({}, acc[key], item);
      } else if (Array.isArray(item)) {
        acc[key] = merge([], acc[key], item);
      } else {
        const descriptor = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(acc, key, descriptor || item);
      }
    });

    return acc;
  }, target);
}

const rkey = /([^[\]]+)/g;

/**
 * Find the first found value in objects or arrays by its path
 */
export function get(path: string | string[], ...args: any[]) {
  const length1 = args.length;
  const paths = isString(path) ? path.split('.') : path;
  const length2 = paths.length;

  for (let i = 0; i < length1; i++) {
    let value = args[i];
    let j = -1;

    while (value && ++j < length2) {
      const fullName = paths[j];
      const m = fullName.match(rkey);

      if (m) {
        const length3 = m.length;

        for (let k = 0; k < length3; k++) {
          const name: any = m[k];

          if ((Array.isArray(value) || isPlainObject(value)) && name in value) {
            value = value[name];

            if (j === length2 - 1 && k === length3 - 1) {
              return value;
            }
          }
        }
      }
    }
  }

  return undefined;
}

/**
 * Returns the index of the first element in the array that satisfies the provided testing function.
 */
export function findIndex(arr: any[] = [], fn: (...args: any[]) => boolean) {
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    if (fn(arr[i], i, arr)) {
      return i;
    }
  }

  return -1;
}

/**
 * Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 */
export function flatArray(arr: any[], deep = Infinity): any[] {
  return deep > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatArray(val, deep - 1) : val), []) : arr;
}
