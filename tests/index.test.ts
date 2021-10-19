import test from 'ava';

import { expand, ExpandOptions } from '../src/index';

test('convert using default options', async (context) => {
  context.deepEqual(await expand({ a: 123 }), { a: 123 });
  context.deepEqual(await expand({ 'a,b': 123 }), { a: 123, b: 123 });
  context.deepEqual(await expand({ ['1,2,3']: 'abc' }), { 1: 'abc', 2: 'abc', 3: 'abc' });
  context.deepEqual(await expand({ ['a, b, c']: 123 }), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ ['a, b,c']: 123 }), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ ['a,        b,        c']: 123 }), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ ['a, b, c']: [1, 2, 3] }), { a: [1, 2, 3], b: [1, 2, 3], c: [1, 2, 3] });

  context.deepEqual(
    await expand({
      ['a, b, c']: () => `test`,
    }),
    { a: `test`, b: `test`, c: `test` }
  );

  context.deepEqual(
    await expand({
      ['a, b, c']: async (val: string) => `test ${val}`,
    }),
    { a: `test a`, b: `test b`, c: `test c` }
  );
});

test('[options] using different separator', async (context) => {
  const options: ExpandOptions = {
    separator: '|',
  };
  context.deepEqual(await expand({ ['a,b,c']: 123 }, options), { 'a,b,c': 123 });
  context.deepEqual(await expand({ ['a|b|c']: 123 }, options), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ ['a | b | c']: 123 }, options), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ ['a | b | c']: [1, 2, 3] }, options), { a: [1, 2, 3], b: [1, 2, 3], c: [1, 2, 3] });
  context.deepEqual(await expand({ ['a|        b|        c']: 123 }, options), { a: 123, b: 123, c: 123 });
});

test('[options] using different splitValues', async (context) => {
  const options: ExpandOptions = {
    splitValues: true,
  };
  context.deepEqual(await expand({ ['a, b, c']: 123 }, options), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ ['a, b, c']: [123] }, options), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ ['a, b, c']: [1, 2, 3] }, options), { a: 1, b: 2, c: 3 });
  context.deepEqual(await expand({ ['a, b, c']: [1, 2, 3, 4] }, options), { a: 1, b: 2, c: 3 });
  context.deepEqual(await expand({ ['a, b, c']: [1, 2] }, options), { a: 1, b: 2, c: 2 });
  context.deepEqual(await expand({ ['a, b, c']: [[123], 2, 3] }, options), { a: [123], b: 2, c: 3 });
});

test('[options] using different deleteRawKey', async (context) => {
  const options: ExpandOptions = {
    deleteRawKey: false,
  };
  context.deepEqual(await expand({ ['a, b, c']: 123 }, options), { 'a, b, c': 123, a: 123, b: 123, c: 123 });
});

test('[options] using different trimSpaces', async (context) => {
  const options: ExpandOptions = {
    trimSpaces: false,
  };
  context.deepEqual(await expand({ ['a,b,c']: 123 }, options), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ ['a, b, c']: 123 }, options), { a: 123, ' b': 123, ' c': 123 });
  context.deepEqual(await expand({ ['a,        b,        c        ']: 123 }, options), { a: 123, '        b': 123, '        c        ': 123 });
});

test('[options] using different tryJoinRepeatedKeys', async (context) => {
  const options: ExpandOptions = {
    tryJoinRepeatedKeys: false,
  };
  context.deepEqual(await expand({ ['a, b, c']: 123 }, options), { a: 123, b: 123, c: 123 });
  context.deepEqual(await expand({ a: 123, ['a, b, c']: 456 }, options), { a: 456, b: 456, c: 456 });
  context.deepEqual(await expand({ ['a, b, c']: 456, a: 123 }, options), { a: 456, b: 456, c: 456 });
});

test('[options] using different resolveFuncs', async (context) => {
  const options: ExpandOptions = {
    resolveFuncs: false,
  };

  const result = await expand<{ a: void; b: void; c: void }>(
    {
      ['a, b, c']: () => `test`,
    },
    options
  );

  context.is(typeof result.a, 'function');
  context.is(typeof result.b, 'function');
  context.is(typeof result.c, 'function');
});
