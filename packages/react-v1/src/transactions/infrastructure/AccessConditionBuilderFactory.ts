import {
  AccessCondition,
  AndCondition,
  AnyCondition,
  ContractType,
  LeafCondition,
  OrCondition,
  ScalarOperator,
} from '@lens-protocol/api-bindings';
import {
  AnyCriterion,
  DecryptionCriteria,
  DecryptionCriteriaType,
  Erc20ComparisonOperator,
  NftContractType,
  ProfileId,
  PublicationId,
  SimpleCriterion,
} from '@lens-protocol/domain/entities';
import { assertNever, invariant } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry } from '../../chains';

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

async function or(criteria: Promise<LeafCondition>[]): Promise<OrCondition<LeafCondition>> {
  invariant(
    criteria.length > 1,
    `"${DecryptionCriteriaType.OR}" criteria must have at least 2 elements`,
  );
  invariant(
    criteria.length <= 5,
    `"${DecryptionCriteriaType.OR}" criteria must have at most 5 elements`,
  );
  return {
    or: {
      criteria: await Promise.all(criteria),
    },
  };
}

async function and(criteria: Promise<LeafCondition>[]): Promise<AndCondition<LeafCondition>> {
  invariant(
    criteria.length > 1,
    `"${DecryptionCriteriaType.AND}" criteria must have at least 2 elements`,
  );
  invariant(
    criteria.length <= 5,
    `"${DecryptionCriteriaType.AND}" criteria must have at most 5 elements`,
  );
  return {
    and: {
      criteria: await Promise.all(criteria),
    },
  };
}

class AccessConditionBuilder {
  constructor(
    private readonly ownerId: ProfileId,
    private readonly chains: ChainConfigRegistry,
    private readonly publicationIdPredictor: IPublicationIdPredictor,
  ) {}

  withDecryptionCriteria(decryptionCriteria: DecryptionCriteria) {
    return {
      build: async (): Promise<AccessCondition> => {
        return {
          or: {
            criteria: [
              await this.transformSimpleCriterion({
                type: DecryptionCriteriaType.PROFILE_OWNERSHIP,
                profileId: this.ownerId,
              }),
              await this.transformAnyCriterion(decryptionCriteria),
            ],
          },
        };
      },
    };
  }

  private async transformAnyCriterion(
    criterion: AnyCriterion<SimpleCriterion>,
  ): Promise<AnyCondition> {
    switch (criterion.type) {
      case DecryptionCriteriaType.AND:
        return and(criterion.and.map((c) => this.transformSimpleCriterion(c)));

      case DecryptionCriteriaType.OR:
        return or(criterion.or.map((c) => this.transformSimpleCriterion(c)));
    }
    return this.transformSimpleCriterion(criterion);
  }

  private async transformSimpleCriterion(criterion: SimpleCriterion): Promise<LeafCondition> {
    switch (criterion.type) {
      case DecryptionCriteriaType.NFT_OWNERSHIP:
        return {
          nft: {
            chainID: criterion.chainId,
            contractAddress: criterion.contractAddress,
            contractType: toContractType(criterion.contractType),
            tokenIds: criterion.tokenIds ?? null,
          },
        };
      case DecryptionCriteriaType.ERC20_OWNERSHIP:
        return {
          token: {
            amount: criterion.amount
              .toBigDecimal()
              .mul(10 ** criterion.amount.asset.decimals)
              .toFixed(),
            chainID: this.chains[criterion.amount.asset.chainType].chainId,
            contractAddress: criterion.amount.asset.address,
            decimals: criterion.amount.asset.decimals,
            condition: toScalarOperator(criterion.condition),
          },
        };
      case DecryptionCriteriaType.ADDRESS_OWNERSHIP:
        return {
          eoa: {
            address: criterion.address,
          },
        };
      case DecryptionCriteriaType.PROFILE_OWNERSHIP:
        return {
          profile: {
            profileId: criterion.profileId,
          },
        };
      case DecryptionCriteriaType.FOLLOW_PROFILE:
        return {
          follow: {
            profileId: criterion.profileId,
          },
        };

      case DecryptionCriteriaType.COLLECT_PUBLICATION:
        return {
          collect: {
            publicationId: criterion.publicationId,
            thisPublication: false,
          },
        };

      case DecryptionCriteriaType.COLLECT_THIS_PUBLICATION:
        return {
          collect: {
            publicationId: await this.publicationIdPredictor.predictNextPublicationIdFor(
              this.ownerId,
            ),
            thisPublication: true,
          },
        };
    }
    // fail fast if type checking is bypassed (JS integration or brute-forced TS assertion)
    assertNever(criterion, 'Unknown DecryptionCriteriaType');
  }
}

export interface IPublicationIdPredictor {
  predictNextPublicationIdFor(profileId: ProfileId): Promise<PublicationId>;
}

export class AccessConditionBuilderFactory {
  constructor(
    private readonly chains: ChainConfigRegistry,
    private readonly publicationIdPredictor: IPublicationIdPredictor,
  ) {}

  createForPublicationBy(ownerId: ProfileId) {
    return new AccessConditionBuilder(ownerId, this.chains, this.publicationIdPredictor);
  }
}
