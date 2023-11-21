import { WalletConnectionError, WalletConnectionErrorReason } from '@lens-protocol/domain/entities';
import { ChainType } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { errors, Wallet, logger, providers, utils, VoidSigner } from 'ethers';
import { when } from 'jest-when';

import { production } from '../../../environments';
import { RequiredSigner } from '../../adapters/ConcreteWallet';
import { SignerFactory } from '../SignerFactory';
import { mockISignerBinding, VoidJsonRpcProvider } from '../__helpers__/mocks';

const address = mockEvmAddress();

function setupTestScenario({
  signer,
  chainType,
}: {
  signer: RequiredSigner;
  chainType?: ChainType;
}) {
  const bindings = mockISignerBinding({ chainType, signer });

  const signerFactory = new SignerFactory(bindings, production.chains);

  return { signerFactory };
}

class VoidSignerWithJsonRpcProvider extends VoidSigner implements RequiredSigner {
  declare provider: providers.JsonRpcProvider;

  constructor(
    address: string,
    provider: providers.JsonRpcProvider = new VoidJsonRpcProvider('homestead'),
  ) {
    super(address, provider);
  }
}

describe(`Given an instance of the ${SignerFactory.name}`, () => {
  describe(`when invoking the ${SignerFactory.prototype.createSigner.name} method`, () => {
    it('should retrieve the signer via the ISignerBinding', async () => {
      const signer = new VoidSignerWithJsonRpcProvider(address);
      const { signerFactory } = setupTestScenario({ signer });

      const result = await signerFactory.createSigner({ address });

      expect(result.unwrap()).toBe(signer);
    });

    it(`should fail with ${WalletConnectionError.name}(${WalletConnectionErrorReason.WRONG_ACCOUNT}) in case of address mismatch`, async () => {
      const signer = new VoidSignerWithJsonRpcProvider(mockEvmAddress());
      const { signerFactory } = setupTestScenario({ signer });

      const result = await signerFactory.createSigner({ address });

      const error = new WalletConnectionError(WalletConnectionErrorReason.WRONG_ACCOUNT);
      expect(() => result.unwrap()).toThrowError(error);
    });

    describe('with a specified chain', () => {
      const chainType = ChainType.POLYGON;

      it('should add the desired chain configuration in a best effort fashion', async () => {
        const provider = new VoidJsonRpcProvider('homestead');
        const signer = new VoidSignerWithJsonRpcProvider(address, provider);
        const { signerFactory } = setupTestScenario({ signer, chainType });

        when(provider.send)
          .calledWith('eth_chainId', [])
          .mockResolvedValue(utils.hexlify(production.chains[ChainType.ETHEREUM].chainId))
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          .calledWith('wallet_addEthereumChain', expect.anything())
          .mockRejectedValue(logger.makeError('Not implemented', errors.NOT_IMPLEMENTED, {}));

        await signerFactory.createSigner({ address, chainType });

        expect(provider.send).toBeCalledWith('wallet_addEthereumChain', [
          expect.objectContaining({
            chainId: utils.hexlify(production.chains[chainType].chainId),
          }),
        ]);
      });

      it('should switch to the desired chain', async () => {
        const provider = new VoidJsonRpcProvider('homestead');
        const signer = new VoidSignerWithJsonRpcProvider(address, provider);
        const { signerFactory } = setupTestScenario({ signer, chainType });

        when(provider.send)
          .calledWith('eth_chainId', [])
          .mockResolvedValue(utils.hexlify(production.chains[ChainType.ETHEREUM].chainId));

        await signerFactory.createSigner({ address, chainType });

        expect(provider.send).toBeCalledWith('wallet_switchEthereumChain', [
          {
            chainId: utils.hexlify(production.chains[chainType].chainId),
          },
        ]);
      });

      it(`should fail with ${WalletConnectionError.name}(${WalletConnectionErrorReason.INCORRECT_CHAIN}) in case it fails to switch to the desired chain`, async () => {
        const provider = new VoidJsonRpcProvider('homestead');
        const signer = new VoidSignerWithJsonRpcProvider(address, provider);
        const { signerFactory } = setupTestScenario({ signer, chainType });

        when(provider.send)
          .calledWith('eth_chainId', [])
          .mockResolvedValue(utils.hexlify(production.chains[ChainType.ETHEREUM].chainId))
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          .calledWith('wallet_switchEthereumChain', expect.anything())
          .mockRejectedValue(logger.makeError('Not implemented', errors.NOT_IMPLEMENTED, {}));

        const result = await signerFactory.createSigner({ address, chainType });

        const error = new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN);
        expect(() => result.unwrap()).toThrowError(error);
      });
    });

    describe('with a wallet address', () => {
      // This is the private key of the `@jsisthebest.test` profile
      // It's a public private key so anyone can modify the profile
      // For your own convenience change to the private key of a new wallet
      const testWalletPrivateKey =
        '6c434da5e5c0e3a8e0db5cf835d23e04c7592037854f0700c26836be7581c68c';

      it('should retrieve the signer', async () => {
        const wallet = new Wallet(testWalletPrivateKey);

        const { signerFactory } = setupTestScenario({ signer: wallet });

        const result = await signerFactory.createSigner({ address: wallet.address });

        expect(result.unwrap()).toBe(wallet);
      });

      it(`should fail with ${WalletConnectionError.name}(${WalletConnectionErrorReason.INCORRECT_CHAIN}) since it cannot switch chains`, async () => {
        const wallet = new Wallet(testWalletPrivateKey);

        const { signerFactory } = setupTestScenario({
          signer: wallet,
          chainType: ChainType.POLYGON,
        });

        const result = await signerFactory.createSigner({
          address: wallet.address,
          chainType: ChainType.POLYGON,
        });

        const error = new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN);
        expect(() => result.unwrap()).toThrowError(error);
      });
    });
  });
});
