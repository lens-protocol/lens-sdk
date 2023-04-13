import { faker } from '@faker-js/faker';
import { LensApolloClient, omitTypename, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockRelayerResultFragment,
  mockCreateCommentTypedDataData,
  createCreateCommentTypedDataMockedResponse,
  createCreateCommentViaDispatcherMockedResponse,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreateCommentRequest } from '@lens-protocol/domain/mocks';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Url } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockIMetadataUploader, mockITransactionFactory } from '../../__helpers__/mocks';
import { CreateCommentCallGateway } from '../CreateCommentCallGateway';
import {
  createFeeCollectModuleExerciseData,
  createFeeCollectModuleFollowersOnlyExerciseData,
  createFollowerOnlyReferenceModuleExerciseData,
  createFreeCollectModuleExerciseData,
  createFreeCollectModuleFollowersOnlyExerciseData,
  createLimitedFeeCollectModuleExerciseData,
  createLimitedFeeCollectModuleFollowersOnlyExerciseData,
  createLimitedTimedFeeCollectModuleExerciseData,
  createLimitedTimedFeeCollectModuleFollowersOnlyExerciseData,
  PublicationExerciseData,
  createRevertCollectModuleExerciseData,
  createTimedFeeCollectModuleExerciseData,
  createTimedFeeCollectModuleFollowersOnlyExerciseData,
} from '../__helpers__/publication-exercise-data';

function setupTestScenario({
  apolloClient,
  uploadUrl,
}: {
  apolloClient: LensApolloClient;
  uploadUrl: Url;
}) {
  const transactionFactory = mockITransactionFactory();
  const uploader = mockIMetadataUploader(uploadUrl);

  const gateway = new CreateCommentCallGateway(apolloClient, transactionFactory, uploader);

  return { gateway, uploader };
}

describe(`Given an instance of ${CreateCommentCallGateway.name}`, () => {
  describe.each<{
    description: string;
    createExerciseData: () => PublicationExerciseData;
  }>([
    {
      description: 'Follower Only Reference Module',
      createExerciseData: createFollowerOnlyReferenceModuleExerciseData,
    },
    {
      description: 'Revert Collect Module',
      createExerciseData: createRevertCollectModuleExerciseData,
    },
    {
      description: 'Free Collect Module (anybody)',
      createExerciseData: createFreeCollectModuleExerciseData,
    },
    {
      description: 'Free Collect Module (followers only)',
      createExerciseData: createFreeCollectModuleFollowersOnlyExerciseData,
    },
    {
      description: 'Fee Collect Module (anybody)',
      createExerciseData: createFeeCollectModuleExerciseData,
    },
    {
      description: 'Fee Collect Module (followers only)',
      createExerciseData: createFeeCollectModuleFollowersOnlyExerciseData,
    },
    {
      description: 'Limited Fee Collect Module (anybody)',
      createExerciseData: createLimitedFeeCollectModuleExerciseData,
    },
    {
      description: 'Limited Fee Collect Module (followers only)',
      createExerciseData: createLimitedFeeCollectModuleFollowersOnlyExerciseData,
    },
    {
      description: 'Timed Fee Collect Module (anybody)',
      createExerciseData: createTimedFeeCollectModuleExerciseData,
    },
    {
      description: 'Timed Fee Collect Module (followers only)',
      createExerciseData: createTimedFeeCollectModuleFollowersOnlyExerciseData,
    },
    {
      description: 'Limited Timed Fee Collect Module (anybody)',
      createExerciseData: createLimitedTimedFeeCollectModuleExerciseData,
    },
    {
      description: 'Limited Timed Fee Collect Module (followers only)',
      createExerciseData: createLimitedTimedFeeCollectModuleFollowersOnlyExerciseData,
    },
  ])(`and CreateCommentRequest with $description`, ({ createExerciseData }) => {
    const { requestVars, expectedMutationRequestDetails } = createExerciseData();
    const request = mockCreateCommentRequest(requestVars);
    const uploadUrl = faker.internet.url();

    describe(`when creating an IUnsignedProtocolCall<CreateCommentRequest>`, () => {
      it(`should:
          - use the IMetadataUploader<CreateCommentRequest'> to upload the publication metadata
          - create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
        const data = mockCreateCommentTypedDataData();
        const apolloClient = createMockApolloClientWithMultipleResponses([
          createCreateCommentTypedDataMockedResponse({
            variables: {
              request: {
                contentURI: uploadUrl,
                profileId: request.profileId,
                publicationId: request.publicationId,
                ...expectedMutationRequestDetails,
              },
            },
            data,
          }),
        ]);
        const { gateway, uploader } = setupTestScenario({ apolloClient, uploadUrl });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        expect(uploader.upload).toHaveBeenCalledWith(request);
        expect(unsignedCall).toBeInstanceOf(UnsignedProtocolCall);
        expect(unsignedCall.typedData).toEqual(omitTypename(data.result.typedData));
      });

      it(`should be possible to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apolloClient = createMockApolloClientWithMultipleResponses([
          createCreateCommentTypedDataMockedResponse({
            variables: {
              request: {
                contentURI: uploadUrl,
                profileId: request.profileId,
                publicationId: request.publicationId,
                ...expectedMutationRequestDetails,
              },
              options: {
                overrideSigNonce: nonce,
              },
            },
            data: mockCreateCommentTypedDataData({ nonce }),
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient, uploadUrl });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

        expect(unsignedCall.nonce).toEqual(nonce);
      });
    });

    describe(`when creating a ${NativeTransaction.name}<CreateCommentRequest>}"`, () => {
      it(`should:
          - use the IMetadataUploader<CreateCommentRequest'> to upload the publication metadata
          - create an instance of the ${NativeTransaction.name}`, async () => {
        const apolloClient = createMockApolloClientWithMultipleResponses([
          createCreateCommentViaDispatcherMockedResponse({
            variables: {
              request: {
                contentURI: uploadUrl,
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

        const { gateway, uploader } = setupTestScenario({ apolloClient, uploadUrl });

        const result = await gateway.createDelegatedTransaction(request);

        expect(uploader.upload).toHaveBeenCalledWith(request);
        expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
        expect(result.unwrap()).toEqual(
          expect.objectContaining({
            chainType: ChainType.POLYGON,
            id: expect.any(String),
            request,
          }),
        );
      });

      it.each([
        {
          expected: new BroadcastingError(BroadcastingErrorReason.REJECTED),
          relayError: mockRelayErrorFragment(RelayErrorReasons.Rejected),
        },
        {
          expected: new BroadcastingError(BroadcastingErrorReason.UNSPECIFIED),
          relayError: mockRelayErrorFragment(RelayErrorReasons.NotAllowed),
        },
      ])(
        `should fail w/ a ${BroadcastingError.name} in case of RelayError response with "$relayError.reason" reason`,
        async ({ relayError, expected }) => {
          const apolloClient = createMockApolloClientWithMultipleResponses([
            createCreateCommentViaDispatcherMockedResponse({
              variables: {
                request: {
                  contentURI: uploadUrl,
                  profileId: request.profileId,
                  publicationId: request.publicationId,

                  ...expectedMutationRequestDetails,
                },
              },
              data: {
                result: relayError,
              },
            }),
          ]);

          const { gateway } = setupTestScenario({ apolloClient, uploadUrl });

          const result = await gateway.createDelegatedTransaction(request);

          expect(() => result.unwrap()).toThrow(expected);
        },
      );
    });
  });
});
