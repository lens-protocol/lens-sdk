import { SafeParseError, SafeParseReturnType, z } from 'zod';

import { formatZodError } from '../formatters';

function assertZodError(
  result: SafeParseReturnType<unknown, unknown>,
): asserts result is SafeParseError<unknown> {
  if (result.success) {
    throw new Error('Expected an error');
  }
}

describe(`Given the schema formatters`, () => {
  describe(`when using the "${formatZodError.name}" function`, () => {
    const Schema = z.object({
      number: z.number().optional(),
      required: z.string(),
      empty: z.array(z.string()).nonempty(),
      array: z.array(z.string()),
      union: z.union([
        z.string(),
        z.number(),
        z.object({
          required: z.string(),
        }),
      ]),
      tuple: z.tuple([z.string(), z.number()]),
    });

    it('should generate the expected message', () => {
      const result = Schema.safeParse({
        number: 'not a number',
        empty: [],
        array: ['1', 2, '3'],
        union: true,
        tuple: [42, 'not a string'],
      });
      assertZodError(result);

      expect(formatZodError(result.error)).toMatchInlineSnapshot(`
        "fix the following issues
        · "number": Expected number, received string
        · "required": Required
        · "empty": Array must contain at least 1 element(s)
        · "array[1]": Expected string, received number
        · "union": expected to match one of the following groups:
        		"union": Expected string, received boolean
        	OR:
        		"union": Expected number, received boolean
        	OR:
        		"union": Expected object, received boolean
        · "tuple[0]": Expected string, received number
        · "tuple[1]": Expected number, received string"
      `);
    });
  });
});
