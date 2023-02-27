import { isAddress } from '@ethersproject/address';
import { ContractType } from '@lens-protocol/api-bindings';
import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import { EthereumAddress, TwoAtLeastArray } from '@lens-protocol/shared-kernel';

import { AccessCondition, isSupportedChainId, SupportedChainId } from './types';

export class InvalidAccessCriteriaError extends Error {
  name = 'InvalidAccessCriteriaError' as const;
}

export function assertValidAddress(address: string): asserts address is EthereumAddress {
  if (isAddress(address)) return;

  throw new InvalidAccessCriteriaError(`Invalid address: ${address}`);
}

export function assertSupportedChainId(chainID: number): asserts chainID is SupportedChainId {
  if (isSupportedChainId(chainID)) return;

  throw new InvalidAccessCriteriaError(`Invalid chain ID: ${chainID}`);
}

export function assertSupportedNftContractType(
  contractType: string,
): asserts contractType is ContractType.Erc721 | ContractType.Erc1155 {
  if (contractType === ContractType.Erc721 || contractType === ContractType.Erc1155) return;

  throw new InvalidAccessCriteriaError(`Invalid contract type: ${contractType}`);
}

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
  const [profileId, pubId] = publicationId.split('-');

  if (isValidLensId(profileId) && isValidLensId(pubId)) return;

  throw new InvalidAccessCriteriaError(`Invalid publication id: ${publicationId}`);
}

export function assertValidCompoundCondition<T extends AccessCondition>(
  criteria: T[],
): asserts criteria is TwoAtLeastArray<T> {
  if (criteria.length < 2) {
    throw new InvalidAccessCriteriaError('Compound condition must have at least 2 criteria.');
  }
  if (criteria.length > 5) {
    throw new InvalidAccessCriteriaError('Compound conditions can only have up to 5 criteria.');
  }
}
