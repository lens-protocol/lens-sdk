import { mockDaiAmount } from '@lens-protocol/shared-kernel/mocks';

import { Erc20AmountSchema } from '../common';

describe(`Given the Erc20AmountSchema`, () => {
  const amount = mockDaiAmount(1);

  describe(`when parsing a serialized Erc20Amount`, () => {
    it('should be able return the expected Erc20Amount instance', () => {
      const serialized = JSON.parse(JSON.stringify(amount)) as object;

      const parsed = Erc20AmountSchema.parse(serialized);

      expect(parsed.eq(amount)).toBe(true);
    });
  });

  describe(`when parsing a Erc20Amount instance`, () => {
    it('should verify and return it', () => {
      const parsed = Erc20AmountSchema.parse(amount);

      expect(parsed.eq(amount)).toBe(true);
    });
  });
});
