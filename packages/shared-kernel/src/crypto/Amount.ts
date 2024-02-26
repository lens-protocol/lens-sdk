import { BigDecimal } from '../arithmetic/BigDecimal';
import { invariant } from '../ts-helpers/invariant';
import {
  Asset,
  CryptoAsset,
  CryptoNativeAsset,
  Erc20,
  Ether,
  ether,
  Fiat,
  Matic,
  matic,
} from './Asset';

/**
 * A type alias for a value that can be used to construct an {@link Amount}
 *
 */
export type AmountValue = BigDecimal | number | string;

/**
 * A set of convenience helpers useful to specify amount values in common denominations.
 *
 */
export const Denomination = {
  /**
   * Creates an amount value in gwei (10^-9)
   *
   * @example
   * Define an Ethers {@link Amount} in gwei:
   *
   * ```ts
   * const etherAmount = Amount.ether(
   *   Denomination.gwei(1)
   * )
   * ```
   * @returns a {@link BigDecimal} instance
   */
  gwei(value: AmountValue) {
    return BigDecimal.from(value).mul(BigDecimal.pow(10, -9));
  },

  /**
   * Creates an amount value in gwei (10^-18)
   *
   * @example
   * Define an Ethers {@link Amount} in wei:
   *
   * ```ts
   * const etherAmount = Amount.ether(
   *   Denomination.wei(42)
   * )
   * ```
   * @returns a {@link BigDecimal} instance
   */
  wei(value: AmountValue) {
    return BigDecimal.from(value).mul(BigDecimal.pow(10, -18));
  },
};

/**
 * Amount is a value object representing an amount of given {@link Asset}.
 *
 * @sealed
 * @typeParam T - The {@link Asset} type of the amount.
 * @remarks
 *
 * Amount hides all the complexity of dealing with the specific precision constraints of different assets.
 * It offers a consistent interface to perform arithmetic operations on amounts.
 *
 * Amount is immutable. All arithmetic operations return a new Amount instance.
 */
export class Amount<T extends Asset> {
  private constructor(readonly asset: T, private readonly value: BigDecimal) {}

  /**
   * Creates a new Amount using the `rate: Amount<C>` as conversion factor.
   *
   * The new Amount will have the {@link Asset} of the `rate` parameter.
   *
   * @typeParam C - The {@link Asset} type to convert to.
   * @example
   * Create the Fiat equivalent of an Ether Amount given the ETH-FIAT rate:
   *
   * ```ts
   * const etherAmount = Amount.ether('1'); // Amount<Ether>
   *
   * const fiatAsset = fiat({ name: 'US Dollar', symbol: 'USD' }); // Fiat
   *
   * const rate = Amount.fiat(fiatAsset, '0.0006'); // Amount<Fiat>
   *
   * const fiatAmount = etherAmount.convert(rate); // Amount<Fiat>
   * ```
   */
  convert<C extends Asset>(rate: Amount<C>): Amount<C> {
    return new Amount(rate.asset, this.value.mul(rate.value));
  }

  /**
   * Equality check for Amounts of the same {@link Asset}.
   *
   * @returns `true` if this Amount is equal to the `amount` parameter.
   */
  eq(amount: Amount<T>) {
    return amount.asset === this.asset && amount.value.eq(this.value);
  }

  /**
   * Greater than check for Amounts of the same {@link Asset}.
   *
   * @returns `true` if this Amount is greater than the `amount` parameter.
   */
  gt(amount: Amount<T>) {
    invariant(
      this.asset === amount.asset,
      `Cannot compare ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`,
    );
    return this.value.gt(amount.value);
  }

  /**
   * Greater than or equal check for Amounts of the same {@link Asset}.
   *
   * @returns `true` if this Amount is greater than or equal to the `amount` parameter.
   */
  gte(amount: Amount<T>) {
    invariant(
      this.asset === amount.asset,
      `Cannot compare ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`,
    );
    return this.value.gte(amount.value);
  }

  /**
   * Less than check for Amounts of the same {@link Asset}.
   *
   * @returns `true` if this Amount is less than the `amount` parameter.
   */
  lt(amount: Amount<T>) {
    return !this.gte(amount);
  }

  /**
   * Less than or equal check for Amounts of the same {@link Asset}.
   *
   * @returns `true` if this Amount is less than or equal to the `amount` parameter.
   */
  lte(amount: Amount<T>) {
    return !this.gt(amount);
  }

  /**
   * Sum of two Amounts of the same {@link Asset}.
   *
   * @returns a new Amount that is the sum of this Amount and the `amount` parameter.
   */
  add(amount: Amount<T>) {
    invariant(
      this.asset === amount.asset,
      `Cannot add ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`,
    );
    return new Amount(this.asset, this.value.add(amount.value));
  }

  /**
   * Difference of two Amounts of the same {@link Asset}.
   *
   * @returns a new Amount that is the difference of this Amount and the `amount` parameter.
   */
  sub(amount: Amount<T>) {
    invariant(
      this.asset === amount.asset,
      `Cannot subtract ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`,
    );
    return new Amount(this.asset, this.value.sub(amount.value));
  }

  /**
   * Product of an Amount and a scalar factor.
   *
   * @returns a new Amount that is the product of this Amount and the `factor` parameter.
   */
  mul(factor: AmountValue) {
    return new Amount(this.asset, this.value.mul(factor));
  }

  /**
   * Quotient of an Amount and a scalar divisor.
   *
   * @returns a new Amount that is the quotient of this Amount and the `divisor` parameter.
   */
  div(divisor: AmountValue) {
    return new Amount(this.asset, this.value.div(divisor));
  }

  /**
   * Converts the internal value as {@link BigDecimal} truncated at the {@link Asset} max precision.
   *
   * Use this as your last resource, you should favour the use of Amount arithmetic methods to have a guarantee maximum precision.
   *
   * **Use at your own risk.**
   *
   * @experimental
   */
  toBigDecimal(): BigDecimal {
    return this.value.toDecimalPlaces(this.asset.decimals, BigDecimal.ROUND_FLOOR);
  }

  /**
   * Formats the Amount value using fixed-point notation.
   *
   * Optionally you can specify the number of decimals to return.
   *
   * @returns the internal value as `string` truncated at this Amount {@link Asset} max precision.
   */
  toFixed(decimals: number = this.asset.decimals): string {
    return this.value.toFixed(decimals);
  }

  /**
   * Formats the Amount value to its maximum precision using a fixed-point notation.
   *
   * Optionally you can specify the number of significant digits to approximate the value to.
   *
   * @returns the internal value as `string` truncated at this Amount {@link Asset} max precision.
   */
  toSignificantDigits(significantDigits: number = this.asset.decimals): string {
    return this.value.toSignificantDigits(significantDigits).toString();
  }

  /**
   * Converts the Amount value as less safe JS `number`.
   *
   * **Use at your own risk.**
   *
   * Type coercion with, for example, JavaScript's unary plus operator will also work.
   *
   * @returns the internal value as `number` that has the potential to lose precision.
   */
  toNumber() {
    return this.value.toNumber();
  }

  /**
   * Convenience method to check if the Amount value is zero.
   *
   * @returns `true` if the Amount value is zero.
   */
  isZero() {
    return this.value.isZero();
  }

  /**
   * Diagnostic method to inspect the internal value.
   *
   * @returns a string representation of the Amount value and {@link Asset} symbol.
   */
  toString() {
    return `${this.toSignificantDigits(6)} ${this.asset.symbol}`;
  }

  /**
   * Creates an Amount of the same {@link Asset} with the new specified `value`.
   *
   * @returns a new Amount with the same {@link Asset} and the new `value`.
   */
  clone(value: AmountValue) {
    return Amount.from(this.asset, value);
  }

  private static from<C extends Asset>(asset: C, value: AmountValue): Amount<C> {
    switch (typeof value) {
      case 'string':
      case 'number':
        return new Amount(asset, new BigDecimal(value));
      default:
        return new Amount(asset, value);
    }
  }

  /**
   *
   *
   * @internal
   */
  static [Symbol.toStringTag] = 'Amount';

  /**
   * Creates an Amount of the specified {@link Erc20} with the specified `value`.
   */
  static erc20<T extends Erc20>(asset: T, value: AmountValue): Amount<T> {
    return this.from(asset, value);
  }

  /**
   * Creates an {@link Ether} Amount with the specified `value`.
   */
  static ether(value: AmountValue): Amount<Ether> {
    return this.from(ether(), value);
  }

  /**
   * Creates an Amount of the specified {@link Fiat} with the specified `value`.
   */
  static fiat<T extends Fiat>(asset: T, value: AmountValue): Amount<Fiat> {
    return this.from(asset, value);
  }

  /**
   * Creates an {@link Matic} Amount with the specified `value`.
   */
  static matic(value: AmountValue): Amount<Matic> {
    return this.from(matic(), value);
  }
}

/**
 * A convenience type to specify a crypto amount.
 *
 */
export type CryptoAmount = Amount<CryptoAsset>;

/**
 * A convenience type to specify a native crypto amount.
 *
 */
export type CryptoNativeAmount = Amount<CryptoNativeAsset>;

/**
 * A convenience type to specify an ERC20 crypto amount.
 *
 */
export type Erc20Amount = Amount<Erc20>;

/**
 * A convenience type to specify a fiat amount.
 *
 */
export type FiatAmount = Amount<Fiat>;
