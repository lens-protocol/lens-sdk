import { update } from '../update';

const updater = async (value: string) => value.toUpperCase();

const input = {
  foo: 'bar',
  bar: {
    qux: 'quux',
  },
  baz: ['qux', 'quux'],
  qax: [
    {
      qux: 'quux',
    },
    {
      qux: 'quux',
    },
  ],
};

describe(`Given the ${update.name} function`, () => {
  describe(`when calling it with an object`, () => {
    it('should not mutate the input object', () => {
      const result = update(input, [], updater);

      expect(result).not.toBe(input);
    });
  });

  describe(`when calling it with simple path(s)`, () => {
    it('should update the specified location(s) with the provided updater function', async () => {
      const paths = ['foo'];

      const result = await update(input, paths, updater);

      expect(result).toMatchInlineSnapshot(`
        {
          "bar": {
            "qux": "quux",
          },
          "baz": [
            "qux",
            "quux",
          ],
          "foo": "BAR",
          "qax": [
            {
              "qux": "quux",
            },
            {
              "qux": "quux",
            },
          ],
        }
      `);
    });
  });

  describe(`when calling it with nested path(s)`, () => {
    it('should update the specified location(s) with the provided updater function', async () => {
      const paths = ['baz.qux'];

      const result = await update(input, paths, updater);

      expect(result).toMatchInlineSnapshot(`
        {
          "bar": {
            "qux": "quux",
          },
          "baz": [
            "qux",
            "quux",
          ],
          "foo": "bar",
          "qax": [
            {
              "qux": "quux",
            },
            {
              "qux": "quux",
            },
          ],
        }
      `);
    });
  });

  describe(`when calling it with path(s) involving array indexes`, () => {
    it('should update the specified location(s) with the provided updater function', async () => {
      const paths = ['baz[n]', 'qax[n].qux'];

      const result = await update(input, paths, updater);

      expect(result).toMatchInlineSnapshot(`
        {
          "bar": {
            "qux": "quux",
          },
          "baz": [
            "QUX",
            "QUUX",
          ],
          "foo": "bar",
          "qax": [
            {
              "qux": "QUUX",
            },
            {
              "qux": "QUUX",
            },
          ],
        }
      `);
    });
  });
});
