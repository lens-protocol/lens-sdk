/**
 * @jest-environment node
 */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import {
  mockGenerateLensAPIRelayAddressResponse,
  mockLensApolloClient,
} from '@lens-protocol/api-bindings/mocks';
import { permissionlessCreator } from '@lens-protocol/blockchain-bindings';
import { mockCreateProfileRequest, mockWallet } from '@lens-protocol/domain/mocks';
import { ChainType } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { deployMockContract } from 'ethereum-waffle';
import { BigNumber, Wallet, utils } from 'ethers';
import { mock } from 'jest-mock-extended';

import { RequiredConfig } from '../../../config';
import { staging } from '../../../environments';
import { mockIProviderFactory } from '../../../wallet/adapters/__helpers__/mocks';
import { UnsignedContractCallTransaction } from '../AbstractContractCallGateway';
import { CreateProfileTransactionGateway } from '../CreateProfileTransactionGateway';
import { mockJsonRpcProvider } from '../__helpers__/mocks';

const contract = permissionlessCreator(staging.contracts.permissionlessCreator);

async function setupTestScenario(mocks: MockedResponse[] = []) {
  const apolloClient = mockLensApolloClient(mocks);

  const provider = await mockJsonRpcProvider();
  const providerFactory = mockIProviderFactory({
    chainType: ChainType.POLYGON,
    provider,
  });

  const [deployer] = provider.getWallets() as [Wallet];

  const mockContract = await deployMockContract(
    deployer,
    contract.interface.fragments as unknown as string[],
    {
      address: staging.contracts.permissionlessCreator,
    },
  );

  // eslint-disable-next-line @typescript-eslint/await-thenable
  await mockContract.mock.getProfileWithHandleCreationPrice!.returns(utils.parseEther('10'));

  const config = mock<RequiredConfig>({ environment: staging });

  return new CreateProfileTransactionGateway(apolloClient, config, providerFactory);
}

describe(`Given an instance of the ${CreateProfileTransactionGateway.name}`, () => {
  const relayer = mockEvmAddress();
  const wallet = mockWallet();
  const localName = faker.internet.userName();

  describe.each([
    {
      description: '',
      request: mockCreateProfileRequest({ to: wallet.address, localName }),
      params: [
        {
          to: wallet.address,
          followModule: '0x0000000000000000000000000000000000000000',
          followModuleInitData: '0x',
        },
        localName,
        [relayer],
      ] as any,
    },
    {
      description: 'with signless disabled',
      request: mockCreateProfileRequest({ to: wallet.address, localName, approveSignless: false }),
      params: [
        {
          to: wallet.address,
          followModule: '0x0000000000000000000000000000000000000000',
          followModuleInitData: '0x',
        },
        localName,
        [],
      ] as any,
    },
  ])(`when creating an new Profile $description`, ({ request, params }) => {
    it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
      const gateway = await setupTestScenario([
        mockGenerateLensAPIRelayAddressResponse({
          address: relayer,
        }),
      ]);

      const unsignedTransaction = await gateway.createUnsignedTransaction(request, wallet);

      const expectedCall = permissionlessCreator(
        staging.contracts.permissionlessCreator,
      ).interface.encodeFunctionData('createProfileWithHandle', params);

      expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
      expect(unsignedTransaction).toEqual({
        chainType: ChainType.POLYGON,
        id: expect.any(String),
        request,
        transactionRequest: expect.objectContaining({
          data: expectedCall,
          gasLimit: expect.any(BigNumber),
          maxFeePerGas: expect.any(BigNumber),
          maxPriorityFeePerGas: expect.any(BigNumber),
          from: wallet.address,
          type: 2, // EIP-1559
          value: utils.parseEther('10'),
        }),
      });
    });
  });
});
