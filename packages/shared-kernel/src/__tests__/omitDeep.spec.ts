import { omitDeep } from '../omitDeep';

describe('Given the omitDeep helper', () => {
  describe('when invoked on an object', () => {
    it('should remove the specified key from nested objects', () => {
      const actual = omitDeep(
        {
          key: 42,
          bar: {
            foo: 'foo',
            key: true,
          },
        },
        'key',
      );

      expect(actual).toEqual({
        bar: {
          foo: 'foo',
        },
      });
    });

    it('should remove the specified key from objects in nested arrays', () => {
      const actual = omitDeep(
        {
          arr: [{ key: 42, bar: true }],
        },
        'key',
      );

      expect(actual).toEqual({
        arr: [{ bar: true }],
      });
    });

    it('should leave primitive types untouched', () => {
      const primitives = {
        string: 'string',
        boolean: true,
        number: 42,
        symbol: Symbol('symbol'),
        bigint: BigInt(42),
        undefined: undefined,
        null: null,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function: () => {},
      };
      const actual = omitDeep(primitives, 'not-relevant');

      expect(actual).toEqual(primitives);
    });
  });
});
