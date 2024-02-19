/*
 * @jest-environment node
 */
import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockCreateSetProfileMetadataTypedDataData,
  mockCreateSetProfileMetadataTypedDataResponse,
  mockLensApolloClient,
} from '@lens-protocol/api-bindings/mocks';
import { UnsignedTransaction } from '@lens-protocol/domain/entities';
import { mockNonce, mockSetProfileMetadataRequest, mockWallet } from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';

import { RequiredConfig } from '../../../../config';
import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import { mockIProviderFactory } from '../../../../wallet/adapters/__helpers__/mocks';
import { UnsignedContractCallTransaction } from '../../AbstractContractCallGateway';
import {
  assertUnsignedProtocolCallCorrectness,
  mockITransactionFactory,
  mockJsonRpcProvider,
} from '../../__helpers__/mocks';
import { ProfileMetadataGateway } from '../ProfileMetadataGateway';

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

  const gateway = new ProfileMetadataGateway(
    config,
    providerFactory,
    apolloClient,
    transactionFactory,
  );

  return { gateway };
}

describe(`Given an instance of the ${ProfileMetadataGateway.name}`, () => {
  const request = mockSetProfileMetadataRequest();
  const data = mockCreateSetProfileMetadataTypedDataData({ metadataURI: request.metadataURI });

  describe(`when creating an ${UnsignedTransaction.name}<SetProfileMetadataRequest>`, () => {
    const wallet = mockWallet();

    it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
      const provider = await mockJsonRpcProvider();
      const apolloClient = mockLensApolloClient([
        mockCreateSetProfileMetadataTypedDataResponse({
          request: {
            metadataURI: request.metadataURI,
          },
          data,
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient, provider });

      const unsignedTransaction = await gateway.createUnsignedTransaction(request, wallet);

      expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
    });
  });

  describe(`when creating an IUnsignedProtocolCall<SetProfileMetadataRequest> via the "${ProfileMetadataGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
    it(`should:
        - create a new Profile Metadata updating the profile details
        - create an instance of the ${UnsignedProtocolCall.name} w/ the expected typed data`, async () => {
      const apolloClient = mockLensApolloClient([
        mockCreateSetProfileMetadataTypedDataResponse({
          request: {
            metadataURI: request.metadataURI,
          },
          data,
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });

    it(`should override the signature nonce when provided`, async () => {
      const nonce = mockNonce();
      const apolloClient = mockLensApolloClient([
        mockCreateSetProfileMetadataTypedDataResponse({
          request: {
            metadataURI: request.metadataURI,
          },
          overrideSigNonce: nonce,
        }),
      ]);
      const { gateway } = setupTestScenario({ apolloClient });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });
});
