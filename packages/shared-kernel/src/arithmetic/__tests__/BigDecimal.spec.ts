import { BigDecimal } from '../BigDecimal';

describe('Given an instance of the BigDecimal type', () => {
  describe('when invoking "toString"', () => {
    it('should use fixed-point notation up to 10^18', () => {
      [
        {
          number: new BigDecimal('1e+17'),
          expected: '100000000000000000',
        },
        {
          number: new BigDecimal('1e+18'),
          expected: '1e+18',
        },
      ].forEach(({ number, expected }) => {
        expect(number.toString()).toEqual(expected);
      });
    });

    it('should use fixed-point notation up to 10^-18', () => {
      [
        {
          number: new BigDecimal('1e-18'),
          expected: '0.000000000000000001',
        },
        {
          number: new BigDecimal('1e-19'),
          expected: '1e-19',
        },
      ].forEach(({ number, expected }) => {
        expect(number.toString()).toEqual(expected);
      });
    });
  });

  describe('when performing an operation that requires rounding', () => {
    it('should default to ROUND_HALF_CEIL type of rounding', () => {
      [
        {
          number: new BigDecimal('0.1'),
          expected: '0',
        },
        {
          number: new BigDecimal('0.4'),
          expected: '0',
        },
        {
          number: new BigDecimal('0.5'),
          expected: '1',
        },
        {
          number: new BigDecimal('0.6'),
          expected: '1',
        },
        {
          number: new BigDecimal('0.9'),
          expected: '1',
        },
      ].map(({ number, expected }) => {
        expect(number.toFixed(0)).toEqual(expected);
      });
    });
  });
});
