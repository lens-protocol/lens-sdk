import { InvariantError } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { IWalletGateway } from '../../wallets/IWalletGateway';
import { ActiveWallet, ICredentialsReader } from '../ActiveWallet';

describe(`Given the ${ActiveWallet.name} interactor`, () => {
  describe(`when "${ActiveWallet.prototype.requireActiveWallet.name}" is invoked`, () => {
    it('should return the active wallet when credentials are present', async () => {
      const wallet = mockWallet();
      const credentials = mockCredentials({ address: wallet.address });

      const credentialsReader = mock<ICredentialsReader>({
        getCredentials: async () => credentials,
      });
      const walletGateway = mock<IWalletGateway>();

      when(walletGateway.getByAddress).calledWith(credentials.address).mockResolvedValue(wallet);

      const interactor = new ActiveWallet(credentialsReader, walletGateway);

      const actual = await interactor.requireActiveWallet();

      expect(actual).toEqual(wallet);
    });

    it(`should throw an ${InvariantError.name} if credentials a not present`, async () => {
      const credentialsReader = mock<ICredentialsReader>({
        getCredentials: async () => null,
      });
      const walletGateway = mock<IWalletGateway>();

      const interactor = new ActiveWallet(credentialsReader, walletGateway);

      await expect(() => interactor.requireActiveWallet()).rejects.toThrow(InvariantError);
    });
  });
});
