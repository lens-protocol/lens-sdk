import { faker } from '@faker-js/faker';
import { LensApolloClient, omitTypename } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockRelayerResultFragment,
  mockCreateCommentTypedDataMutation,
  createCreateCommentTypedDataMutationMockedResponse,
  createCreateCommentViaDispatcherMutationMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreateCommentRequest } from '@lens-protocol/domain/mocks';
import { ChainType, Url } from '@lens-protocol/shared-kernel';

import { UnsignedLensProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
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

    describe(`when creating an ${UnsignedLensProtocolCall.name}<CreateCommentRequest>`, () => {
      it(`should:
          - use the IMetadataUploader<CreateCommentRequest'> to upload the publication metadata
          - create an instance of the ${UnsignedLensProtocolCall.name} with the expected typed data`, async () => {
        const createCommentTypedDataMutation = mockCreateCommentTypedDataMutation();
        const apolloClient = createMockApolloClientWithMultipleResponses([
          createCreateCommentTypedDataMutationMockedResponse({
            variables: {
              request: {
                contentURI: uploadUrl,
                profileId: request.profileId,
                publicationId: request.publicationId,
                ...expectedMutationRequestDetails,
              },
            },
            data: createCommentTypedDataMutation,
          }),
        ]);
        const { gateway, uploader } = setupTestScenario({ apolloClient, uploadUrl });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        expect(uploader.upload).toHaveBeenCalledWith(request);
        expect(unsignedCall).toBeInstanceOf(UnsignedLensProtocolCall);
        expect(unsignedCall.typedData).toEqual(
          omitTypename(createCommentTypedDataMutation.result.typedData),
        );
      });

      it(`should be possible to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apolloClient = createMockApolloClientWithMultipleResponses([
          createCreateCommentTypedDataMutationMockedResponse({
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
            data: mockCreateCommentTypedDataMutation({ nonce }),
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
          createCreateCommentViaDispatcherMutationMockedResponse({
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

        const transaction = await gateway.createDelegatedTransaction(request);

        await transaction.waitNextEvent();
        expect(uploader.upload).toHaveBeenCalledWith(request);
        expect(transaction).toBeInstanceOf(NativeTransaction);
        expect(transaction).toEqual(
          expect.objectContaining({
            chainType: ChainType.POLYGON,
            id: expect.any(String),
            request,
          }),
        );
      });
    });
  });
});
