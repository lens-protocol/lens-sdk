import { BigDecimal } from '../../arithmetic/BigDecimal';
import { InvariantError } from '../../ts-helpers/invariant';
import { Amount } from '../Amount';
import { mockDaiAmount, mockUsdAmount, mockUsdcAmount } from '../__helpers__/mocks';

describe('Given the Amount type', () => {
  describe('when "convert" method is invoked with a rate Amount', () => {
    it('should return a new Amount that is the conversion of the original amount with the provided rate', () => {
      const rate = mockUsdAmount('10000'); // ETH to 10k!!!
      const amount = Amount.ether('2');

      const actual = amount.convert(rate);

      const expected = mockUsdAmount('20000');
      expect(actual.eq(expected)).toBe(true);
    });
  });

  describe('when adding 2 Amount together', () => {
    it('should return a new Amount that is the sum of the 2 amounts', () => {
      const amount1 = mockUsdAmount(2);
      const amount2 = mockUsdAmount(2);

      const expected = mockUsdAmount(4);
      expect(amount1.add(amount2).eq(expected)).toBe(true);
    });

    it('should throw an InvariantError if the Amount asset is different', () => {
      const amount1 = mockDaiAmount(2);
      const amount2 = mockUsdcAmount(2);

      expect(() => amount1.add(amount2)).toThrow(InvariantError);
    });
  });

  describe('when subtracting an Amount by another', () => {
    it('should return a new Amount that is the difference of the 2 amounts', () => {
      const amount1 = mockUsdAmount(2);
      const amount2 = mockUsdAmount(3);

      const expected = mockUsdAmount(-1);
      expect(amount1.sub(amount2)).toEqual(expected);
    });

    it('should throw an InvariantError if the Amount asset is different', () => {
      const amount1 = mockDaiAmount(2);
      const amount2 = mockUsdcAmount(2);

      expect(() => amount1.sub(amount2)).toThrow(InvariantError);
    });
  });

  describe('when multiplying an Amount for a scalar', () => {
    it('should return the expected Amount', () => {
      const amount = mockUsdAmount(42);

      const actual = amount.mul(2);

      const expected = mockUsdAmount(84);
      expect(actual).toEqual(expected);
    });
  });

  describe('when dividing an Amount by a scalar', () => {
    it('should return the expected Amount', () => {
      const amount = mockUsdAmount(42);

      const actual = amount.div(2);

      const expected = mockUsdAmount(21);
      expect(actual).toEqual(expected);
    });
  });

  describe('when comparing 2 compatible Amount together', () => {
    it('should be possible to determine if one is "greater than" the other', () => {
      const amount1 = mockUsdAmount(1);
      const amount2 = mockUsdAmount(2);

      expect(amount1.gt(amount2)).toBe(false);
      expect(amount2.gt(amount1)).toBe(true);
    });

    it('should be possible to determine if one is "greater or equal than" the other', () => {
      const amount1 = mockUsdAmount(1);
      const amount2 = mockUsdAmount(2);
      const amount3 = mockUsdAmount(2);

      expect(amount1.gte(amount2)).toBe(false);
      expect(amount2.gte(amount1)).toBe(true);
      expect(amount3.gte(amount2)).toBe(true);
    });

    it('should be possible to determine if one is "less than" the other', () => {
      const amount1 = mockUsdAmount(1);
      const amount2 = mockUsdAmount(2);

      expect(amount1.lt(amount2)).toBe(true);
      expect(amount2.lt(amount1)).toBe(false);
    });

    it('should be possible to determine if one is "less or equal than" the other', () => {
      const amount1 = mockUsdAmount(1);
      const amount2 = mockUsdAmount(2);
      const amount3 = mockUsdAmount(2);

      expect(amount1.lte(amount2)).toBe(true);
      expect(amount2.lte(amount1)).toBe(false);
      expect(amount3.lte(amount2)).toBe(true);
    });

    it('should throw an InvariantError if the Amount asset is different', () => {
      const amount1 = mockDaiAmount(2);
      const amount2 = mockUsdcAmount(2);

      expect(() => amount1.gt(amount2)).toThrow(InvariantError);
    });
  });

  describe('when "toSignificantDigits" is invoked', () => {
    it.each([
      ['42', Amount.ether(42)],
      ['42.12', Amount.ether(42.1234)],
      ['0.1234', Amount.ether(0.1234)],
      ['0.0012', Amount.ether(0.0012)],
      ['0.00001234', Amount.ether(0.00001234)],
    ])(
      'should format %s to show up the specified amount of significant digits',
      (expected, amount) => {
        const actual = amount.toSignificantDigits(4);

        expect(actual).toEqual(expected);
      },
    );
  });

  describe('when "toFixed" is invoked', () => {
    it.each([
      ['42.00', Amount.ether(42)],
      ['42.12', Amount.ether(42.1234)],
      ['0.12', Amount.ether(0.1234)],
      ['0.00', Amount.ether(0.0012)],
      ['0.00', Amount.ether(0.00001234)],
    ])('should format %s to show up the specified amount of decimals', (expected, amount) => {
      const actual = amount.toFixed(2);

      expect(actual).toEqual(expected);
    });
  });

  describe('when "toFixed" is invoked with no argument', () => {
    it.each([
      ['42.000000000000000000', Amount.ether(42)],
      ['0.000000000000000000', Amount.ether('0.0000000000000000001')],
      ['0.000000000000000001', Amount.ether('0.0000000000000000005')],
    ])(
      'should format %s to show up the amount of decimals of the Amount asset',
      (expected, amount) => {
        const actual = amount.toFixed();

        expect(actual).toEqual(expected);
      },
    );
  });

  describe('when "toNumber" is invoked', () => {
    it('should return %s the internal value as unsafe JS Number', () => {
      const value = Math.PI;
      const amount = mockUsdAmount(value);

      const actual = amount.toNumber();

      expect(actual).toEqual(value);
    });
  });

  describe('when "isZero" is invoked', () => {
    it('should return "true" if the internal value is zero', () => {
      [42, 0].map((value) => {
        const amount = mockUsdAmount(value);

        expect(amount.isZero()).toBe(value === 0);
      });
    });
  });

  describe('when "toBigDecimal" is invoked', () => {
    it('should return a BigDecimal with decimals truncated to the max Asset precision (i.e. decimals)', () => {
      const testCases = [
        [mockUsdAmount(42.123456789), BigDecimal.from('42.12')],
        [mockUsdAmount(42), BigDecimal.from('42.00')],
      ] as const;

      testCases.map(([amount, expected]) => {
        expect(amount.toBigDecimal()).toEqual(expected);
      });
    });
  });
});
