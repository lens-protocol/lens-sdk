import { ChainType, InvariantError } from '@lens-protocol/shared-kernel';
import { providers, utils } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { production } from '../../../environments';
import { IProviderBinding, ProviderFactory } from '../ProviderFactory';
import { VoidJsonRpcProvider } from '../__helpers__/mocks';

function setupTestScenario({
  provider,
  chainType,
}: {
  provider: providers.JsonRpcProvider;
  chainType: ChainType;
}) {
  const bindings = mock<IProviderBinding>();

  when(bindings.getProvider)
    .calledWith({ chainId: production.chains[chainType].chainId })
    .mockResolvedValue(provider);

  const providerFactory = new ProviderFactory(bindings, production.chains);

  return { providerFactory };
}

describe(`Given an instance of the ${ProviderFactory.name}`, () => {
  describe(`when invoking the ${ProviderFactory.prototype.createProvider.name} method`, () => {
    const chainType = ChainType.POLYGON;

    it('should retrieve the signer via the ISignerBinding', async () => {
      const provider = new VoidJsonRpcProvider('matic');
      const { providerFactory } = setupTestScenario({ provider, chainType });

      when(provider.send)
        .calledWith('eth_chainId', [])
        .mockResolvedValue(utils.hexlify(production.chains[chainType].chainId));

      const result = await providerFactory.createProvider({ chainType });

      expect(result).toBe(provider);
    });

    it(`should throw an ${InvariantError.name} in case the provider is not connected to the desired chain`, async () => {
      const provider = new VoidJsonRpcProvider('homestead');
      const { providerFactory } = setupTestScenario({ provider, chainType });

      when(provider.send)
        .calledWith('eth_chainId', [])
        .mockResolvedValue(utils.hexlify(production.chains[ChainType.ETHEREUM].chainId));

      await expect(providerFactory.createProvider({ chainType })).rejects.toThrowError(
        InvariantError,
      );
    });
  });
});
