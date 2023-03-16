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
  usd,
} from './Asset';

export type AmountValue = BigDecimal | number | string;

/**
 * A set of convenience helpers useful to specify amount values in common denominations.
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
 *
 * @remarks
 *
 * Amount hides all the complexity of dealing with different precision of different assets.
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
   * @example
   * Create the USD equivalent of an Ether Amount given the ETH-USD rate:
   *
   * ```ts
   * const etherAmount = Amount.ether('1'); // Amount<Ether>
   *
   * const rate = Amount.usd('0.0006'); // Amount<Fiat>
   *
   * const usdAmount = etherAmount.convert(rate); // Amount<Fiat>
   * ```
   */
  convert<C extends Asset>(rate: Amount<C>): Amount<C> {
    return new Amount(rate.asset, this.value.mul(rate.value));
  }

  eq(amount: Amount<T>) {
    return amount.asset === this.asset && amount.value.eq(this.value);
  }

  gt(amount: Amount<T>) {
    invariant(
      this.asset === amount.asset,
      `Cannot compare ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`,
    );
    return this.value.gt(amount.value);
  }

  gte(amount: Amount<T>) {
    invariant(
      this.asset === amount.asset,
      `Cannot compare ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`,
    );
    return this.value.gte(amount.value);
  }

  lt(amount: Amount<T>) {
    return !this.gte(amount);
  }

  lte(amount: Amount<T>) {
    return !this.gt(amount);
  }

  add(amount: Amount<T>) {
    invariant(
      this.asset === amount.asset,
      `Cannot add ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`,
    );
    return new Amount(this.asset, this.value.add(amount.value));
  }

  sub(amount: Amount<T>) {
    invariant(
      this.asset === amount.asset,
      `Cannot subtract ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`,
    );
    return new Amount(this.asset, this.value.sub(amount.value));
  }

  mul(factor: AmountValue) {
    return new Amount(this.asset, this.value.mul(factor));
  }

  div(divisor: AmountValue) {
    return new Amount(this.asset, this.value.div(divisor));
  }

  /**
   * Return the internal value representation as BigDecimal truncated at the {@link Asset} max precision.
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

  toFixed(decimals: number = this.asset.decimals): string {
    return this.value.toFixed(decimals);
  }

  toSignificantDigits(significantDigits: number = this.asset.decimals): string {
    return this.value.toSignificantDigits(significantDigits).toString();
  }

  toNumber() {
    return this.value.toNumber();
  }

  isZero() {
    return this.value.isZero();
  }

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

  static erc20<T extends Erc20>(asset: T, value: AmountValue): Amount<T> {
    return this.from(asset, value);
  }

  static ether(value: AmountValue): Amount<Ether> {
    return this.from(ether(), value);
  }

  static usd(value: AmountValue): Amount<Fiat> {
    return this.from(usd(), value);
  }

  static matic(value: AmountValue): Amount<Matic> {
    return this.from(matic(), value);
  }
}

export type CryptoAmount = Amount<CryptoAsset>;

export type CryptoNativeAmount = Amount<CryptoNativeAsset>;

export type FiatAmount = Amount<Fiat>;
