import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import {
  CreateCommentTypedDataDocument,
  CreateCommentTypedDataMutation,
  CreateCommentTypedDataMutationVariables,
  CreateCommentViaDispatcherDocument,
  CreateCommentViaDispatcherMutation,
  CreateCommentViaDispatcherMutationVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockRelayerResultFragment,
  mockCreateCommentTypedDataMutation,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreateCommentRequest } from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockITransactionFactory } from '../../__helpers__/mocks';
import { CommentCallGateway } from '../CommentCallGateway';
import {
  createBasicExerciseData,
  createFeeCollectModuleExcerciseData,
  createFeeCollectModuleFollowersOnlyExcerciseData,
  createFollowerOnlyReferenceModuleExcerciseData,
  createFreeCollectModuleExcerciseData,
  createFreeCollectModuleFollowersOnlyExcerciseData,
  createLimitedFeeCollectModuleExcerciseData,
  createLimitedFeeCollectModuleFollowersOnlyExcerciseData,
  createLimitedTimedFeeCollectModuleExcerciseData,
  createLimitedTimedFeeCollectModuleFollowersOnlyExcerciseData,
  PublicationExerciseData,
  createFevertCollectModuleExcerciseData,
  createSupportedNFTAttributesExcerciseData,
  createTimedFeeCollectModuleExcerciseData,
  createTimedFeeCollectModuleFollowersOnlyExcerciseData,
} from '../__helpers__/publication-exercise-data';

function mockCreateCommentTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateCommentTypedDataMutationVariables;
  data: CreateCommentTypedDataMutation;
}): MockedResponse<CreateCommentTypedDataMutation> {
  return {
    request: {
      query: CreateCommentTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

function mockCreateCommentViaDispatcherMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateCommentViaDispatcherMutationVariables;
  data: CreateCommentViaDispatcherMutation;
}): MockedResponse<CreateCommentViaDispatcherMutation> {
  return {
    request: {
      query: CreateCommentViaDispatcherDocument,
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
  const gateway = new CommentCallGateway(apolloClient, transactionFactory, uploadSpy);

  return { gateway, uploadSpy };
}

describe(`Given an instance of ${CommentCallGateway.name}`, () => {
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
    describe(`when creating a comment`, () => {
      const { requestVars, expectedMutationRequestDetails } = createExerciseData();
      const request = mockCreateCommentRequest(requestVars);
      const contentURI = faker.internet.url();

      describe(`via the "${CommentCallGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
        it(`should create an instance of the ${UnsignedLensProtocolCall.name} with the expected typed data`, async () => {
          const createCommentTypedDataMutation = mockCreateCommentTypedDataMutation();
          const apolloClient = createMockApolloClientWithMultipleResponses([
            mockCreateCommentTypedDataMutationMockedResponse({
              variables: {
                request: {
                  contentURI,
                  profileId: request.profileId,
                  publicationId: request.publicationId,
                  ...expectedMutationRequestDetails,
                },
              },
              data: createCommentTypedDataMutation,
            }),
          ]);
          const { gateway } = setupTestScenario({ apolloClient, contentURI });

          const unsignedCall = await gateway.createUnsignedProtocolCall(request);

          expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
          expect(unsignedCall.typedData).toEqual(
            omitTypename(createCommentTypedDataMutation.result.typedData),
          );
        });

        it(`should be possible to override the signature nonce`, async () => {
          const nonce = mockNonce();
          const apolloClient = createMockApolloClientWithMultipleResponses([
            mockCreateCommentTypedDataMutationMockedResponse({
              variables: {
                request: {
                  contentURI,
                  profileId: request.profileId,
                  publicationId: request.publicationId,
                  ...expectedMutationRequestDetails,
                },
                options: {
                  overrideSigNonce: nonce,
                },
              },
              data: mockCreateCommentTypedDataMutation({ nonce }),
            }),
          ]);
          const { gateway } = setupTestScenario({ apolloClient, contentURI });

          const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

          expect(unsignedCall.nonce).toEqual(nonce);
        });
      });

      describe(`via the "${CommentCallGateway.prototype.createDelegatedTransaction.name}" method`, () => {
        it(`should create an instance of the ${NativeTransaction.name}`, async () => {
          const apolloClient = createMockApolloClientWithMultipleResponses([
            mockCreateCommentViaDispatcherMutationMockedResponse({
              variables: {
                request: {
                  contentURI,
                  profileId: request.profileId,
                  publicationId: request.publicationId,

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
