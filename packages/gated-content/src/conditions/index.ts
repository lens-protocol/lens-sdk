import * as raw from '@lens-protocol/metadata';
import { assertNever, InvariantError, never } from '@lens-protocol/shared-kernel';
import type { UnifiedAccessControlConditions } from '@lit-protocol/types';

import * as gql from '../graphql';
import { transformAdvancedContractCondition } from './advanced-contract-condition';
import { transformCollectCondition } from './collect-condition';
import { transformEoaCondition } from './eoa-condition';
import { transformErc20Condition } from './erc20-condition';
import { transformFollowCondition } from './follow-condition';
import { transformNftCondition } from './nft-condition';
import { transformProfileCondition } from './profile-condition';
import {
  AccessControlContract,
  DecryptionContext,
  LitAccessControlCondition,
  LitNestedAccessControlCondition,
  LitOperatorType,
} from './types';
import { insertObjectInBetweenArrayElements } from './utils';
import {
  assertAtLeastTwoCriteria,
  assertNoMoreThanFiveCriteria,
  InvalidAccessCriteriaError,
} from './validators';

export type { AccessControlContract, DecryptionContext };
export { SupportedChainId, SupportedChains } from './types';

/**
 * Bespoke implementation of flatten that only flattens one level of nesting
 */
function flatten<T>(conditions: T[]): T[] {
  // boolean transform supports one level of nesting
  return conditions.reduce((acc, val) => {
    if (Array.isArray(val) && val.length === 1) {
      return acc.concat(val);
    } else {
      // handle nested conditions
      acc.push(val);
      return acc;
    }
  }, [] as T[]);
}

function transformSimpleCondition(
  condition: raw.SimpleCondition,
  accessControlContract: AccessControlContract,
  context?: DecryptionContext,
): LitNestedAccessControlCondition<LitAccessControlCondition> {
  switch (condition.type) {
    case raw.ConditionType.EOA_OWNERSHIP:
      return transformEoaCondition(condition);
    case raw.ConditionType.ERC20_OWNERSHIP:
      return transformErc20Condition(condition);
    case raw.ConditionType.NFT_OWNERSHIP:
      return transformNftCondition(condition);
    case raw.ConditionType.PROFILE_OWNERSHIP:
      return transformProfileCondition(condition, accessControlContract);
    case raw.ConditionType.COLLECT:
      return transformCollectCondition(condition, accessControlContract, context);
    case raw.ConditionType.FOLLOW:
      return transformFollowCondition(condition, accessControlContract);
    case raw.ConditionType.ADVANCED_CONTRACT:
      return transformAdvancedContractCondition(condition);
    default:
      throw new InvariantError(
        `Unknown access criteria type: \n${JSON.stringify(condition, null, 2)}`,
      );
  }
}

function transformCompoundCondition(
  condition: raw.AnyCondition,
  accessControlContract: AccessControlContract,
  context?: DecryptionContext,
): LitNestedAccessControlCondition<LitAccessControlCondition> {
  if (condition.type === raw.ConditionType.AND || condition.type === raw.ConditionType.OR) {
    assertAtLeastTwoCriteria(condition.criteria);
    assertNoMoreThanFiveCriteria(condition.criteria);

    try {
      const flat = flatten(
        condition.criteria.map((criterion) =>
          transformSimpleCondition(criterion, accessControlContract, context),
        ),
      );
      return insertObjectInBetweenArrayElements(flat, {
        operator: LitOperatorType[condition.type],
      });
    } catch (err: unknown) {
      if (err instanceof InvariantError) {
        throw new InvalidAccessCriteriaError('Cannot nest conditions more than 2 levels deep.');
      }
      throw err;
    }
  }
  return transformSimpleCondition(condition, accessControlContract, context);
}

function createUnifiedAccessControlConditions(
  condition: raw.AccessCondition,
  accessControlContract: AccessControlContract,
  context?: DecryptionContext,
): UnifiedAccessControlConditions {
  if (condition.type !== raw.ConditionType.OR) {
    throw new InvalidAccessCriteriaError('Root condition must be an OR condition');
  }

  if (condition.criteria.length < 1) {
    throw new InvalidAccessCriteriaError('Root condition must have at least one criteria');
  }

  assertNoMoreThanFiveCriteria(condition.criteria);

  if (condition.criteria.length > 2) {
    throw new InvalidAccessCriteriaError('Root conditions can only have up to 2 criteria.');
  }

  if (!condition.criteria.some((c) => c.type === raw.ConditionType.PROFILE_OWNERSHIP)) {
    throw new InvalidAccessCriteriaError(
      `Root conditions must contain a ${raw.ConditionType.PROFILE_OWNERSHIP} condition`,
    );
  }

  const flat = flatten(
    condition.criteria.map((criterion) =>
      transformCompoundCondition(criterion, accessControlContract, context),
    ),
  );

  // the type assertion is needed because the Lit SDK typedef suggests nested conditions are not allowed but they are
  return insertObjectInBetweenArrayElements(flat, {
    operator: LitOperatorType.OR,
  }) as UnifiedAccessControlConditions;
}

export function transformFromRaw(
  condition: raw.AccessCondition,
  accessControlContract: AccessControlContract,
): UnifiedAccessControlConditions {
  return createUnifiedAccessControlConditions(condition, accessControlContract);
}

function toRawNetworkAddress({ address, chainId }: gql.NetworkAddress): raw.NetworkAddress {
  return {
    address: raw.toEvmAddress(address),
    chainId: raw.toChainId(chainId),
  };
}

function toRawSimpleCondition(gqlCondition: gql.ThirdTierCondition): raw.SimpleCondition {
  switch (gqlCondition.__typename) {
    case 'EoaOwnershipCondition':
      return raw.eoaOwnershipCondition({
        address: gqlCondition.address,
      });

    case 'ProfileOwnershipCondition':
      return raw.profileOwnershipCondition({
        profileId: gqlCondition.profileId,
      });

    case 'Erc20OwnershipCondition':
      return raw.erc20OwnershipCondition({
        condition:
          raw.ConditionComparisonOperator[gqlCondition.condition] ??
          never(`Not supported condition: ${gqlCondition.condition}`),
        contract: toRawNetworkAddress(gqlCondition.amount.asset.contract),
        decimals: gqlCondition.amount.asset.decimals,
        value: gqlCondition.amount.value,
      });

    case 'NftOwnershipCondition':
      switch (gqlCondition.contractType) {
        case gql.NftContractType.Erc721:
          return raw.erc721OwnershipCondition({
            contract: toRawNetworkAddress(gqlCondition.contract),
            tokenIds: gqlCondition.tokenIds?.map(raw.toTokenId) ?? undefined,
          });

        case gql.NftContractType.Erc1155:
          return raw.erc1155OwnershipCondition({
            contract: toRawNetworkAddress(gqlCondition.contract),
            tokenIds: gqlCondition.tokenIds?.map(raw.toTokenId),
          });

        default:
          assertNever(gqlCondition.contractType, 'Unknown NFT contract type');
      }

    // eslint-disable-next-line no-fallthrough
    case 'CollectCondition':
      return raw.collectCondition({
        publicationId: gqlCondition.publicationId,
        thisPublication: gqlCondition.thisPublication,
      });

    case 'FollowCondition':
      return raw.followCondition({
        follow: raw.toProfileId(gqlCondition.follow),
      });

    case 'AdvancedContractCondition':
      return raw.advancedContractCondition({
        contract: toRawNetworkAddress(gqlCondition.contract),
        abi: gqlCondition.abi,
        functionName: gqlCondition.functionName,
        params: gqlCondition.params.slice(),
        comparison:
          raw.ConditionComparisonOperator[gqlCondition.comparison] ??
          never(`Not supported condition: ${gqlCondition.comparison}`),
        value: gqlCondition.value,
      });

    default:
      assertNever(gqlCondition, 'Unknown access condition type');
  }
}

function toAnyRawCondition(gqlCondition: gql.SecondTierCondition): raw.AnyCondition {
  switch (gqlCondition.__typename) {
    case 'OrCondition':
      return raw.orCondition(gqlCondition.criteria.map(toRawSimpleCondition));
    case 'AndCondition':
      return raw.andCondition(gqlCondition.criteria.map(toRawSimpleCondition));
    default:
      return toRawSimpleCondition(gqlCondition);
  }
}

function toRawAccessCondition(gqlCondition: gql.RootCondition): raw.AccessCondition {
  assertAtLeastTwoCriteria(gqlCondition.criteria);

  return raw.accessCondition(gqlCondition.criteria.map((c) => toAnyRawCondition(c)));
}

export function transformFromGql(
  strategy: gql.PublicationMetadataLitEncryption,
  accessControlContract: AccessControlContract,
  context: DecryptionContext,
): UnifiedAccessControlConditions {
  const transformed = toRawAccessCondition(strategy.accessCondition);

  return createUnifiedAccessControlConditions(transformed, accessControlContract, context);
}
