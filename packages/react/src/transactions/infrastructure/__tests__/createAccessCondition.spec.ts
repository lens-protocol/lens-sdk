import { ContractType, ScalarOperator } from '@lens-protocol/api-bindings';
import { Erc20ComparisonOperator, NftContractType } from '@lens-protocol/domain/entities';
import {
  mockAddressOwnershipCriterion,
  mockAndCriterion,
  mockCollectPublicationCriterion,
  mockCollectThisPublicationCriterion,
  mockErc20OwnershipCriterion,
  mockFollowProfileCriterion,
  mockNftOwnershipCriterion,
  mockOrCriterion,
  mockProfileOwnershipCriterion,
} from '@lens-protocol/domain/mocks';

import { staging } from '../../../environments';
import { createAccessCondition, FullyQualifiedDecryptionCriteria } from '../createAccessCondition';

const addressOwnershipCriterion = mockAddressOwnershipCriterion();
const collectPublicationCriterion = mockCollectPublicationCriterion();
const collectThisPublicationCriterion = mockCollectThisPublicationCriterion();
const erc20OwnershipCriterion = mockErc20OwnershipCriterion({
  condition: Erc20ComparisonOperator.Equal,
});
const followProfileCriterion = mockFollowProfileCriterion();
const nftOwnershipCriterion = mockNftOwnershipCriterion({
  contractType: NftContractType.Erc1155,
});

describe(`Given the "${createAccessCondition.name}" helper`, () => {
  describe(`when called with a fully qualified decryption criteria`, () => {
    it(`should return the expected access condition using nested OR`, () => {
      const criteria = mockOrCriterion([
        mockProfileOwnershipCriterion(),
        mockOrCriterion([
          addressOwnershipCriterion,
          // omit one to pass 5 criteria hard limit, testes in the next test anyway
          // collectPublicationCriterion,
          collectThisPublicationCriterion,
          erc20OwnershipCriterion,
          followProfileCriterion,
          nftOwnershipCriterion,
        ]),
      ]) as FullyQualifiedDecryptionCriteria;

      const actual = createAccessCondition(criteria, staging.chains);

      expect(actual).toMatchObject({
        or: {
          criteria: [
            {
              profile: {
                profileId: criteria.or[0].profileId,
              },
            },
            {
              or: {
                criteria: [
                  {
                    eoa: {
                      address: addressOwnershipCriterion.address,
                    },
                  },
                  {
                    collect: {
                      publicationId: collectThisPublicationCriterion.publicationId,
                      thisPublication: true,
                    },
                  },
                  {
                    token: {
                      amount: erc20OwnershipCriterion.amount
                        .toBigDecimal()
                        .mul(10 ** erc20OwnershipCriterion.amount.asset.decimals)
                        .toFixed(),
                      chainID:
                        staging.chains[erc20OwnershipCriterion.amount.asset.chainType].chainId,
                      contractAddress: erc20OwnershipCriterion.amount.asset.address,
                      decimals: erc20OwnershipCriterion.amount.asset.decimals,
                      condition: ScalarOperator.Equal,
                    },
                  },
                  {
                    follow: {
                      profileId: followProfileCriterion.profileId,
                    },
                  },
                  {
                    nft: {
                      chainID: nftOwnershipCriterion.chainId,
                      contractAddress: nftOwnershipCriterion.contractAddress,
                      contractType: ContractType.Erc1155,
                      tokenIds: nftOwnershipCriterion.tokenIds ?? null,
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    });

    it(`should return the expected access condition using nested AND`, () => {
      const criteria = mockOrCriterion([
        mockProfileOwnershipCriterion(),
        mockAndCriterion([
          addressOwnershipCriterion,
          collectPublicationCriterion,
          // omit one to pass 5 criteria hard limit, testes in the previous test anyway
          // collectThisPublicationCriterion,
          erc20OwnershipCriterion,
          followProfileCriterion,
          nftOwnershipCriterion,
        ]),
      ]) as FullyQualifiedDecryptionCriteria;

      const actual = createAccessCondition(criteria, staging.chains);

      expect(actual).toMatchObject({
        or: {
          criteria: [
            {
              profile: {
                profileId: criteria.or[0].profileId,
              },
            },
            {
              and: {
                criteria: [
                  {
                    eoa: {
                      address: addressOwnershipCriterion.address,
                    },
                  },
                  {
                    collect: {
                      publicationId: collectPublicationCriterion.publicationId,
                      thisPublication: false,
                    },
                  },
                  {
                    token: {
                      amount: erc20OwnershipCriterion.amount
                        .toBigDecimal()
                        .mul(10 ** erc20OwnershipCriterion.amount.asset.decimals)
                        .toFixed(),
                      chainID:
                        staging.chains[erc20OwnershipCriterion.amount.asset.chainType].chainId,
                      contractAddress: erc20OwnershipCriterion.amount.asset.address,
                      decimals: erc20OwnershipCriterion.amount.asset.decimals,
                      condition: ScalarOperator.Equal,
                    },
                  },
                  {
                    follow: {
                      profileId: followProfileCriterion.profileId,
                    },
                  },
                  {
                    nft: {
                      chainID: nftOwnershipCriterion.chainId,
                      contractAddress: nftOwnershipCriterion.contractAddress,
                      contractType: ContractType.Erc1155,
                      tokenIds: nftOwnershipCriterion.tokenIds ?? null,
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    });
  });
});
