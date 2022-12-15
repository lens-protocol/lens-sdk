import { InvariantError } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockCredentials, mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveWallet, ICredentialsReader, IReadableWalletGateway } from '../ActiveWallet';

describe('Given the ActiveWallet interactor', () => {
  describe('when "getActiveWallet" is invoked', () => {
    it('should return the active wallet when credentials are present', async () => {
      const wallet = mockWallet();
      const credentials = mockCredentials({ address: wallet.address });

      const credentialsReader = mock<ICredentialsReader>({
        getCredentials: async () => credentials,
      });
      const walletGateway = mock<IReadableWalletGateway>();

      when(walletGateway.getByAddress).calledWith(credentials.address).mockResolvedValue(wallet);

      const gateway = new ActiveWallet(credentialsReader, walletGateway);

      const actual = await gateway.getActiveWallet();

      expect(actual).toEqual(wallet);
    });

    it('should return `null` wallet when credentials are missing', async () => {
      const credentialsReader = mock<ICredentialsReader>({
        getCredentials: async () => null,
      });
      const walletGateway = mock<IReadableWalletGateway>();

      const gateway = new ActiveWallet(credentialsReader, walletGateway);

      const actual = await gateway.getActiveWallet();

      expect(actual).toBeNull();
    });

    it(`should throw an ${InvariantError.name} when wallet for the given credentials is not found`, async () => {
      const credentials = mockCredentials();

      const credentialsReader = mock<ICredentialsReader>({
        getCredentials: async () => credentials,
      });
      const walletGateway = mock<IReadableWalletGateway>();

      when(walletGateway.getByAddress).calledWith(credentials.address).mockResolvedValue(null);

      const gateway = new ActiveWallet(credentialsReader, walletGateway);

      await expect(() => gateway.getActiveWallet()).rejects.toThrow(InvariantError);
    });
  });
});
