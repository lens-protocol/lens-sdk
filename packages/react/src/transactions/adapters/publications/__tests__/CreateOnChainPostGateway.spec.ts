/*
 * @jest-environment node
 */
import {
  SafeApolloClient,
  LensProfileManagerRelayErrorReasonType,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockCreateOnchainPostTypedDataResponse,
  mockCreateOnchainPostTypedDataData,
  mockRelaySuccessFragment,
  mockPostOnchainResponse,
  mockLensProfileManagerRelayError,
} from '@lens-protocol/api-bindings/mocks';
import { NativeTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockCreatePostRequest, mockWallet } from '@lens-protocol/domain/mocks';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, ILogger } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockIProviderFactory } from '../../../../wallet/adapters/__helpers__/mocks';
import { UnsignedContractCallTransaction } from '../../AbstractContractCallGateway';
import {
  assertBroadcastingErrorWithReason,
  assertUnsignedProtocolCallCorrectness,
} from '../../__helpers__/assertions';
import { mockITransactionFactory, mockJsonRpcProvider } from '../../__helpers__/mocks';
import { CreateOnChainPostGateway } from '../CreateOnChainPostGateway';
import { mockOnchainPostRequest } from '../__helpers__/mocks';

function setupTestScenario({
  apolloClient,
  provider = mock<providers.JsonRpcProvider>(),
}: {
  apolloClient: SafeApolloClient;
  provider?: providers.JsonRpcProvider;
}) {
  const logger = mock<ILogger>();
  const transactionFactory = mockITransactionFactory();
  const providerFactory = mockIProviderFactory({
    chainType: ChainType.POLYGON,
    provider,
  });

  const gateway = new CreateOnChainPostGateway(
    logger,
    providerFactory,
    apolloClient,
    transactionFactory,
  );

  return { gateway };
}

describe(`Given an instance of ${CreateOnChainPostGateway.name}`, () => {
  const request = mockCreatePostRequest();
  const onchainPostRequest = mockOnchainPostRequest(request);
  const data = mockCreateOnchainPostTypedDataData();

  describe(`when creating an IUnsignedProtocolCall<CreatePostRequest>`, () => {
    it(`should create an instance of the ${UnsignedProtocolCall.name} with the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateOnchainPostTypedDataResponse({
          variables: {
            request: onchainPostRequest,
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
        mockCreateOnchainPostTypedDataResponse({
          variables: {
            request: onchainPostRequest,
            options: {
              overrideSigNonce: nonce,
            },
          },
          data: mockCreateOnchainPostTypedDataData({ nonce }),
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });

  describe(`when creating an UnsignedTransaction<CreatePostRequest>`, () => {
    const wallet = mockWallet();

    it(`should succeed with the expected ${UnsignedContractCallTransaction.name}`, async () => {
      const provider = await mockJsonRpcProvider();
      const apolloClient = mockLensApolloClient([
        mockCreateOnchainPostTypedDataResponse({
          variables: {
            request: onchainPostRequest,
          },
          data,
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient, provider });

      const unsignedTransaction = await gateway.createUnsignedTransaction(request, wallet);

      expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
    });
  });

  describe(`when creating a ${NativeTransaction.name}<CreatePostRequest>`, () => {
    it(`should create an instance of the ${NativeTransaction.name}`, async () => {
      const apolloClient = mockLensApolloClient([
        mockPostOnchainResponse({
          variables: {
            request: onchainPostRequest,
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
      `should fail w/ a ${BroadcastingError.name} with $reason in case of $relayError.__typename response with "$relayError.reason" reason`,
      async ({ relayError, reason }) => {
        const apolloClient = mockLensApolloClient([
          mockPostOnchainResponse({
            variables: {
              request: onchainPostRequest,
            },
            data: {
              result: relayError,
            },
          }),
          mockCreateOnchainPostTypedDataResponse({
            variables: {
              request: onchainPostRequest,
            },
            data,
          }),
        ]);

        const { gateway } = setupTestScenario({ apolloClient });
        const result = await gateway.createDelegatedTransaction(request);

        assertBroadcastingErrorWithReason(result, reason);
      },
    );
  });
});
