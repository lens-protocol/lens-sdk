import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import {
  CreatePostTypedDataDocument,
  CreatePostTypedDataMutation,
  CreatePostTypedDataMutationVariables,
  CreatePostViaDispatcherDocument,
  CreatePostViaDispatcherMutation,
  CreatePostViaDispatcherMutationVariables,
  omitTypename,
  PublicationMainFocus,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreatePostTypedDataMutation,
  mockRelayerResultFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { PostCallGateway } from '../PostCallGateway';
import {
  createBasicExerciseData,
  createFeeCollectModuleExcerciseData,
  createFeeCollectModuleFollowersOnlyExcerciseData,
  createFevertCollectModuleExcerciseData,
  createFollowerOnlyReferenceModuleExcerciseData,
  createFreeCollectModuleExcerciseData,
  createFreeCollectModuleFollowersOnlyExcerciseData,
  createLimitedFeeCollectModuleExcerciseData,
  createLimitedFeeCollectModuleFollowersOnlyExcerciseData,
  createLimitedTimedFeeCollectModuleExcerciseData,
  createLimitedTimedFeeCollectModuleFollowersOnlyExcerciseData,
  createSupportedNFTAttributesExcerciseData,
  createTimedFeeCollectModuleExcerciseData,
  createTimedFeeCollectModuleFollowersOnlyExcerciseData,
  PublicationExerciseData,
} from '../__helpers__/publication-exercise-data';

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
  const gateway = new PostCallGateway(apolloClient, transactionFactory, uploadSpy);

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

describe(`Given an instance of ${PostCallGateway.name}`, () => {
  describe.each<{
    description: string;
    createExerciseData: () => PublicationExerciseData;
  }>([
    {
      description:
        'locale, content focus, text, media content and basic metadata (name, description)',
      createExerciseData: createBasicExerciseData,
    },
    {
      description: 'all supported NFT attribute types',
      createExerciseData: createSupportedNFTAttributesExcerciseData,
    },
    {
      description: 'Follower Only Reference Module',
      createExerciseData: createFollowerOnlyReferenceModuleExcerciseData,
    },
    {
      description: 'Revert Collect Module',
      createExerciseData: createFevertCollectModuleExcerciseData,
    },
    {
      description: 'Free Collect Module (anybody)',
      createExerciseData: createFreeCollectModuleExcerciseData,
    },
    {
      description: 'Free Collect Module (followers only)',
      createExerciseData: createFreeCollectModuleFollowersOnlyExcerciseData,
    },
    {
      description: 'Fee Collect Module (anybody)',
      createExerciseData: createFeeCollectModuleExcerciseData,
    },
    {
      description: 'Fee Collect Module (followers only)',
      createExerciseData: createFeeCollectModuleFollowersOnlyExcerciseData,
    },
    {
      description: 'Limited Fee Collect Module (anybody)',
      createExerciseData: createLimitedFeeCollectModuleExcerciseData,
    },
    {
      description: 'Limited Fee Collect Module (followers only)',
      createExerciseData: createLimitedFeeCollectModuleFollowersOnlyExcerciseData,
    },
    {
      description: 'Timed Fee Collect Module (anybody)',
      createExerciseData: createTimedFeeCollectModuleExcerciseData,
    },
    {
      description: 'Timed Fee Collect Module (followers only)',
      createExerciseData: createTimedFeeCollectModuleFollowersOnlyExcerciseData,
    },
    {
      description: 'Limited Timed Fee Collect Module (anybody)',
      createExerciseData: createLimitedTimedFeeCollectModuleExcerciseData,
    },
    {
      description: 'Limited Timed Fee Collect Module (followers only)',
      createExerciseData: createLimitedTimedFeeCollectModuleFollowersOnlyExcerciseData,
    },
  ])(`and $description`, ({ createExerciseData }) => {
    describe(`when creating a post`, () => {
      const { requestVars, expectedMutationRequestDetails, expectedMetadata } =
        createExerciseData();
      const request = mockCreatePostRequest(requestVars);
      const contentURI = faker.internet.url();

      describe(`via the "${PostCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
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

      describe(`via the "${PostCallGateway.prototype.createDelegatedTransaction.name}" method`, () => {
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
