import { ChainType } from './ChainType';

/**
 * Kind is an enum representing the kind of asset.
 *
 * @group Common
 * @remarks
 *
 * - NATIVE: Native token, e.g. Ether, Matic
 * - ERC20: ERC20 token
 * - FIAT: Fiat currency e.g. USD, GBP, EUR
 */
export enum Kind {
  NATIVE,
  ERC20,
  FIAT,
}

/**
 * WellKnownSymbols is a convenience enum for well known symbols.
 *
 * @group Common
 */
export enum WellKnownSymbols {
  ETH = 'ETH',
  MATIC = 'MATIC',
  USD = 'USD',
  USDC = 'USDC',
}

/**
 * NativeType is an enum representing the supported native token types.
 *
 * @group Common
 */
export enum NativeType {
  ETHER,
  MATIC,
}

/**
 * Fiat is a value object representing a fiat currency.
 *
 * @group Common

 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 */
class Fiat {
  readonly kind = Kind.FIAT as const;
  readonly decimals: number = 2 as const;

  constructor(readonly name: string, readonly symbol: string) {}

  /**
   * @internal
   */
  get hash() {
    return this.symbol;
  }

  isErc20(): this is Erc20 {
    return false;
  }

  isFiat(): this is Fiat {
    return true;
  }

  toString() {
    return this.symbol;
  }
}

/**
 * Ether is a value object representing the Ether token.
 *
 * @group Common

 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 */
class Ether {
  readonly kind = Kind.NATIVE as const;
  readonly type = NativeType.ETHER as const;
  readonly name: string = 'Ethereum' as const;
  readonly decimals: number = 18;
  readonly symbol: string = WellKnownSymbols.ETH as const;
  readonly chainType: ChainType = ChainType.ETHEREUM;

  /**
   * @internal
   */
  get hash() {
    return this.type.toString();
  }

  isErc20(): this is Erc20 {
    return false;
  }

  isNativeToken(): this is CryptoNativeAsset {
    return true;
  }

  isFiat(): this is Fiat {
    return false;
  }

  toString() {
    return this.symbol;
  }
}

/**
 * Matic is a value object representing the Matic token.
 *
 * @group Common
 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 */
class Matic {
  readonly kind = Kind.NATIVE as const;
  readonly type = NativeType.MATIC as const;
  readonly name = 'Matic' as const;
  readonly decimals = 18 as const;
  readonly symbol = WellKnownSymbols.MATIC as const;
  readonly chainType: ChainType = ChainType.POLYGON;

  /**
   * @internal
   */
  get hash() {
    return this.type.toString();
  }

  isErc20(): this is Erc20 {
    return false;
  }

  isNativeToken(): this is CryptoNativeAsset {
    return true;
  }

  isFiat(): this is Fiat {
    return false;
  }

  toString() {
    return this.symbol;
  }
}

/**
 * Erc20 is a value object representing an ERC20 token.
 *
 * @group Common
 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 */
class Erc20 {
  readonly kind = Kind.ERC20 as const;

  constructor(
    readonly name: string,
    readonly decimals: number,
    readonly symbol: string,
    readonly address: string,
    readonly chainType: ChainType,
  ) {}

  /**
   * @internal
   */
  get hash() {
    return `${this.chainType}:${this.address}`;
  }

  isErc20(): this is Erc20 {
    return true;
  }

  isNativeToken(): this is CryptoNativeAsset {
    return false;
  }

  isFiat(): this is Fiat {
    return false;
  }

  toString() {
    return `${this.symbol}[chain: ${this.chainType}]`;
  }
}

// Exporting of type only is intentional
export type { Erc20, Ether, Matic, Fiat };

/**
 * Asset is a convenience union of value objects representing currency or token.
 *
 * Asset instances are immutable and can be compared using reference equality (`===`).
 *
 * @group Common
 */
export type Asset = Fiat | Ether | Erc20 | Matic;

/**
 * CryptoAsset is a convenience union representing tokens that are native to the supported blockchains.
 *
 * @group Common
 * @remarks
 *
 * The reason we make a distinction between CryptoAsset and {@link Asset} is that CryptoAsset are
 * kind of "special" in that they are the only assets that do not have a canonical contract address
 * and they are used to pay for gas fees.
 */
export type CryptoNativeAsset = Ether | Matic;

/**
 * CryptoAsset is a convenience union representing currencies that are blockchain tokens.
 *
 * @group Common
 */
export type CryptoAsset = Ether | Erc20 | Matic;

const instances = new Map<string, Asset>();

function immutable(key: string, asset: Ether): Ether;
function immutable(key: string, asset: Matic): Matic;
function immutable(key: string, asset: Fiat): Fiat;
function immutable(key: string, asset: Erc20): Erc20;
function immutable(key: string, asset: Asset): Asset {
  if (instances.has(key)) {
    return instances.get(key)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  instances.set(key, asset);
  return asset;
}

/**
 * Initialization object for {@link erc20} factory function
 *
 * @group Common
 */
export type Erc20Info = {
  address: string;
  chainType: ChainType;
  decimals: number;
  name: string;
  symbol: string;
};

/**
 * Erc20 asset factory function.
 *
 * Erc20 instances, like all {@link Asset} instances, are immutable and can be compared using reference equality (`===`).
 *
 * @group Common
 * @param info - {@link Erc20Info details}
 * @returns An Erc20 instance.
 */
export function erc20({ name, decimals, symbol, address, chainType }: Erc20Info) {
  const asset = new Erc20(name, decimals, symbol, address, chainType);
  return immutable(asset.hash, asset);
}

/**
 * Matic asset provider function.
 *
 * There is only one Matic token, so this function returns the same instance every time.
 *
 * @group Common
 * @returns The Matic instance.
 */
export function matic(): Matic {
  const asset = new Matic();
  return immutable(asset.hash, asset);
}

/**
 * Ether asset provider function.
 *
 * There is only one Ether token, so this function returns the same instance every time.
 *
 * @group Common
 * @returns The Ether instance.
 */
export function ether(): Ether {
  const asset = new Ether();
  return immutable(asset.hash, asset);
}

/**
 * A convenience function to create a Fiat asset for USD.
 *
 * There is only one USD token, so this function returns the same instance every time.
 *
 * @group Common
 * @returns The USD Fiat instance.
 */
export function usd(): Fiat {
  const asset = new Fiat('United States dollar', WellKnownSymbols.USD);
  return immutable(asset.hash, asset);
}
