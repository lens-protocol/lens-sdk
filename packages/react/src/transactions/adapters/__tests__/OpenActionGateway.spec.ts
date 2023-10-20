import {
  LensProfileManagerRelayErrorReasonType,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  mockActOnOpenActionResponse,
  mockCreateActOnOpenActionTypedDataData,
  mockCreateActOnOpenActionTypedDataResponse,
  mockCreateLegacyCollectTypedDataData,
  mockCreateLegacyCollectTypedDataResponse,
  mockLegacyCollectResponse,
  mockLensApolloClient,
  mockLensProfileManagerRelayError,
  mockRelaySuccessFragment,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import {
  mockLegacyCollectRequest,
  mockMultirecipientCollectRequest,
  mockNonce,
  mockProfileId,
  mockPublicationId,
  mockSimpleCollectRequest,
  mockUnknownActionRequest,
} from '@lens-protocol/domain/mocks';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { OpenActionGateway } from '../OpenActionGateway';
import {
  assertBroadcastingErrorResultWithRequestFallback,
  assertUnsignedProtocolCallCorrectness,
} from '../__helpers__/assertions';
import { mockITransactionFactory } from '../__helpers__/mocks';

function setupTestScenario({ apolloClient }: { apolloClient: SafeApolloClient }) {
  const transactionFactory = mockITransactionFactory();

  const gateway = new OpenActionGateway(apolloClient, transactionFactory);

  return { gateway };
}

describe(`Given an instance of ${OpenActionGateway.name}`, () => {
  const unknownActionContractAddress = mockEvmAddress();
  const unknownActionData = '0xdeadbeef' as Data;
  const referrerProfileId = mockProfileId();
  const referrerPublicationId = mockPublicationId();
  const publicationId = mockPublicationId();
  const referrers = [referrerProfileId, referrerPublicationId];
  const expectedOnChainReferrers = [
    {
      profileId: referrerProfileId,
    },
    {
      publicationId: referrerPublicationId,
    },
  ];

  describe.each([
    {
      name: 'SimpleCollectRequest',
      request: mockSimpleCollectRequest({ publicationId, referrers }),
      expectedRequest: {
        for: publicationId,
        actOn: {
          simpleCollectOpenAction: true,
        },
        referrers: expectedOnChainReferrers,
      },
    },
    {
      name: 'MultirecipientCollectRequest',
      request: mockMultirecipientCollectRequest({ publicationId, referrers }),
      expectedRequest: {
        for: publicationId,
        actOn: {
          multirecipientCollectOpenAction: true,
        },
        referrers: expectedOnChainReferrers,
      },
    },
    {
      name: 'UnknownActionRequest',
      request: mockUnknownActionRequest({
        publicationId,
        address: unknownActionContractAddress,
        data: unknownActionData,
      }),
      expectedRequest: {
        for: publicationId,
        actOn: {
          unknownOpenAction: {
            address: unknownActionContractAddress,
            data: unknownActionData,
          },
        },
      },
    },
  ])(`and a $name`, ({ name, request, expectedRequest }) => {
    describe(`when creating an IUnsignedProtocolCall<${name}>`, () => {
      it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
        const data = mockCreateActOnOpenActionTypedDataData();
        const apolloClient = mockLensApolloClient([
          mockCreateActOnOpenActionTypedDataResponse({
            variables: {
              request: expectedRequest,
            },
            data,
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });

      it(`should allow to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apolloClient = mockLensApolloClient([
          mockCreateActOnOpenActionTypedDataResponse({
            variables: {
              request: expectedRequest,
              options: {
                overrideSigNonce: nonce,
              },
            },
            data: mockCreateActOnOpenActionTypedDataData({ nonce }),
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

        expect(unsignedCall.nonce).toEqual(nonce);
      });
    });
  });

  describe.each([
    {
      name: 'SimpleCollectRequest',
      request: mockSimpleCollectRequest({ publicationId, referrers }),
      expectedRequest: {
        for: publicationId,
        actOn: {
          simpleCollectOpenAction: true,
        },
        referrers: expectedOnChainReferrers,
      },
    },
    {
      name: 'UnknownActionRequest',
      request: mockUnknownActionRequest({
        publicationId,
        address: unknownActionContractAddress,
        data: unknownActionData,
      }),
      expectedRequest: {
        for: publicationId,
        actOn: {
          unknownOpenAction: {
            address: unknownActionContractAddress,
            data: unknownActionData,
          },
        },
      },
    },
  ])(`and a $name`, ({ name, request, expectedRequest }) => {
    describe(`when creating a ${NativeTransaction.name}<${name}>`, () => {
      it(`should create an instance of the ${NativeTransaction.name}`, async () => {
        const apolloClient = mockLensApolloClient([
          mockActOnOpenActionResponse({
            variables: {
              request: expectedRequest,
            },
            data: {
              result: mockRelaySuccessFragment(),
            },
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        const result = await gateway.createDelegatedTransaction(request);

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
        mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.AppNotAllowed),
        mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled,
        ),
        mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.NotSponsored),
        mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.RateLimited),
      ])(
        `should fail w/ a ${BroadcastingError.name} in case of $__typename response with "$reason" reason`,
        async (relayError) => {
          const data = mockCreateActOnOpenActionTypedDataData();
          const apolloClient = mockLensApolloClient([
            mockActOnOpenActionResponse({
              variables: {
                request: expectedRequest,
              },
              data: {
                result: relayError,
              },
            }),
            mockCreateActOnOpenActionTypedDataResponse({
              variables: {
                request: expectedRequest,
              },
              data,
            }),
          ]);

          const { gateway } = setupTestScenario({ apolloClient });
          const result = await gateway.createDelegatedTransaction(request);

          assertBroadcastingErrorResultWithRequestFallback(result, data.result.typedData);
        },
      );
    });
  });

  describe(`and a LegacyCollectRequest`, () => {
    const mirrorId = mockPublicationId();
    const request = mockLegacyCollectRequest({ referrer: mirrorId });
    const expectedRequest = {
      on: request.publicationId,
      referrer: mirrorId,
    };

    describe(`when creating an IUnsignedProtocolCall<LegacyCollectRequest>`, () => {
      it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
        const data = mockCreateLegacyCollectTypedDataData();
        const apolloClient = mockLensApolloClient([
          mockCreateLegacyCollectTypedDataResponse({
            variables: {
              request: expectedRequest,
            },
            data,
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request);

        assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
      });

      it(`should allow to override the signature nonce`, async () => {
        const nonce = mockNonce();
        const apolloClient = mockLensApolloClient([
          mockCreateLegacyCollectTypedDataResponse({
            variables: {
              request: expectedRequest,
              options: {
                overrideSigNonce: nonce,
              },
            },
            data: mockCreateLegacyCollectTypedDataData({ nonce }),
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

        expect(unsignedCall.nonce).toEqual(nonce);
      });
    });

    describe(`when creating a ${NativeTransaction.name}<LegacyCollectRequest>`, () => {
      it(`should create an instance of the ${NativeTransaction.name}`, async () => {
        const apolloClient = mockLensApolloClient([
          mockLegacyCollectResponse({
            variables: {
              request: expectedRequest,
            },
            data: {
              result: mockRelaySuccessFragment(),
            },
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient });

        const result = await gateway.createDelegatedTransaction(request);

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
        mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.AppNotAllowed),
        mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled,
        ),
        mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.NotSponsored),
        mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.RateLimited),
      ])(
        `should fail w/ a ${BroadcastingError.name} in case of $__typename response with "$reason" reason`,
        async (relayError) => {
          const data = mockCreateLegacyCollectTypedDataData();
          const apolloClient = mockLensApolloClient([
            mockLegacyCollectResponse({
              variables: {
                request: expectedRequest,
              },
              data: {
                result: relayError,
              },
            }),
            mockCreateLegacyCollectTypedDataResponse({
              variables: {
                request: expectedRequest,
              },
              data,
            }),
          ]);

          const { gateway } = setupTestScenario({ apolloClient });
          const result = await gateway.createDelegatedTransaction(request);

          assertBroadcastingErrorResultWithRequestFallback(result, data.result.typedData);
        },
      );
    });
  });
});
