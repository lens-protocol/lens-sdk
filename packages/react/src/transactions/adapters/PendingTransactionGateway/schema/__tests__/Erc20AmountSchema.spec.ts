import { mockDaiAmount } from '@lens-protocol/shared-kernel/mocks';

import { Erc20AmountSchema } from '../common';

describe(`Given the Erc20AmountSchema`, () => {
  describe(`when parsing a serialized Erc20Amount`, () => {
    it('should be able return the expected Erc20Amount instance', () => {
      const amount = mockDaiAmount(1);
      const serialized = JSON.parse(JSON.stringify(amount)) as object;

      const parsed = Erc20AmountSchema.parse(serialized);

      expect(parsed.eq(amount)).toBe(true);
    });
  });
});
