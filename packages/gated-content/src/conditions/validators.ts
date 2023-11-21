import { isAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { ProfileId, PublicationId } from '@lens-protocol/metadata';
import { EvmAddress, IEquatableError, TwoAtLeastArray } from '@lens-protocol/shared-kernel';

import { isSupportedChainId, SupportedChainId } from './types';

export class InvalidAccessCriteriaError extends Error implements IEquatableError {
  name = 'InvalidAccessCriteriaError' as const;
}

export function assertValidAddress(address: string): asserts address is EvmAddress {
  if (isAddress(address)) return;

  throw new InvalidAccessCriteriaError(`Invalid address: ${address}`);
}

export function assertSupportedChainId(chainID: number): asserts chainID is SupportedChainId {
  if (isSupportedChainId(chainID)) return;

  throw new InvalidAccessCriteriaError(`Invalid chain ID: ${chainID}`);
}

export const assertValidTokenIds = (tokenIds?: string[] | null) => {
  if (!tokenIds) {
    return;
  }

  try {
    tokenIds.every((tokenId) => BigNumber.from(tokenId));
  } catch (e: unknown) {
    throw new InvalidAccessCriteriaError(`Invalid token ids`);
  }
};

function isValidLensId(id: string): boolean {
  const regex = /^0x(?:[a-fA-F0-9]{2})+$/;
  return regex.test(id);
}

export function assertValidProfileId(profileId: string): asserts profileId is ProfileId {
  if (isValidLensId(profileId)) return;
  throw new InvalidAccessCriteriaError(`Invalid profile id: ${profileId}`);
}

export function assertValidPublicationId(
  publicationId: string,
): asserts publicationId is PublicationId {
  const [profileId, pubId] = publicationId.split('-') as [ProfileId, PublicationId];

  if (isValidLensId(profileId) && isValidLensId(pubId)) return;

  throw new InvalidAccessCriteriaError(`Invalid publication id: ${publicationId}`);
}

export function assertAtLeastTwoCriteria<T>(
  criteria: readonly T[],
): asserts criteria is TwoAtLeastArray<T> {
  if (criteria.length < 2) {
    throw new InvalidAccessCriteriaError('Compound condition must have at least 2 criteria.');
  }
}

export function assertNoMoreThanFiveCriteria<T>(criteria: T[]) {
  if (criteria.length > 5) {
    throw new InvalidAccessCriteriaError('Compound conditions can only have up to 5 criteria.');
  }
}
