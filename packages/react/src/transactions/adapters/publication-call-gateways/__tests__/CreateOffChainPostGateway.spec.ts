import { faker } from '@faker-js/faker';
import { LensApolloClient, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockCreatePostTypedDataData,
  createCreateDataAvailabilityPostTypedDataMockedResponse,
  createCreateDataAvailabilityPostViaDispatcherDataMockedResponse,
  mockDataAvailabilityPublicationResult,
  mockRelayErrorFragment,
} from '@lens-protocol/api-bindings/mocks';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { Url } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  mockITransactionFactory,
  mockIMetadataUploader,
  assertUnsignedProtocolCallCorrectness,
  assertBroadcastingErrorResultWithRequestFallback,
} from '../../__helpers__/mocks';
import { CreateOffChainPostGateway } from '../CreateOffChainPostGateway';

function setupTestScenario({
  apolloClient,
  uploadUrl,
}: {
  apolloClient: LensApolloClient;
  uploadUrl: Url;
}) {
  const transactionFactory = mockITransactionFactory();
  const uploader = mockIMetadataUploader(uploadUrl);

  const gateway = new CreateOffChainPostGateway(apolloClient, transactionFactory, uploader);

  return { gateway, uploader };
}

describe(`Given an instance of ${CreateOffChainPostGateway.name}`, () => {
  const data = mockCreatePostTypedDataData();
  const uploadUrl = faker.internet.url();

  describe(`when creating an IUnsignedProtocolCall<CreatePostRequest>`, () => {
    const request = mockCreatePostRequest();

    it(`should:
        - use the IMetadataUploader<CreatePostRequest'> to upload the publication metadata
        - create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createCreateDataAvailabilityPostTypedDataMockedResponse({
          variables: {
            request: {
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

  describe(`when creating a ${DataTransaction.name}<CreatePostRequest>`, () => {
    const request = mockCreatePostRequest();

    it(`should:
        - use the IMetadataUploader<CreatePostRequest'> to upload the publication metadata
        - create an instance of the ${DataTransaction.name}`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createCreateDataAvailabilityPostViaDispatcherDataMockedResponse({
          variables: {
            request: {
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
        const apolloClient = createMockApolloClientWithMultipleResponses([
          createCreateDataAvailabilityPostViaDispatcherDataMockedResponse({
            variables: {
              request: {
                from: request.profileId,
                contentURI: uploadUrl,
              },
            },
            data: {
              result: relayError,
            },
          }),
          createCreateDataAvailabilityPostTypedDataMockedResponse({
            variables: {
              request: {
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
