import type { Tagged } from 'type-fest';
import { invariant } from './helpers';

/**
 * A string that represents a hex value with a `0x` prefix.
 */
export type HexString = `0x${string}`;

/**
 * Validates whether a given value is a valid hex string with a `0x` prefix.
 */
export function isValidHexString(value: string): value is HexString {
  const hexPattern = /^0x[a-fA-F0-9]+$/;
  return typeof value === 'string' && hexPattern.test(value);
}

/**
 * Creates a hex string from a given value.
 */
export function hexString<T extends string = HexString>(value: string): T {
  invariant(
    isValidHexString(value),
    `Expected a valid hex string, but got: ${value}`,
  );
  return value as T;
}

/**
 * An EVM address.
 */
export type EvmAddress = Tagged<HexString, 'EvmAddress'>;

/**
 * Creates an EVM address from a given value.
 */
export function evmAddress(value: string) {
  invariant(value.length === 42, `EvmAddress: invalid length ${value.length}`);
  return hexString<EvmAddress>(value);
}

/**
 * RLP-encoded blockchain data.
 */
export type BlockchainData = Tagged<HexString, 'BlockchainData'>;
export const blockchainData = hexString<BlockchainData>;

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
export const txHash = hexString<TxHash>;

/**
 * A fixed 32 bytes long hexadecimal string.
 *
 * Typically the result of a hash function like `keccak256`.
 */
export type FixedBytes32 = Tagged<HexString, 'FixedBytes32'>;
export function fixedBytes32(value: string) {
  invariant(
    value.length === 66,
    `FixedBytes32: invalid length ${value.length}`,
  );
  return hexString<FixedBytes32>(value);
}
