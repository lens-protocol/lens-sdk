/*
 * @jest-environment node
 */
import { erc20 } from '@lens-protocol/blockchain-bindings';
import { mockTokenAllowanceRequest, mockWallet } from '@lens-protocol/domain/mocks';
import {
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { BigNumber, constants, providers, utils } from 'ethers';
import { mock } from 'jest-mock-extended';

import { RequiredConfig } from '../../../config';
import { mockIProviderFactory } from '../../../wallet/adapters/__helpers__/mocks';
import { UnsignedContractCallTransaction } from '../AbstractContractCallGateway';
import { ApproveTransactionGateway } from '../ApproveTransactionGateway';
import { mockJsonRpcProvider } from '../__helpers__/mocks';

function setupApproveTransactionGateway({
  request,
  provider,
}: {
  request: TokenAllowanceRequest;
  provider: providers.JsonRpcProvider;
}) {
  const config = mock<RequiredConfig>();
  const providerFactory = mockIProviderFactory({
    chainType: request.amount.asset.chainType,
    provider,
  });

  return new ApproveTransactionGateway(config, providerFactory);
}

describe(`Given an instance of the ${ApproveTransactionGateway.name}`, () => {
  const wallet = mockWallet();

  describe(`when creating an approve transaction for an exact amount`, () => {
    it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
      const request = mockTokenAllowanceRequest({
        limit: TokenAllowanceLimit.EXACT,
      });
      const provider = await mockJsonRpcProvider();
      const approveTransactionGateway = setupApproveTransactionGateway({
        request,
        provider,
      });

      const unsignedTransaction = await approveTransactionGateway.createUnsignedTransaction(
        request,
        wallet,
      );

      expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
      expect(unsignedTransaction).toEqual({
        chainType: request.amount.asset.chainType,
        id: expect.any(String),
        request,
        transactionRequest: expect.objectContaining({
          data: erc20(request.amount.asset.address).interface.encodeFunctionData('approve', [
            request.spender,
            utils.parseEther(request.amount.toSignificantDigits()),
          ]),
          gasLimit: expect.any(BigNumber),
          maxFeePerGas: expect.any(BigNumber),
          maxPriorityFeePerGas: expect.any(BigNumber),
          from: wallet.address,
          type: 2, // EIP-1559
        }),
      });
    });
  });

  describe(`when creating an infinite approve transaction`, () => {
    it(`should resolve with the expected ${UnsignedContractCallTransaction.name}`, async () => {
      const request = mockTokenAllowanceRequest({
        limit: TokenAllowanceLimit.INFINITE,
      });
      const provider = await mockJsonRpcProvider();
      const approveTransactionGateway = setupApproveTransactionGateway({
        request,
        provider,
      });

      const unsignedTransaction = await approveTransactionGateway.createUnsignedTransaction(
        request,
        wallet,
      );

      expect(unsignedTransaction).toBeInstanceOf(UnsignedContractCallTransaction);
      expect(unsignedTransaction).toEqual({
        chainType: request.amount.asset.chainType,
        id: expect.any(String),
        request,
        transactionRequest: expect.objectContaining({
          data: erc20(request.amount.asset.address).interface.encodeFunctionData('approve', [
            request.spender,
            constants.MaxUint256,
          ]),
          gasLimit: expect.any(BigNumber),
          maxFeePerGas: expect.any(BigNumber),
          maxPriorityFeePerGas: expect.any(BigNumber),
          from: wallet.address,
          type: 2, // EIP-1559
        }),
      });
    });
  });
});
