import { faker } from '@faker-js/faker';
import { SafeApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockDataAvailabilityPublicationResult,
  mockRelayErrorFragment,
  mockCreateDataAvailabilityCommentTypedDataResponse,
  mockCreateCommentTypedDataData,
  mockCreateDataAvailabilityCommentViaDispatcherDataResponse,
} from '@lens-protocol/api-bindings/mocks';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { mockCreateCommentRequest } from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { Url } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  mockITransactionFactory,
  mockIMetadataUploader,
  assertUnsignedProtocolCallCorrectness,
  assertBroadcastingErrorResultWithRequestFallback,
} from '../../__helpers__/mocks';
import { CreateOffChainCommentGateway } from '../CreateOffChainCommentGateway';

function setupTestScenario({
  apolloClient,
  uploadUrl,
}: {
  apolloClient: SafeApolloClient;
  uploadUrl: Url;
}) {
  const transactionFactory = mockITransactionFactory();
  const uploader = mockIMetadataUploader(uploadUrl);

  const gateway = new CreateOffChainCommentGateway(apolloClient, transactionFactory, uploader);

  return { gateway, uploader };
}

describe(`Given an instance of ${CreateOffChainCommentGateway.name}`, () => {
  const data = mockCreateCommentTypedDataData();
  const uploadUrl = faker.internet.url();

  describe(`when creating an IUnsignedProtocolCall<CreateCommentRequest>`, () => {
    const request = mockCreateCommentRequest();

    it(`should:
        - use the IMetadataUploader<CreateCommentRequest'> to upload the publication metadata
        - create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateDataAvailabilityCommentTypedDataResponse({
          variables: {
            request: {
              commentOn: request.publicationId,
              from: request.profileId,
              contentURI: uploadUrl,
            },
          },
          data,
        }),
      ]);

      const { gateway, uploader } = setupTestScenario({ apolloClient, uploadUrl });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      expect(uploader.upload).toHaveBeenCalledWith(request);
      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });
  });

  describe(`when creating a ${DataTransaction.name}<CreateCommentRequest>`, () => {
    const request = mockCreateCommentRequest();

    it(`should:
        - use the IMetadataUploader<CreateCommentRequest'> to upload the publication metadata
        - create an instance of the ${DataTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateDataAvailabilityCommentViaDispatcherDataResponse({
          variables: {
            request: {
              commentOn: request.publicationId,
              from: request.profileId,
              contentURI: uploadUrl,
            },
          },
          data: {
            result: mockDataAvailabilityPublicationResult(),
          },
        }),
      ]);
      const { gateway, uploader } = setupTestScenario({ apolloClient, uploadUrl });

      const result = await gateway.createDelegatedTransaction(request);

      expect(uploader.upload).toHaveBeenCalledWith(request);
      expect(result.unwrap()).toBeInstanceOf(DataTransaction);
      expect(result.unwrap()).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          request,
        }),
      );
    });

    it.each([
      mockRelayErrorFragment(RelayErrorReasons.Rejected),
      mockRelayErrorFragment(RelayErrorReasons.NotAllowed),
    ])(
      `should fail w/ a ${BroadcastingError.name} in case of RelayError response with "$reason" reason`,
      async (relayError) => {
        const apolloClient = mockLensApolloClient([
          mockCreateDataAvailabilityCommentViaDispatcherDataResponse({
            variables: {
              request: {
                commentOn: request.publicationId,
                from: request.profileId,
                contentURI: uploadUrl,
              },
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateDataAvailabilityCommentTypedDataResponse({
            variables: {
              request: {
                commentOn: request.publicationId,
                from: request.profileId,
                contentURI: uploadUrl,
              },
            },
            data,
          }),
        ]);

        const { gateway } = setupTestScenario({ apolloClient, uploadUrl });
        const result = await gateway.createDelegatedTransaction(request);

        assertBroadcastingErrorResultWithRequestFallback(result, data.result.typedData);
      },
    );
  });
});
