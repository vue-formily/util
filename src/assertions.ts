const _toString = Object.prototype.toString;

export function isNullOrUndefined(value: any): value is undefined | null {
  return value === null || value === undefined;
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(value: any): value is Record<string, any> {
  return _toString.call(value) === '[object Object]';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * Check if the input string contains only numeric characters.
 */
export function isNumeric(value: string) {
  const val = String(value);

  return val.length > 0 && !isNaN(+val);
}

export function isFunction(fn: unknown): fn is (...args: any[]) => any {
  return typeof fn === 'function';
}

/**
 * Returns true if the object is empty. Empty is defined as:
 * - null
 * - undefined
 * - a string with zero length
 * - an array with no elements
 * - a collection with no elements
 */
export function isEmpty(value: any): value is null | undefined | 0 {
  if (isNullOrUndefined(value)) {
    return true;
  }

  let length;

  if (Array.isArray(value) || isString(value)) {
    length = value.length;
  }

  if (isPlainObject(value)) {
    length = Object.keys(value).length;
  }

  return length === 0;
}

export function isEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    // If the values are Date, compare them as timestamps
    return false;
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false;
  }

  const props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false;
  }

  return props.every(p => isEqual(a[p], b[p]));
}
