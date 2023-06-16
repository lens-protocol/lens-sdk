import { mockDaiAmount } from '@lens-protocol/shared-kernel/mocks';

import { Erc20AmountInstanceSchema, SerializedErc20AmountSchema } from '../common';

describe(`Given the Erc20Amount schemas`, () => {
  const amount = mockDaiAmount(1);

  describe(`when parsing a value with SerializedErc20AmountSchema`, () => {
    it('should be able return the expected Erc20Amount instance', () => {
      const serialized = JSON.parse(JSON.stringify(amount)) as object;

      const parsed = SerializedErc20AmountSchema.parse(serialized);

      expect(parsed.eq(amount)).toBe(true);
    });
  });

  describe(`when parsing a value with Erc20AmountInstanceSchema`, () => {
    it('should verify instances of Erc20Amount', () => {
      const parsed = Erc20AmountInstanceSchema.parse(amount);

      expect(parsed.eq(amount)).toBe(true);
    });
  });
});
