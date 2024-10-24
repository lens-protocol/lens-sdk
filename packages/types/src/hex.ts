import type { Tagged } from 'type-fest';

/**
 * A string that represents a hex value with a `0x` prefix.
 */
export type HexString = `0x${string}`;
export function hexString<T extends string = HexString>(value: string): T {
  return value as T;
}

/**
 * An EVM address.
 */
export type EvmAddress = Tagged<HexString, 'EvmAddress'>;
export const evmAddress = hexString<EvmAddress>;

/**
 * RLP-encoded blockchain data.
 */
export type BlockchainData = Tagged<HexString, 'BlockchainData'>;

/**
 * A signature.
 */
export type Signature = Tagged<HexString, 'Signature'>;
export const signatureFrom = hexString<Signature>;

/**
 * An RLP-encoded transaction.
 */
export type EncodedTransaction = Tagged<HexString, 'EncodedTransaction'>;

/**
 * A transaction hash.
 */
export type TxHash = Tagged<HexString, 'TxHash'>;
