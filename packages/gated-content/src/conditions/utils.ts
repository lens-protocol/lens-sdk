import { assertNever, never } from '@lens-protocol/shared-kernel';

import { LitOperator, SupportedChainId, SupportedChains } from './types';

export const insertObjectInBetweenArrayElements = <T>(
  array: Array<T>,
  objectToInsert: LitOperator,
): Array<T | LitOperator> => {
  const results: Array<T | LitOperator> = [];
  for (let i = 0; i < array.length; i++) {
    results.push(array[i] ?? never());
    if (i !== array.length - 1) {
      results.push(objectToInsert);
    }
  }
  return results;
};

export const toLitSupportedChainName = (chainId: SupportedChainId): SupportedChains => {
  switch (chainId) {
    case SupportedChainId.ETHEREUM:
      return SupportedChains.ETHEREUM;
    case SupportedChainId.POLYGON:
      return SupportedChains.POLYGON;
    case SupportedChainId.MUMBAI:
      return SupportedChains.MUMBAI;
    default:
      assertNever(chainId, 'Unsupported chain id');
  }
};
