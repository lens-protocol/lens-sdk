import { ChainType } from './ChainType';

export enum Kind {
  NATIVE,
  ERC20,
  FIAT,
}

export enum WellKnownSymbols {
  ETH = 'ETH',
  MATIC = 'MATIC',
  USD = 'USD',
  USDC = 'USDC',
}

export enum NativeType {
  ETHER,
  MATIC,
}

// DO NOT EXPORT, see type export later on
class Fiat {
  readonly kind = Kind.FIAT as const;
  readonly decimals: number = 2 as const;

  constructor(readonly name: string, readonly symbol: string) {}

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

// DO NOT EXPORT, see type export later on
class Ether {
  readonly kind = Kind.NATIVE as const;
  readonly type = NativeType.ETHER as const;
  readonly name: string = 'Ethereum' as const;
  readonly decimals: number = 18;
  readonly symbol: string = WellKnownSymbols.ETH as const;
  readonly chainType: ChainType = ChainType.ETHEREUM;

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

// DO NOT EXPORT, see type export later on
class Matic {
  readonly kind = Kind.NATIVE as const;
  readonly type = NativeType.MATIC as const;
  readonly name = 'Matic' as const;
  readonly decimals = 18 as const;
  readonly symbol = WellKnownSymbols.MATIC as const;
  readonly chainType: ChainType = ChainType.POLYGON;

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

export type Erc20Info = {
  address: string;
  chainType: ChainType;
  decimals: number;
  name: string;
  symbol: string;
};

// DO NOT EXPORT, see type export later on
class Erc20 {
  readonly kind = Kind.ERC20 as const;

  constructor(
    readonly name: string,
    readonly decimals: number,
    readonly symbol: string,
    readonly address: string,
    readonly chainType: ChainType,
  ) {}

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

export type Asset = Fiat | Ether | Erc20 | Matic;

export type CryptoNativeAsset = Ether | Matic;

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
 * Given the same chainId and address it returns the same Erc20 instance.
 * Useful for fast reference equality (===).
 *
 * @param info ERC20 token details
 * @returns Erc20
 */
export function erc20({ name, decimals, symbol, address, chainType }: Erc20Info) {
  const asset = new Erc20(name, decimals, symbol, address, chainType);
  return immutable(asset.hash, asset);
}

/**
 * Returns the same Matic instance for Matic token on Polygon chain.
 * Useful for fast reference equality (===).
 *
 * @returns Matic
 */
export function matic(): Matic {
  const asset = new Matic();
  return immutable(asset.hash, asset);
}

/**
 * Returns the same Eth instance.
 * Useful for fast reference equality (===).
 *
 * @returns Ether
 */
export function ether(): Ether {
  const asset = new Ether();
  return immutable(asset.hash, asset);
}

/**
 * Returns the same instance Fiat.
 * Useful for fast reference equality (===).
 *
 * @returns Fiat
 */
export function usd(): Fiat {
  const asset = new Fiat('United States dollar', WellKnownSymbols.USD);
  return immutable(asset.hash, asset);
}
