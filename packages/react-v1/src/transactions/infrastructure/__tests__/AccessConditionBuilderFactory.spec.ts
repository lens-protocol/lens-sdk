import { ContractType, ScalarOperator } from '@lens-protocol/api-bindings';
import {
  DecryptionCriteriaType,
  Erc20ComparisonOperator,
  NftContractType,
  PublicationId,
} from '@lens-protocol/domain/entities';
import {
  mockAddressOwnershipCriterion,
  mockAndCriterion,
  mockCollectPublicationCriterion,
  mockCollectThisPublicationCriterion,
  mockErc20OwnershipCriterion,
  mockFollowProfileCriterion,
  mockNftOwnershipCriterion,
  mockOrCriterion,
  mockProfileId,
  mockPublicationId,
} from '@lens-protocol/domain/mocks';
import { InvariantError } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { staging } from '../../../environments';
import {
  AccessConditionBuilderFactory,
  IPublicationIdPredictor,
} from '../AccessConditionBuilderFactory';

const ownerId = mockProfileId();
const addressOwnershipCriterion = mockAddressOwnershipCriterion();
const collectPublicationCriterion = mockCollectPublicationCriterion();
const erc20OwnershipCriterion = mockErc20OwnershipCriterion({
  condition: Erc20ComparisonOperator.Equal,
});
const followProfileCriterion = mockFollowProfileCriterion();
const nftOwnershipCriterion = mockNftOwnershipCriterion({
  contractType: NftContractType.Erc1155,
});

function setupTestScenario({
  predictedPublicationId = mockPublicationId(),
}: { predictedPublicationId?: PublicationId } = {}) {
  const publicationIdPredictor = mock<IPublicationIdPredictor>();
  const factory = new AccessConditionBuilderFactory(staging.chains, publicationIdPredictor);

  when(publicationIdPredictor.predictNextPublicationIdFor)
    .calledWith(ownerId)
    .mockResolvedValue(predictedPublicationId);

  return { factory };
}

describe(`Given an instance of the ${AccessConditionBuilderFactory.name}`, () => {
  describe(`when using it to build new AccessCondition`, () => {
    it.each([
      {
        criterion: addressOwnershipCriterion,
        expected: {
          eoa: {
            address: addressOwnershipCriterion.address,
          },
        },
      },
      {
        criterion: collectPublicationCriterion,
        expected: {
          collect: {
            publicationId: collectPublicationCriterion.publicationId,
            thisPublication: false,
          },
        },
      },
      {
        criterion: erc20OwnershipCriterion,
        expected: {
          token: {
            amount: erc20OwnershipCriterion.amount
              .toBigDecimal()
              .mul(10 ** erc20OwnershipCriterion.amount.asset.decimals)
              .toFixed(),
            chainID: staging.chains[erc20OwnershipCriterion.amount.asset.chainType].chainId,
            contractAddress: erc20OwnershipCriterion.amount.asset.address,
            decimals: erc20OwnershipCriterion.amount.asset.decimals,
            condition: ScalarOperator.Equal,
          },
        },
      },
      {
        criterion: followProfileCriterion,
        expected: {
          follow: {
            profileId: followProfileCriterion.profileId,
          },
        },
      },
      {
        criterion: nftOwnershipCriterion,
        expected: {
          nft: {
            chainID: nftOwnershipCriterion.chainId,
            contractAddress: nftOwnershipCriterion.contractAddress,
            contractType: ContractType.Erc1155,
            tokenIds: nftOwnershipCriterion.tokenIds ?? null,
          },
        },
      },
    ])('should support "$criterion.type" criterion', async ({ criterion, expected }) => {
      const { factory } = setupTestScenario();

      const actual = await factory
        .createForPublicationBy(ownerId)
        .withDecryptionCriteria(criterion)
        .build();

      expect(actual).toMatchObject({
        or: {
          criteria: [
            {
              profile: {
                profileId: ownerId,
              },
            },
            expected,
          ],
        },
      });
    });

    it(`should support "${DecryptionCriteriaType.COLLECT_THIS_PUBLICATION}" criterion`, async () => {
      const predictedPublicationId = mockPublicationId();
      const { factory } = setupTestScenario({ predictedPublicationId });

      const criterion = mockCollectThisPublicationCriterion();
      const actual = await factory
        .createForPublicationBy(ownerId)
        .withDecryptionCriteria(criterion)
        .build();

      expect(actual).toMatchObject({
        or: {
          criteria: [
            {
              profile: {
                profileId: ownerId,
              },
            },
            {
              collect: {
                publicationId: predictedPublicationId,
                thisPublication: true,
              },
            },
          ],
        },
      });
    });

    it.each([
      {
        criterion: mockOrCriterion([addressOwnershipCriterion, followProfileCriterion]),
        expected: {
          or: {
            criteria: [
              {
                profile: {
                  profileId: ownerId,
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
                      follow: {
                        profileId: followProfileCriterion.profileId,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
      {
        criterion: mockAndCriterion([addressOwnershipCriterion, followProfileCriterion]),
        expected: {
          or: {
            criteria: [
              {
                profile: {
                  profileId: ownerId,
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
                      follow: {
                        profileId: followProfileCriterion.profileId,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    ])(
      `should support nested conditions using an "$criterion.type" operator`,
      async ({ criterion, expected }) => {
        const { factory } = setupTestScenario();

        const actual = await factory
          .createForPublicationBy(ownerId)
          .withDecryptionCriteria(criterion)
          .build();

        expect(actual).toMatchObject(expected);
      },
    );

    it.each([
      mockOrCriterion([addressOwnershipCriterion]),
      mockAndCriterion([addressOwnershipCriterion]),
    ])(
      `should throw an ${InvariantError.name} if less than 2 criteria are provided in a nested "$type" condition`,
      async (criterion) => {
        const { factory } = setupTestScenario();

        const builder = factory.createForPublicationBy(ownerId);

        await expect(() => builder.withDecryptionCriteria(criterion).build()).rejects.toThrowError(
          InvariantError,
        );
      },
    );

    it.each([
      mockOrCriterion([
        addressOwnershipCriterion,
        followProfileCriterion,
        followProfileCriterion,
        followProfileCriterion,
        followProfileCriterion,
        followProfileCriterion,
      ]),
      mockAndCriterion([
        addressOwnershipCriterion,
        followProfileCriterion,
        followProfileCriterion,
        followProfileCriterion,
        followProfileCriterion,
        followProfileCriterion,
      ]),
    ])(
      `should throw an ${InvariantError.name} if more than 5 criteria are provided in a nested "$type" condition`,
      async (criterion) => {
        const { factory } = setupTestScenario();

        const builder = factory.createForPublicationBy(ownerId);

        await expect(() => builder.withDecryptionCriteria(criterion).build()).rejects.toThrowError(
          InvariantError,
        );
      },
    );
  });
});
