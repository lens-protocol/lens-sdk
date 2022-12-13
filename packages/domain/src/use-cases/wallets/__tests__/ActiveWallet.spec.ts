import { InvariantError } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveWallet, ICredentialsGateway, IWalletGateway } from '../ActiveWallet';

describe('Given the ActiveWallet interactor', () => {
  describe('when "getActiveWallet" is invoked', () => {
    it('should return the active wallet when credentials are present', async () => {
      const wallet = mockWallet();
      const credentials = mockCredentials({ address: wallet.address });

      const credentialsGateway = mock<ICredentialsGateway>({
        getCredentials: async () => credentials,
      });
      const walletGateway = mock<IWalletGateway>();

      when(walletGateway.getByAddress).calledWith(credentials.address).mockResolvedValue(wallet);

      const gateway = new ActiveWallet(credentialsGateway, walletGateway);

      const actual = await gateway.getActiveWallet();

      expect(actual).toEqual(wallet);
    });

    it('should return `null` wallet when credentials are missing', async () => {
      const credentialsGateway = mock<ICredentialsGateway>({
        getCredentials: async () => null,
      });
      const walletGateway = mock<IWalletGateway>();

      const gateway = new ActiveWallet(credentialsGateway, walletGateway);

      const actual = await gateway.getActiveWallet();

      expect(actual).toBeNull();
    });

    it(`should throw an ${InvariantError.name} when wallet for the given credentials is not found`, async () => {
      const credentials = mockCredentials();

      const credentialsGateway = mock<ICredentialsGateway>({
        getCredentials: async () => credentials,
      });
      const walletGateway = mock<IWalletGateway>();

      when(walletGateway.getByAddress).calledWith(credentials.address).mockResolvedValue(null);

      const gateway = new ActiveWallet(credentialsGateway, walletGateway);

      await expect(() => gateway.getActiveWallet()).rejects.toThrow(InvariantError);
    });
  });
});
