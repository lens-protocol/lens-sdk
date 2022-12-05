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
import { BigDecimal } from '../arithmetic/BigDecimal';

type AmountValue = BigDecimal | number | string;

export const Denomination = {
  gwei(value: AmountValue) {
    return BigDecimal.from(value).mul(BigDecimal.pow(10, -9));
  },

  wei(value: AmountValue) {
    return BigDecimal.from(value).mul(BigDecimal.pow(10, -18));
  },
};

export class Amount<T extends Asset> {
  private constructor(readonly asset: T, private readonly value: BigDecimal) {}

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

  mul(factor: AmountValue) {
    return new Amount(this.asset, this.value.mul(factor));
  }

  /**
   * Return the internal representation as BigDecimal truncated at the Asset max precision.
   *
   * Favour the use of Amount arithmetic methods to guarantee the maximum precision.
   *
   * Use at your own risk.
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
