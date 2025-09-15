import type { KeyValuePair } from '@lens-protocol/graphql';
import type { BlockchainData } from '@lens-protocol/types';
import { blockchainData } from '@lens-protocol/types';
import { encodeAbiParameters, parseAbiParameters } from 'viem';
import { UnexpectedError } from '../errors';

/**
 * Encoded parameter for blockchain transactions
 */
export type EncodedParam = {
  key: BlockchainData;
  data: BlockchainData;
};

/**
 * Helper to encode values based on their expected Solidity type using viem
 */
export function encodeValueByType(
  value: unknown,
  type: string,
): BlockchainData {
  return blockchainData(encodeAbiParameters(parseAbiParameters(type), [value]));
}

/**
 * Helper function to encode post action parameters from key-value pairs using viem
 */
export function encodeKeyValuePairs(
  params: Record<string, unknown>,
  pairs: KeyValuePair[],
): EncodedParam[] {
  return Object.entries(params)
    .map(([name, value]) => {
      const pair = pairs.find((p) => p.name === name);
      if (!pair || value === null || value === undefined) return null;

      try {
        return {
          key: blockchainData(pair.key),
          data: encodeValueByType(value, pair.type),
        };
      } catch (error) {
        throw UnexpectedError.from(error);
      }
    })
    .filter((param): param is EncodedParam => param !== null);
}
