import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import {
  CollectModuleParams,
  CreatePostTypedDataDocument,
  CreatePostTypedDataMutation,
  CreatePostTypedDataMutationVariables,
  CreatePostViaDispatcherDocument,
  CreatePostViaDispatcherMutation,
  CreatePostViaDispatcherMutationVariables,
  omitTypename,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataV2Input,
  ReferenceModuleParams,
} from '@lens-protocol/api';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreatePostTypedDataMutation,
  mockRelayerResultFragment,
} from '@lens-protocol/api/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import {
  mockNonce,
  mockChargeCollectPolicy,
  mockCreatePostRequest,
  mockDateNftAttribute,
  mockFreeCollectPolicy,
  mockMedia,
  mockNftMetadata,
  mockNoCollectPolicy,
  mockNumberNftAttribute,
  mockStringNftAttribute,
} from '@lens-protocol/domain/mocks';
import {
  CollectPolicy,
  ContentFocus,
  CreatePostRequest,
  Media,
  ReferencePolicy,
} from '@lens-protocol/domain/use-cases/publications';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { PublicationCallGateway } from '../PublicationCallGateway';
import { mockITransactionFactory } from '../__helpers__/mocks';

function mockCreatePostTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreatePostTypedDataMutationVariables;
  data: CreatePostTypedDataMutation;
}): MockedResponse<CreatePostTypedDataMutation> {
  return {
    request: {
      query: CreatePostTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

function mockCreatePostViaDispatcherMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreatePostViaDispatcherMutationVariables;
  data: CreatePostViaDispatcherMutation;
}): MockedResponse<CreatePostViaDispatcherMutation> {
  return {
    request: {
      query: CreatePostViaDispatcherDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

function setupTestScenario({
  apolloClient,
  contentURI,
}: {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  contentURI: string;
}) {
  const transactionFactory = mockITransactionFactory();
  const uploadSpy = jest.fn().mockResolvedValue(contentURI);
  const gateway = new PublicationCallGateway(apolloClient, transactionFactory, uploadSpy);

  return { gateway, uploadSpy };
}

const mandatoryFallbackMetadata = (request: CreatePostRequest) => ({
  metadata_id: expect.any(String),
  version: '2.0.0',

  attributes: [],
  name: 'none', // although "name" is not needed when a publication is not collectable, out Publication Metadata V2 schema requires it ¯\_(ツ)_/¯

  locale: request.locale,
  mainContentFocus: PublicationMainFocus[request.contentFocus],
});

describe(`Given an instance of ${PublicationCallGateway.name}`, () => {
  describe.each<{
    description: string;
    createExerciseData: () => {
      requestVars: {
        content?: string;
        media?: Media[];
        contentFocus?: ContentFocus;
        locale?: string;
        reference?: ReferencePolicy;
        collect?: CollectPolicy;
      };
      expectedMetadata: Omit<
        PublicationMetadataV2Input,
        keyof ReturnType<typeof mandatoryFallbackMetadata>
      >;
      expectedMutationRequestDetails: {
        collectModule: CollectModuleParams;
        referenceModule?: ReferenceModuleParams;
      };
    };
  }>([
    {
      description:
        'locale, content focus, text, media content and basic metadata (name, description)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const media = [mockMedia()];
        const metadata = mockNftMetadata({
          description: faker.lorem.sentence(),
        });
        const locale = 'en';
        const contentFocus = ContentFocus.TEXT;

        return {
          requestVars: {
            content,
            media,
            contentFocus,
            locale,
            collect: mockFreeCollectPolicy({ metadata }),
          },
          expectedMetadata: {
            attributes: [],
            content: content,
            description: metadata.description,
            media: media.map((m) => ({ type: m.mimeType, item: m.url })),
            name: metadata.name,
            locale: locale,
            mainContentFocus: PublicationMainFocus[contentFocus],
          },
          expectedMutationRequestDetails: {
            collectModule: {
              freeCollectModule: {
                followerOnly: true,
              },
            },
          },
        };
      },
    },
    {
      description: 'all supported NFT attribute types',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const dateNftAttribute = mockDateNftAttribute();
        const numberNftAttribute = mockNumberNftAttribute();
        const stringNftAttribute = mockStringNftAttribute();
        const metadata = mockNftMetadata({
          attributes: [dateNftAttribute, numberNftAttribute, stringNftAttribute],
        });
        return {
          requestVars: {
            content,
            collect: mockFreeCollectPolicy({ metadata }),
          },
          expectedMetadata: {
            attributes: [
              {
                displayType: PublicationMetadataDisplayTypes[dateNftAttribute.displayType],
                traitType: dateNftAttribute.traitType,
                value: dateNftAttribute.value.toString(),
              },
              {
                displayType: PublicationMetadataDisplayTypes[numberNftAttribute.displayType],
                traitType: numberNftAttribute.traitType,
                value: numberNftAttribute.value.toString(),
              },
              {
                displayType: PublicationMetadataDisplayTypes[stringNftAttribute.displayType],
                traitType: stringNftAttribute.traitType,
                value: stringNftAttribute.value.toString(),
              },
            ],
            name: metadata.name,
            content,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              freeCollectModule: {
                followerOnly: true,
              },
            },
          },
        };
      },
    },
    {
      description: 'Follower Only Reference Module',
      createExerciseData: () => {
        const content = faker.lorem.sentence();

        return {
          requestVars: {
            content,
            collect: mockNoCollectPolicy(),
            reference: ReferencePolicy.FOLLOWERS_ONLY,
          },
          expectedMetadata: {
            content,
            name: 'none',
          },
          expectedMutationRequestDetails: {
            collectModule: {
              revertCollectModule: true,
            },
            referenceModule: {
              followerOnlyReferenceModule: true,
            },
          },
        };
      },
    },
    {
      description: 'Revert Collect Module',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        return {
          requestVars: {
            content,
            collect: mockNoCollectPolicy(),
            name: 'none',
          },
          expectedMetadata: { content },
          expectedMutationRequestDetails: {
            collectModule: {
              revertCollectModule: true,
            },
          },
        };
      },
    },
    {
      description: 'Free Collect Module (anybody)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const metadata = mockNftMetadata();
        return {
          requestVars: {
            content,
            collect: mockFreeCollectPolicy({
              followersOnly: false,
              metadata,
            }),
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              freeCollectModule: {
                followerOnly: false,
              },
            },
          },
        };
      },
    },
    {
      description: 'Free Collect Module (followers only)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const metadata = mockNftMetadata();
        return {
          requestVars: {
            content,
            collect: mockFreeCollectPolicy({
              followersOnly: true,
              metadata,
            }),
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              freeCollectModule: {
                followerOnly: true,
              },
            },
          },
        };
      },
    },
    {
      description: 'Fee Collect Module (anybody)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const collect = mockChargeCollectPolicy({ followersOnly: false });
        return {
          requestVars: {
            content,
            collect,
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: collect.metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              feeCollectModule: {
                amount: {
                  currency: collect.fee.asset.address,
                  value: collect.fee.toSignificantDigits(),
                },
                followerOnly: false,
                recipient: collect.recipient,
                referralFee: collect.mirrorReward,
              },
            },
          },
        };
      },
    },
    {
      description: 'Fee Collect Module (followers only)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const collect = mockChargeCollectPolicy({ followersOnly: true });
        return {
          requestVars: {
            content,
            collect,
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: collect.metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              feeCollectModule: {
                amount: {
                  currency: collect.fee.asset.address,
                  value: collect.fee.toSignificantDigits(),
                },
                followerOnly: true,
                recipient: collect.recipient,
                referralFee: collect.mirrorReward,
              },
            },
          },
        };
      },
    },
    {
      description: 'Limited Fee Collect Module (anybody)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const collectLimit = faker.datatype.number(10_000);
        const collect = mockChargeCollectPolicy({ followersOnly: false, collectLimit });
        return {
          requestVars: {
            content,
            collect,
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: collect.metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              limitedFeeCollectModule: {
                amount: {
                  currency: collect.fee.asset.address,
                  value: collect.fee.toSignificantDigits(),
                },
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                collectLimit: collect.collectLimit!.toString(),
                followerOnly: false,
                recipient: collect.recipient,
                referralFee: collect.mirrorReward,
              },
            },
          },
        };
      },
    },
    {
      description: 'Limited Fee Collect Module (followers only)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const collectLimit = faker.datatype.number(10_000);
        const collect = mockChargeCollectPolicy({ followersOnly: true, collectLimit });
        return {
          requestVars: {
            content,
            collect,
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: collect.metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              limitedFeeCollectModule: {
                amount: {
                  currency: collect.fee.asset.address,
                  value: collect.fee.toSignificantDigits(),
                },
                collectLimit: collectLimit.toString(),
                followerOnly: true,
                recipient: collect.recipient,
                referralFee: collect.mirrorReward,
              },
            },
          },
        };
      },
    },
    {
      description: 'Timed Fee Collect Module (anybody)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const collect = mockChargeCollectPolicy({ followersOnly: false, timeLimited: true });
        return {
          requestVars: {
            content,
            collect,
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: collect.metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              timedFeeCollectModule: {
                amount: {
                  currency: collect.fee.asset.address,
                  value: collect.fee.toSignificantDigits(),
                },
                followerOnly: false,
                recipient: collect.recipient,
                referralFee: collect.mirrorReward,
              },
            },
          },
        };
      },
    },
    {
      description: 'Timed Fee Collect Module (followers only)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const collect = mockChargeCollectPolicy({ followersOnly: true, timeLimited: true });
        return {
          requestVars: {
            content,
            collect,
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: collect.metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              timedFeeCollectModule: {
                amount: {
                  currency: collect.fee.asset.address,
                  value: collect.fee.toSignificantDigits(),
                },
                followerOnly: true,
                recipient: collect.recipient,
                referralFee: collect.mirrorReward,
              },
            },
          },
        };
      },
    },
    {
      description: 'Limited Timed Fee Collect Module (anybody)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const collectLimit = faker.datatype.number(10_000);
        const collect = mockChargeCollectPolicy({
          followersOnly: false,
          collectLimit,
          timeLimited: true,
        });
        return {
          requestVars: {
            content,
            collect,
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: collect.metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              limitedTimedFeeCollectModule: {
                amount: {
                  currency: collect.fee.asset.address,
                  value: collect.fee.toSignificantDigits(),
                },
                collectLimit: collectLimit.toString(),
                followerOnly: false,
                recipient: collect.recipient,
                referralFee: collect.mirrorReward,
              },
            },
          },
        };
      },
    },
    {
      description: 'Limited Timed Fee Collect Module (followers only)',
      createExerciseData: () => {
        const content = faker.lorem.sentence();
        const collectLimit = faker.datatype.number(10_000);
        const collect = mockChargeCollectPolicy({
          followersOnly: true,
          collectLimit,
          timeLimited: true,
        });
        return {
          requestVars: {
            content,
            collect,
          },
          expectedMetadata: {
            attributes: [],
            content,
            name: collect.metadata.name,
          },
          expectedMutationRequestDetails: {
            collectModule: {
              limitedTimedFeeCollectModule: {
                amount: {
                  currency: collect.fee.asset.address,
                  value: collect.fee.toSignificantDigits(),
                },
                collectLimit: collectLimit.toString(),
                followerOnly: true,
                recipient: collect.recipient,
                referralFee: collect.mirrorReward,
              },
            },
          },
        };
      },
    },
  ])(`and $description`, ({ createExerciseData }) => {
    describe(`when creating a post`, () => {
      const { requestVars, expectedMutationRequestDetails, expectedMetadata } =
        createExerciseData();
      const request = mockCreatePostRequest(requestVars);
      const contentURI = faker.internet.url();

      describe(`via the "${PublicationCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
        it(`should:
            - upload the expected publication metadata
            - create an instance of the ${UnsignedLensProtocolCall.name} with the expected typed data`, async () => {
          const createPostTypedDataMutation = mockCreatePostTypedDataMutation();
          const apolloClient = createMockApolloClientWithMultipleResponses([
            mockCreatePostTypedDataMutationMockedResponse({
              variables: {
                request: {
                  profileId: request.profileId,
                  contentURI,
                  ...expectedMutationRequestDetails,
                },
              },
              data: createPostTypedDataMutation,
            }),
          ]);
          const { gateway, uploadSpy } = setupTestScenario({ apolloClient, contentURI });

          const unsignedCall = await gateway.createUnsignedProtocolCall(request);

          expect(uploadSpy).toHaveBeenCalledWith({
            ...mandatoryFallbackMetadata(request),
            ...expectedMetadata,
          });
          expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
          expect(unsignedCall.typedData).toEqual(
            omitTypename(createPostTypedDataMutation.result.typedData),
          );
        });

        it(`should be possible to override the signature nonce`, async () => {
          const nonce = mockNonce();
          const apolloClient = createMockApolloClientWithMultipleResponses([
            mockCreatePostTypedDataMutationMockedResponse({
              variables: {
                request: {
                  profileId: request.profileId,
                  contentURI,
                  ...expectedMutationRequestDetails,
                },
                options: {
                  overrideSigNonce: nonce,
                },
              },
              data: mockCreatePostTypedDataMutation({ nonce }),
            }),
          ]);
          const { gateway } = setupTestScenario({ apolloClient, contentURI });

          const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

          expect(unsignedCall.nonce).toEqual(nonce);
        });
      });

      describe(`via the "${PublicationCallGateway.prototype.createDelegatedTransaction.name}" method`, () => {
        it(`should create an instance of the ${NativeTransaction.name}`, async () => {
          const apolloClient = createMockApolloClientWithMultipleResponses([
            mockCreatePostViaDispatcherMutationMockedResponse({
              variables: {
                request: {
                  profileId: request.profileId,
                  contentURI,
                  ...expectedMutationRequestDetails,
                },
              },
              data: {
                result: mockRelayerResultFragment(),
              },
            }),
          ]);
          const { gateway } = setupTestScenario({ apolloClient, contentURI });

          const transaction = await gateway.createDelegatedTransaction(request);

          await transaction.waitNextEvent();
          expect(transaction).toBeInstanceOf(NativeTransaction);
          expect(transaction).toEqual(
            expect.objectContaining({
              chainType: ChainType.POLYGON,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              id: expect.any(String),
              request,
            }),
          );
        });
      });
    });
  });
});
