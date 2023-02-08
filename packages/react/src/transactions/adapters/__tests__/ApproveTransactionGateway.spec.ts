/*
 * @jest-environment node
 */
import { erc20 } from '@lens-protocol/blockchain-bindings';
import { mockTokenAllowanceRequest, mockWallet } from '@lens-protocol/domain/mocks';
import {
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/wallets';
import { MockProvider } from 'ethereum-waffle';
import { BigNumber, constants, providers, utils } from 'ethers';

import { mockIProviderFactory } from '../../../wallet/adapters/__helpers__/mocks';
import {
  ApproveTransactionGateway,
  UnsignedApproveTransaction,
} from '../ApproveTransactionGateway';

function setupApproveTransactionGateway({
  request,
  provider,
}: {
  request: TokenAllowanceRequest;
  provider: providers.JsonRpcProvider;
}) {
  const providerFactory = mockIProviderFactory({
    chainType: request.amount.asset.chainType,
    provider,
  });

  return new ApproveTransactionGateway(providerFactory);
}

async function mineNBlocks(provider: MockProvider, blocks: number) {
  return provider.send('evm_mine', [{ blocks }]);
}

describe(`Given an instance of the ${ApproveTransactionGateway.name}`, () => {
  const wallet = mockWallet();

  describe(`when creating an approve transaction for an exact amount`, () => {
    it(`should succeed with the expected ${UnsignedApproveTransaction.name}`, async () => {
      const request = mockTokenAllowanceRequest({
        limit: TokenAllowanceLimit.EXACT,
      });
      const provider = new MockProvider({
        ganacheOptions: {
          chain: {
            hardfork: 'london',
          },
        },
      });
      await mineNBlocks(provider, 20);
      const approveTransactionGateway = setupApproveTransactionGateway({
        request,
        provider,
      });

      const unsignedTransaction = await approveTransactionGateway.createApproveTransaction(
        request,
        wallet,
      );

      expect(unsignedTransaction).toBeInstanceOf(UnsignedApproveTransaction);
      expect(unsignedTransaction).toEqual({
        chainType: request.amount.asset.chainType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(String),
        request,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        transactionRequest: expect.objectContaining({
          data: erc20(request.amount.asset.address, provider).interface.encodeFunctionData(
            'approve',
            [request.spender, utils.parseEther(request.amount.toSignificantDigits())],
          ),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          gasLimit: expect.any(BigNumber),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          maxFeePerGas: expect.any(BigNumber),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          maxPriorityFeePerGas: expect.any(BigNumber),
          from: wallet.address,
          type: 2, // EIP-1559
        }),
      });
    });
  });

  describe(`when creating an infinite approve transaction`, () => {
    it(`should succeed with the expected ${UnsignedApproveTransaction.name}`, async () => {
      const request = mockTokenAllowanceRequest({
        limit: TokenAllowanceLimit.INFINITE,
      });
      const provider = new MockProvider({
        ganacheOptions: {
          chain: {
            hardfork: 'london',
          },
        },
      });
      await mineNBlocks(provider, 20);
      const approveTransactionGateway = setupApproveTransactionGateway({
        request,
        provider,
      });

      const unsignedTransaction = await approveTransactionGateway.createApproveTransaction(
        request,
        wallet,
      );

      expect(unsignedTransaction).toBeInstanceOf(UnsignedApproveTransaction);
      expect(unsignedTransaction).toEqual({
        chainType: request.amount.asset.chainType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(String),
        request,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        transactionRequest: expect.objectContaining({
          data: erc20(request.amount.asset.address, provider).interface.encodeFunctionData(
            'approve',
            [request.spender, constants.MaxUint256],
          ),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          gasLimit: expect.any(BigNumber),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          maxFeePerGas: expect.any(BigNumber),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          maxPriorityFeePerGas: expect.any(BigNumber),
          from: wallet.address,
          type: 2, // EIP-1559
        }),
      });
    });
  });
});
