import {
  AccessCondition,
  AnyConditionFragment,
  ContractType,
  DeepOmitTypename,
  LeafConditionFragment,
  ScalarOperator,
} from '@lens-protocol/api-bindings';
import {
  AnyCriterion,
  DecryptionCriteria,
  DecryptionCriteriaType,
  Erc20ComparisonOperator,
  NftContractType,
  OrCriterion,
  ProfileOwnershipCriterion,
  SimpleCriterion,
} from '@lens-protocol/domain/entities';
import { assertNever } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry } from '../../chains';

export type FullyQualifiedDecryptionCriteria = OrCriterion<
  [ProfileOwnershipCriterion, DecryptionCriteria]
>;

function toContractType(contractType: NftContractType): ContractType {
  switch (contractType) {
    case NftContractType.Erc721:
      return ContractType.Erc721;
    case NftContractType.Erc1155:
      return ContractType.Erc1155;
  }
}

function toScalarOperator(operator: Erc20ComparisonOperator): ScalarOperator {
  switch (operator) {
    case Erc20ComparisonOperator.GreaterThan:
      return ScalarOperator.GreaterThan;
    case Erc20ComparisonOperator.GreaterThanOrEqual:
      return ScalarOperator.GreaterThanOrEqual;
    case Erc20ComparisonOperator.LessThan:
      return ScalarOperator.LessThan;
    case Erc20ComparisonOperator.LessThanOrEqual:
      return ScalarOperator.LessThanOrEqual;
    case Erc20ComparisonOperator.Equal:
      return ScalarOperator.Equal;
    case Erc20ComparisonOperator.NotEqual:
      return ScalarOperator.NotEqual;
  }
  // fail fast if type checking is bypassed (JS integration or brute-forced TS assertion)
  assertNever(operator, 'Unknown Erc20ComparisonOperator');
}

function transformSimpleCriterion(
  criterion: SimpleCriterion,
  chains: ChainConfigRegistry,
): DeepOmitTypename<AnyConditionFragment> {
  switch (criterion.type) {
    case DecryptionCriteriaType.NFT_OWNERSHIP:
      return {
        nft: {
          chainID: criterion.chainId,
          contractAddress: criterion.contractAddress,
          contractType: toContractType(criterion.contractType),
          tokenIds: criterion.tokenIds ?? null,
        },
        and: null,
        collect: null,
        eoa: null,
        follow: null,
        or: null,
        profile: null,
        token: null,
      };
    case DecryptionCriteriaType.ERC20_OWNERSHIP:
      return {
        token: {
          amount: criterion.amount
            .toBigDecimal()
            .mul(10 ** criterion.amount.asset.decimals)
            .toFixed(),
          chainID: chains[criterion.amount.asset.chainType].chainId,
          contractAddress: criterion.amount.asset.address,
          decimals: criterion.amount.asset.decimals,
          condition: toScalarOperator(criterion.condition),
        },
        and: null,
        collect: null,
        eoa: null,
        follow: null,
        nft: null,
        or: null,
        profile: null,
      };
    case DecryptionCriteriaType.ADDRESS_OWNERSHIP:
      return {
        eoa: {
          address: criterion.address,
        },
        and: null,
        collect: null,
        follow: null,
        nft: null,
        or: null,
        profile: null,
        token: null,
      };
    case DecryptionCriteriaType.PROFILE_OWNERSHIP:
      return {
        profile: {
          profileId: criterion.profileId,
        },
        and: null,
        collect: null,
        eoa: null,
        follow: null,
        nft: null,
        or: null,
        token: null,
      };
    case DecryptionCriteriaType.FOLLOW_PROFILE:
      return {
        follow: {
          profileId: criterion.profileId,
        },
        and: null,
        collect: null,
        eoa: null,
        nft: null,
        or: null,
        profile: null,
        token: null,
      };

    case DecryptionCriteriaType.COLLECT_PUBLICATION:
    case DecryptionCriteriaType.COLLECT_THIS_PUBLICATION:
      return {
        collect: {
          publicationId: criterion.publicationId,
          thisPublication: criterion.type === DecryptionCriteriaType.COLLECT_THIS_PUBLICATION,
        },
        and: null,
        eoa: null,
        follow: null,
        nft: null,
        or: null,
        profile: null,
        token: null,
      };
  }
  // fail fast if type checking is bypassed (JS integration or brute-forced TS assertion)
  assertNever(criterion, 'Unknown DecryptionCriteriaType');
}

function or(
  criteria: DeepOmitTypename<LeafConditionFragment>[],
): DeepOmitTypename<AnyConditionFragment> {
  return {
    or: {
      criteria,
    },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    profile: null,
    token: null,
  };
}

function and(
  criteria: DeepOmitTypename<LeafConditionFragment>[],
): DeepOmitTypename<AnyConditionFragment> {
  return {
    and: {
      criteria,
    },
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    profile: null,
    token: null,
  };
}

function transformAnyCriterion(
  criterion: AnyCriterion<SimpleCriterion>,
  chains: ChainConfigRegistry,
): DeepOmitTypename<AnyConditionFragment> {
  switch (criterion.type) {
    case DecryptionCriteriaType.AND:
      return and(criterion.and.map((c) => transformSimpleCriterion(c, chains)));

    case DecryptionCriteriaType.OR:
      return or(criterion.or.map((c) => transformSimpleCriterion(c, chains)));
  }
  return transformSimpleCriterion(criterion, chains);
}

export function createAccessCondition(
  decryptionCriteria: FullyQualifiedDecryptionCriteria,
  chains: ChainConfigRegistry,
): AccessCondition {
  return {
    or: {
      criteria: decryptionCriteria.or.map((c) => transformAnyCriterion(c, chains)),
    },
  };
}
