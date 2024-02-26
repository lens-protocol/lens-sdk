import { ChainType } from './ChainType';
import { EvmAddress } from './types';

/** @internal */
export enum Kind {
  NATIVE,
  ERC20,
  FIAT,
}

/**
 * WellKnownSymbols is a convenience enum for well known asset symbols.
 *
 */
export enum WellKnownSymbols {
  ETH = 'ETH',
  MATIC = 'MATIC',
}

/** @internal */
export enum NativeType {
  ETHER,
  MATIC,
}

/**
 * Fiat is a value object representing a fiat currency.
 *
 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 */
class Fiat {
  /** @internal */
  readonly kind = Kind.FIAT as const;
  readonly decimals: number = 2 as const;

  constructor(readonly name: string, readonly symbol: string) {}

  /** @internal */
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
 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 */
class Ether {
  /** @internal */
  readonly kind = Kind.NATIVE as const;
  /** @internal */
  readonly type = NativeType.ETHER as const;
  readonly name: string = 'Ethereum' as const;
  readonly decimals: number = 18;
  readonly symbol: string = WellKnownSymbols.ETH as const;
  readonly chainType: ChainType = ChainType.ETHEREUM;

  /** @internal */
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
 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 */
class Matic {
  /** @internal */
  readonly kind = Kind.NATIVE as const;
  /** @internal */
  readonly type = NativeType.MATIC as const;
  readonly name = 'Matic' as const;
  readonly decimals = 18 as const;
  readonly symbol = WellKnownSymbols.MATIC as const;
  readonly chainType: ChainType = ChainType.POLYGON;

  /** @internal */
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
 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 */
class Erc20 {
  /** @internal */
  readonly kind = Kind.ERC20 as const;

  constructor(
    readonly name: string,
    readonly decimals: number,
    readonly symbol: string,
    readonly address: EvmAddress,
    readonly chainType: ChainType,
  ) {}

  /** @internal */
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
 */
export type Asset = Fiat | Ether | Erc20 | Matic;

/**
 * CryptoAsset is a convenience union representing tokens that are native to the supported blockchains.
 *
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
 * Initialization object for `erc20` factory function
 *
 */
export type Erc20Info = {
  address: EvmAddress;
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
 * @param info - {@link Erc20Info} details
 * @returns An Erc20 asset instance.
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
 * @returns The Ether instance.
 */
export function ether(): Ether {
  const asset = new Ether();
  return immutable(asset.hash, asset);
}

/**
 * Initialization object for `fiat` factory function
 */
export type FiatInfo = {
  name: string;
  symbol: string;
};

/**
 * Fiat asset factory function.
 *
 * Fiat instances, like all {@link Asset} instances, are immutable and can be compared using reference equality (`===`).
 *
 * @param info - {@link FiatInfo} details
 * @returns An Fiat asset instance.
 */
export function fiat({ name, symbol }: FiatInfo) {
  const asset = new Fiat(name, symbol);
  return immutable(asset.hash, asset);
}
