import { findIndex, flatArray, get, merge } from '@/collections';

describe('Collections', () => {
  test('merge', async () => {
    expect(
      merge(
        {},
        {
          test: 1
        }
      )
    ).toEqual({ test: 1 });

    expect(
      merge(
        {
          abc: 1
        },
        {
          test: 1,
          test2: [1, 3, 4]
        }
      )
    ).toEqual({ abc: 1, test: 1, test2: [1, 3, 4] });

    expect(
      merge(
        {},
        {
          test: 1,
          test2: [
            {
              a: 1
            },
            1
          ]
        },
        {
          test2: [
            {
              b: 1
            }
          ]
        }
      )
    ).toEqual({ test: 1, test2: [{ a: 1, b: 1 }, 1] });

    expect(merge([1, 3], [1, 2, 3])).toEqual([1, 2, 3]);

    expect(
      merge(
        [
          1,
          {
            a: 1
          }
        ],
        [
          2,
          {
            a: 2,
            b: 1
          },
          3
        ]
      )
    ).toEqual([
      2,
      {
        a: 2,
        b: 1
      },
      3
    ]);
  });

  test('get', async () => {
    expect(
      get('a', {
        a: 1
      })
    ).toBe(1);

    expect(
      get('a.b', {
        a: {
          b: 1
        }
      })
    ).toBe(1);

    expect(
      get('a.b[1]', {
        a: {
          b: [1, 3]
        }
      })
    ).toBe(3);

    expect(
      get(
        'a',
        {},
        {
          a: 1
        }
      )
    ).toBe(1);

    expect(get('[1]', [1, 2])).toBe(2);
    expect(get('[1]', [1], [2, 3])).toBe(3);
  });

  test('findIndex', async () => {
    expect(findIndex([1, 2], n => n === 3)).toBe(-1);
    expect(findIndex([1, 2], n => n === 2)).toBe(1);
    expect(
      findIndex(
        [
          null,
          {
            a: 1
          }
        ],
        n => n && n.a === 1
      )
    ).toBe(1);
  });

  test('flatArray', async () => {
    expect(flatArray([1, [2], [3, [4]]])).toEqual([1, 2, 3, 4]);
    expect(flatArray([1, [2], [3, [4]]], 1)).toEqual([1, 2, 3, [4]]);
  });
});
