# Vue Formily Util

Common JavaScript utility library with performance, lightweight.

## Getting Started

### Installation

```sh
# install with yarn
yarn add @vue-formily/util

# install with npm
npm install @vue-formily/util --save
```

## Utilities

### isNullOrUndefined
Returns `true` if value is `null` or `undefined`.

```js
isNullOrUndefined(value: any): boolean;
```

### isPlainObject
Strict object type check. Only returns `true` for plain JavaScript objects.

```js
isPlainObject(value: any): boolean;
```

### isUndefined
Returns `true` if value has type `number`.

```js
isUndefined(value: any): boolean;
```

### isNumber
Returns `true` if value has type `number`.

```js
isNumber(value: any): boolean;
```

### isString
Returns `true` if value has type `string`.

```js
isString(value: any): boolean;
```

### isNumeric
Check if the input string contains only numeric characters.

```js
isNumeric(value: string): boolean;

// Examples:
isNumeric('123'); // true
isNumeric('123.12'); // true
isNumeric('.12'); // true
isNumeric('-.12'); // true
isNumeric('-12.12'); // true
isNumeric('12e12'); // true
isNumeric(NaN); // false
isNumeric(null); // false
isNumeric([]); // false
isNumeric({}); // false
isNumeric(undefined); // false
```

### isFunction
Returns `true` if value is a `function`.

```js
isFunction(value: string): boolean;
```

### isEmpty
Returns true if the object is empty. Empty is defined as:
- null
- undefined
- a string with zero length
- an array with no elements
- a collection with no elements

```js
isEmpty(value: any): boolean;

// Examples:
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(false); // false
isEmpty([]); // true
isEmpty({}); // true
isEmpty({ a: 1 }); // false
isEmpty([1]); // false
isEmpty(''); // true
isEmpty(' '); // false
```

### isEqual
Returns true if 2 passed values are equal

```js
isEqual(value: any): boolean;

// Examples:
isEqual(1, 1); // true
isEqual('1', '1'); // true
isEqual(undefined, undefined); // true
isEqual(null, undefined); // false
isEqual(new Date('01/04/2022'), new Date('01/04/2022')); // true
isEqual(new Date('01/04/2022'), new Date('01/04/2023')); // false
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
); // true
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
); //false
isEqual([1, { a: 1 }], [1, { a: 1 }]); // true
isEqual([1, { a: 1, b: 2 }], [1, { b: 2, a: 1 }]); // true
```

### merge
Merge objects or arrays

```js
merge(target: any, ...sources: any[]): any;

// Examples:
merge({}, { test: 1, test2: [{ a: 1 }, 1] }, { test2: [{ b: 1 }] }); // { test: 1, test2: [{ a: 1, b: 1 }, 1] }
merge([1, { a: 1}], [2, { a: 2, b: 1 }, 3]); // [2, { a: 2, b: 1 }, 3]
```

### get
Find the first found value in objects or arrays by its path.

```js
get(path: string | string[], ...args: any[]): any;

// Examples:
get('a.b[1]', { a: { b: [1, 3] } }); // 3
get('[1]', [1], [2, 3]); // 3
```

### findIndex
Returns the index of the first element in the array that satisfies the provided testing function, ortherwise, returns `-1`.

```js
findIndex(arr: any[] = [], fn: (...args: any[]) => boolean): number;

// Examples:
findIndex([1, 2], n => n === 2); // 1
findIndex([null, { a: 1 }], n => n && n.a === 1); // 3
```

### flatArray
Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

```js
flatArray(arr: any[], deep = Infinity): any[];

// Examples:
flatArray([1, [2], [3, [4]]]) // [1, 2, 3, 4]
```


### interpolate
Simple string formatter.

```js
flatArray(arr: any[], deep = Infinity): any[];

// Examples:
interpolate('{a[b]} {a[c][d]} {value} test', {
  value: 1,
  a: {
    b: 'test',
    c: {
      d: 'aaa'
    }
  }
}) // test aaa 1 test

interpolate('{a.b} {a.c.d} {value} test', {
  value: 1,
  a: {
    b: 'test',
    c: {
      d: 'aaa'
    }
  }
}) // test aaa 1 test

interpolate('{a.b} {a.c[d]} {a.d[2]} {value} test', {
  value: 1,
  a: {
    b: 'test',
    c: {
      d: 'aaa'
    },
    d: [1, 2, 3]
  }
}) // test aaa 3 1 test
```

## Contributing

You are welcome to contribute to this project.

## License

[MIT](https://github.com/haan123/vue-formily/util/blob/main/LICENSE)
