import type { Tagged } from 'type-fest';
import { identity } from './identity';

/**
 * A string that represents a hex value with a `0x` prefix.
 */
export type HexString = `0x${string}`;

/**
 * An EVM address.
 */
export type EvmAddress = Tagged<HexString, 'EvmAddress'>;
export const evmAddress = identity<EvmAddress>;

/**
 * RLP-encoded blockchain data.
 */
export type BlockchainData = Tagged<HexString, 'BlockchainData'>;

/**
 * A signature.
 */
export type Signature = Tagged<HexString, 'Signature'>;
export const signature = identity<Signature>;

/**
 * An RLP-encoded transaction.
 */
export type EncodedTransaction = Tagged<HexString, 'EncodedTransaction'>;

/**
 * A transaction hash.
 */
export type TxHash = Tagged<HexString, 'TxHash'>;
