import { isEmpty, isEqual, isNumeric, isNumber, isPromise } from '@/assertions';

describe('Assertions', () => {
  test('isPromise', async () => {
    expect(isPromise(new Promise(() => {}))).toBe(true);
    expect(isPromise((async () => {})())).toBe(true);
  });

  test('isNumber', async () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber('1')).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(NaN)).toBe(false);
  });

  test('isNumeric', async () => {
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('123.12')).toBe(true);
    expect(isNumeric('.12')).toBe(true);
    expect(isNumeric('-.12')).toBe(true);
    expect(isNumeric('-12.12')).toBe(true);
    expect(isNumeric('12e12')).toBe(true);
    expect(isNumeric(NaN as any)).toBe(false);
    expect(isNumeric(null as any)).toBe(false);
    expect(isNumeric([] as any)).toBe(false);
    expect(isNumeric({} as any)).toBe(false);
    expect(isNumeric(undefined as any)).toBe(false);
  });

  test('isEmpty', async () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(' ')).toBe(false);
  });

  test('isEqual', async () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('1', '1')).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual(new Date('01/04/2022'), new Date('01/04/2022'))).toBe(true);
    expect(isEqual(new Date('01/04/2022'), new Date('01/04/2023'))).toBe(false);
    expect(
      isEqual(
        {
          a: 1,
          b: {
            c: [1]
          }
        },
        {
          a: 1,
          b: {
            c: [1]
          }
        }
      )
    ).toBe(true);
    expect(
      isEqual(
        {
          a: 1,
          b: {
            c: [1]
          }
        },
        {
          a: 1,
          b: {
            c: [1, 2]
          }
        }
      )
    ).toBe(false);
    expect(isEqual([1, { a: 1 }], [1, { a: 1 }])).toBe(true);
    expect(isEqual([1, { a: 1, b: 2 }], [1, { b: 2, a: 1 }])).toBe(true);
  });
});
