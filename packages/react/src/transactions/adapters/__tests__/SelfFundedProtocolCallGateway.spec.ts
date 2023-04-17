/*
 * @jest-environment node
 */
import { mockWallet } from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType } from '@lens-protocol/shared-kernel';
import { MockProvider } from 'ethereum-waffle';
import { providers } from 'ethers';

import { mockIProviderFactory } from '../../../wallet/adapters/__helpers__/mocks';
import {
  SelfFundedProtocolCallGateway,
  UnsignedSelfFundedProtocolCallTransaction,
} from '../SelfFundedProtocolCallGateway';
import { mockSelfFundedProtocolCallRequest } from '../__helpers__/mocks';

function setupSelfFundedProtocolCallGateway({ provider }: { provider: providers.JsonRpcProvider }) {
  const providerFactory = mockIProviderFactory({
    chainType: ChainType.POLYGON,
    provider,
  });

  return new SelfFundedProtocolCallGateway(providerFactory);
}

async function mineNBlocks(provider: MockProvider, blocks: number) {
  return provider.send('evm_mine', [{ blocks }]);
}

describe(`Given an instance of the ${SelfFundedProtocolCallGateway.name}`, () => {
  const request = mockSelfFundedProtocolCallRequest<SupportedTransactionRequest>();
  const wallet = mockWallet();

  describe(`when invoking ${SelfFundedProtocolCallGateway.prototype.prepareSelfFundedTransaction.name}`, () => {
    it(`should succeed with the expected ${UnsignedSelfFundedProtocolCallTransaction.name}`, async () => {
      const provider = new MockProvider({
        ganacheOptions: {
          chain: {
            hardfork: 'london',
          },
        },
      });
      await mineNBlocks(provider, 20);
      const gateway = setupSelfFundedProtocolCallGateway({ provider });

      const unsignedTransaction = await gateway.prepareSelfFundedTransaction(request, wallet);

      expect(unsignedTransaction).toBeInstanceOf(UnsignedSelfFundedProtocolCallTransaction);
    });
  });
});
