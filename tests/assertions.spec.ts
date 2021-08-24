import { isEmpty, isNumeric } from '@/assertions';

describe('Assertions', () => {
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
});
