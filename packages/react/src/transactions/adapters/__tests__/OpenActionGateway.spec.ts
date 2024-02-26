/*
 * @jest-environment node
 */
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
import { NativeTransaction, UnsignedTransaction } from '@lens-protocol/domain/entities';
import {
  mockLegacyCollectRequest,
  mockMultirecipientCollectRequest,
  mockNonce,
  mockProfileId,
  mockPublicationId,
  mockSimpleCollectRequest,
  mockUnknownActionRequest,
  mockWallet,
} from '@lens-protocol/domain/mocks';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';

import { RequiredConfig } from '../../../config';
import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { mockIProviderFactory } from '../../../wallet/adapters/__helpers__/mocks';
import { UnsignedContractCallTransaction } from '../AbstractContractCallGateway';
import { OpenActionGateway } from '../OpenActionGateway';
import {
  assertBroadcastingErrorWithReason,
  assertUnsignedProtocolCallCorrectness,
} from '../__helpers__/assertions';
import { mockITransactionFactory, mockJsonRpcProvider } from '../__helpers__/mocks';

function setupTestScenario({
  apolloClient,
  provider = mock<providers.JsonRpcProvider>(),
}: {
  apolloClient: SafeApolloClient;
  provider?: providers.JsonRpcProvider;
}) {
  const config = mock<RequiredConfig>();
  const transactionFactory = mockITransactionFactory();

  const providerFactory = mockIProviderFactory({
    chainType: ChainType.POLYGON,
    provider,
  });

  const gateway = new OpenActionGateway(config, apolloClient, transactionFactory, providerFactory);

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
  const mirrorId = mockPublicationId();

  describe.each([
    {
      name: 'LegacyCollectRequest',
      request: mockLegacyCollectRequest({ publicationId, referrer: mirrorId }),
      setupMocks: (nonce?: number) => {
        const data = mockCreateLegacyCollectTypedDataData({ nonce });
        const response = mockCreateLegacyCollectTypedDataResponse({
          variables: {
            request: {
              on: publicationId,
              referrer: mirrorId,
            },
            options: nonce
              ? {
                  overrideSigNonce: nonce,
                }
              : undefined,
          },
          data,
        });

        return { data, response };
      },
    },
    {
      name: 'SimpleCollectRequest',
      request: mockSimpleCollectRequest({ publicationId, referrers }),
      setupMocks: (nonce?: number) => {
        const data = mockCreateActOnOpenActionTypedDataData({ nonce });
        const response = mockCreateActOnOpenActionTypedDataResponse({
          variables: {
            request: {
              for: publicationId,
              actOn: {
                simpleCollectOpenAction: true,
              },
              referrers: expectedOnChainReferrers,
            },
            options: nonce
              ? {
                  overrideSigNonce: nonce,
                }
              : undefined,
          },
          data,
        });

        return { data, response };
      },
    },
    {
      name: 'MultirecipientCollectRequest',
      request: mockMultirecipientCollectRequest({ publicationId, referrers }),
      setupMocks: (nonce?: number) => {
        const data = mockCreateActOnOpenActionTypedDataData({ nonce });
        const response = mockCreateActOnOpenActionTypedDataResponse({
          variables: {
            request: {
              for: publicationId,
              actOn: {
                multirecipientCollectOpenAction: true,
              },
              referrers: expectedOnChainReferrers,
            },
            options: nonce
              ? {
                  overrideSigNonce: nonce,
                }
              : undefined,
          },
          data,
        });

        return { data, response };
      },
    },
    {
      name: 'UnknownActionRequest',
      request: mockUnknownActionRequest({
        publicationId,
        address: unknownActionContractAddress,
        data: unknownActionData,
        referrers,
      }),
      setupMocks: (nonce?: number) => {
        const data = mockCreateActOnOpenActionTypedDataData({ nonce });
        const response = mockCreateActOnOpenActionTypedDataResponse({
          variables: {
            request: {
              for: publicationId,
              actOn: {
                unknownOpenAction: {
                  address: unknownActionContractAddress,
                  data: unknownActionData,
                },
              },
              referrers: expectedOnChainReferrers,
            },
            options: nonce
              ? {
                  overrideSigNonce: nonce,
                }
              : undefined,
          },
          data,
        });

        return { data, response };
      },
    },
  ])(`when creating an IUnsignedProtocolCall<$name>`, ({ request, setupMocks }) => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const { data, response } = setupMocks();

      const apolloClient = mockLensApolloClient([response]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });

    it(`should allow to override the signature nonce`, async () => {
      const nonce = mockNonce();
      const { response } = setupMocks(nonce);

      const apolloClient = mockLensApolloClient([response]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe.each([
    {
      name: 'LegacyCollectRequest',
      request: mockLegacyCollectRequest({ publicationId, referrer: mirrorId }),
      response: mockCreateLegacyCollectTypedDataResponse({
        variables: {
          request: {
            on: publicationId,
            referrer: mirrorId,
          },
        },
        data: mockCreateLegacyCollectTypedDataData(),
      }),
    },
    {
      name: 'SimpleCollectRequest',
      request: mockSimpleCollectRequest({ publicationId, referrers }),
      response: mockCreateActOnOpenActionTypedDataResponse({
        variables: {
          request: {
            for: publicationId,
            actOn: {
              simpleCollectOpenAction: true,
            },
            referrers: expectedOnChainReferrers,
          },
        },
        data: mockCreateActOnOpenActionTypedDataData(),
      }),
    },
    {
      name: 'MultirecipientCollectRequest',
      request: mockMultirecipientCollectRequest({ publicationId, referrers }),
      response: mockCreateActOnOpenActionTypedDataResponse({
        variables: {
          request: {
            for: publicationId,
            actOn: {
              multirecipientCollectOpenAction: true,
            },
            referrers: expectedOnChainReferrers,
          },
        },
        data: mockCreateActOnOpenActionTypedDataData(),
      }),
    },
    {
      name: 'UnknownActionRequest',
      request: mockUnknownActionRequest({
        publicationId,
        address: unknownActionContractAddress,
        data: unknownActionData,
      }),
      response: mockCreateActOnOpenActionTypedDataResponse({
        variables: {
          request: {
            for: publicationId,
            actOn: {
              unknownOpenAction: {
                address: unknownActionContractAddress,
                data: unknownActionData,
              },
            },
          },
        },
        data: mockCreateActOnOpenActionTypedDataData(),
      }),
    },
  ])(`when creating an ${UnsignedTransaction.name}<$name>`, ({ request, response }) => {
    const wallet = mockWallet();

    it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
      const provider = await mockJsonRpcProvider();

      const apolloClient = mockLensApolloClient([response]);
      const { gateway } = setupTestScenario({ apolloClient, provider });

      const unsignedTransaction = await gateway.createUnsignedTransaction(request, wallet);

      expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
    });
  });

  describe.each([
    {
      name: 'LegacyCollectRequest',
      request: mockLegacyCollectRequest({ publicationId, referrer: mirrorId }),
      response: mockLegacyCollectResponse({
        variables: {
          request: {
            on: publicationId,
            referrer: mirrorId,
          },
        },
        data: {
          result: mockRelaySuccessFragment(),
        },
      }),
    },
    {
      name: 'SimpleCollectRequest',
      request: mockSimpleCollectRequest({ publicationId, referrers }),
      response: mockActOnOpenActionResponse({
        variables: {
          request: {
            for: publicationId,
            actOn: {
              simpleCollectOpenAction: true,
            },
            referrers: expectedOnChainReferrers,
          },
        },
        data: {
          result: mockRelaySuccessFragment(),
        },
      }),
    },
    {
      name: 'UnknownActionRequest',
      request: mockUnknownActionRequest({
        publicationId,
        address: unknownActionContractAddress,
        data: unknownActionData,
      }),
      response: mockActOnOpenActionResponse({
        variables: {
          request: {
            for: publicationId,
            actOn: {
              unknownOpenAction: {
                address: unknownActionContractAddress,
                data: unknownActionData,
              },
            },
          },
        },
        data: {
          result: mockRelaySuccessFragment(),
        },
      }),
    },
  ])(`when creating a ${NativeTransaction.name}<$name>`, ({ request, response }) => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([response]);
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
  });

  describe(`when creating any ${NativeTransaction.name}`, () => {
    describe.each([
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.AppNotAllowed,
        ),
        reason: BroadcastingErrorReason.APP_NOT_ALLOWED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled,
        ),
        reason: BroadcastingErrorReason.NO_LENS_MANAGER_ENABLED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.NotSponsored,
        ),
        reason: BroadcastingErrorReason.NOT_SPONSORED,
      },
      {
        relayError: mockLensProfileManagerRelayError(
          LensProfileManagerRelayErrorReasonType.RateLimited,
        ),
        reason: BroadcastingErrorReason.RATE_LIMITED,
      },
      {
        relayError: mockLensProfileManagerRelayError(LensProfileManagerRelayErrorReasonType.Failed),
        reason: BroadcastingErrorReason.UNKNOWN,
      },
    ])(
      `the API returns a $relayError.__typename with "$relayError.reason" reason`,
      ({ reason, relayError }) => {
        const request = mockSimpleCollectRequest();

        it(`should fail w/ a ${BroadcastingError.name} with ${reason}`, async () => {
          const apolloClient = mockLensApolloClient([
            mockActOnOpenActionResponse({
              variables: {
                request: {
                  for: request.publicationId,
                  actOn: {
                    simpleCollectOpenAction: true,
                  },
                },
              },
              data: {
                result: relayError,
              },
            }),
          ]);
          const { gateway } = setupTestScenario({ apolloClient });

          const result = await gateway.createDelegatedTransaction(request);

          assertBroadcastingErrorWithReason(result, reason);
        });
      },
    );
  });

  describe.each([
    {
      name: 'SimpleCollectRequest',
      request: mockSimpleCollectRequest({ publicationId, referrers, public: true }),
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
      request: mockMultirecipientCollectRequest({ publicationId, referrers, public: true }),
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
        public: true,
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
  ])(
    `when creating ${UnsignedTransaction.name}<$name> for a Public Act Proxy call`,
    ({ request, expectedRequest }) => {
      const wallet = mockWallet();
      const data = mockCreateActOnOpenActionTypedDataData();

      it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
        const provider = await mockJsonRpcProvider();

        const apolloClient = mockLensApolloClient([
          mockCreateActOnOpenActionTypedDataResponse({
            variables: {
              request: expectedRequest,
            },
            data,
          }),
        ]);
        const { gateway } = setupTestScenario({ apolloClient, provider });

        const unsignedTransaction = await gateway.createUnsignedTransaction(request, wallet);

        expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
      });
    },
  );
});
