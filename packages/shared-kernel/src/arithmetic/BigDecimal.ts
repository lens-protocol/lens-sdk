import DecimalJS from 'decimal.js';

import { invariant } from '../ts-helpers/invariant';

/**
 * BigDecimal is a value object representing an high precision decimal number.
 *
 * @sealed
 */
export class BigDecimal extends DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND_HALF_CEIL,
}) {
  /**
   * Syntactic sugar over new BigDecimal
   *
   * @internal
   */
  static from(value: DecimalJS.Value) {
    return new BigDecimal(value);
  }

  /**
   * Computes the mean of the given values
   *
   * @internal
   */
  static mean(values: BigDecimal[]): BigDecimal {
    invariant(values.length > 1, '2+ values must be provided');
    return values.reduce((total, value) => total.add(value)).div(values.length);
  }

  /**
   * Rescales the given value by the given power of 10
   *
   * @internal
   */
  static rescale(value: BigDecimal, powerOfTen: number) {
    return value.mul(BigDecimal.pow(10, powerOfTen));
  }
}
