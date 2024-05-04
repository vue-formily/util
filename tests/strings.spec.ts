import { interpolate } from '@/index';

describe('Strings', () => {
  it('Should not throw', async () => {
    expect(interpolate('{a} test', null as any)).toBe('undefined test');
    expect(interpolate('{a} test', undefined as any)).toBe('undefined test');
    expect(interpolate('{a} test', {} as any)).toBe('undefined test');
    expect(interpolate('')).toBe('');
  });

  it('Should format object with bracket notation', async () => {
    expect(
      interpolate('{a[b]} {a[c][d]} {value} test', {
        value: 1,
        a: {
          b: 'test',
          c: {
            d: 'aaa'
          }
        }
      })
    ).toBe('test aaa 1 test');
  });

  it('Should format object with dot notation', async () => {
    expect(
      interpolate('{a.b} {a.c.d} {value} test', {
        value: 1,
        a: {
          b: 'test',
          c: {
            d: 'aaa'
          }
        }
      })
    ).toBe('test aaa 1 test');
  });

  it('Should format object with mixed dot and bracket notation', async () => {
    expect(
      interpolate('{a.b} {a.c[d]} {a.d[2]} {value} test', {
        value: 1,
        a: {
          b: 'test',
          c: {
            d: 'aaa'
          },
          d: [1, 2, 3]
        }
      })
    ).toBe('test aaa 3 1 test');
  });
});
