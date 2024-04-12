import { ConditionComparisonOperator } from '@lens-protocol/metadata';
import { assertNever, never } from '@lens-protocol/shared-kernel';

import { LitOperator, SupportedChainId, SupportedChains, LitScalarOperator } from './types';
import { InvalidAccessCriteriaError } from './validators';

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
    case SupportedChainId.AMOY:
      return SupportedChains.AMOY;
    case SupportedChainId.LINEA_GOERLI:
      return SupportedChains.LINEA_GOERLI;
    default:
      assertNever(chainId, 'Unsupported chain id');
  }
};

export const resolveScalarOperatorSymbol = (
  operator: ConditionComparisonOperator,
): LitScalarOperator => {
  if (operator in LitScalarOperator) return LitScalarOperator[operator];

  throw new InvalidAccessCriteriaError(`Invalid operator: ${String(operator)}`);
};
