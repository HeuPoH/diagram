export function arrayToMap<T, U extends string | number | symbol>(arr: T[], getId: (item: T) => U) {
  const record: Record<U, T> = {} as Record<U, T>;
  arr.forEach(item => {
    const key = getId(item);
    record[key] = item;
  });
  return record;
}

export function deepCopy<T>(source: T): T {
  const seen = new WeakMap<object, unknown>();

  function copy<T>(value: T): T {
    if (value === null || typeof value !== 'object') {
      return value;
    }

    if (value instanceof Date) {
      return new Date(value) as unknown as T;
    }

    if (value instanceof RegExp) {
      return new RegExp(value.source, value.flags) as unknown as T;
    }

    if (value instanceof Map) {
      const result = new Map();
      for (const [key, val] of value) {
        result.set(copy(key), copy(val));
      }
      return result as unknown as T;
    }

    if (value instanceof Set) {
      const result = new Set();
      for (const val of value) {
        result.add(copy(val));
      }
      return result as unknown as T;
    }

    if (seen.has(value)) {
      return seen.get(value) as T;
    }

    if (Array.isArray(value)) {
      const result: unknown[] = [];
      seen.set(value, result);
      for (const item of value) {
        result.push(copy(item));
      }
      return result as unknown as T;
    }

    if (value instanceof Object) {
      const result: Record<string | symbol, unknown> = {};
      seen.set(value, result);

      const keys = [
        ...Object.getOwnPropertyNames(value),
        ...Object.getOwnPropertySymbols(value)
      ] as Array<string | symbol>;

      for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          result[key] = copy((value as any)[key]);
        }
      }

      Object.setPrototypeOf(result, Object.getPrototypeOf(value));
      return result as unknown as T;
    }

    return value;
  }

  return copy(source);
}