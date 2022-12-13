import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  PendingSigningRequestError,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '../../../entities';
import {
  mockNftOwnershipChallenge,
  mockSignature,
  mockWallet,
} from '../../../entities/__helpers__/mocks';
import { mockActiveWallet } from '../../wallets/__helpers__/mocks';
import {
  INftOwnershipChallengeGateway,
  IProveNftOwnershipPresenter,
  ProveNftOwnership,
} from '../ProveNftOwnership';
import {
  mockINftOwnershipChallengeGateway,
  mockProveNftOwnershipRequest,
} from '../__helpers__/mocks';

function setupProveNftOwnership({
  gateway,
  presenter,
  wallet,
}: {
  gateway: INftOwnershipChallengeGateway;
  presenter: IProveNftOwnershipPresenter;
  wallet: Wallet;
}) {
  const activeWallet = mockActiveWallet({ wallet });
  return new ProveNftOwnership(activeWallet, gateway, presenter);
}

describe(`Given the ${ProveNftOwnership.name} interactor`, () => {
  describe(`when invoking the ${ProveNftOwnership.prototype.proveOwnership.name} method`, () => {
    const request = mockProveNftOwnershipRequest();
    const challenge = mockNftOwnershipChallenge();
    const signature = mockSignature();

    it(`should:
        - create an Challenge
        - use the active ${Wallet.name} to create a Signature
        - present the signature`, async () => {
      const wallet = mockWallet();
      when(wallet.signMessage).calledWith(challenge.message).mockResolvedValue(success(signature));

      const gateway = mockINftOwnershipChallengeGateway({
        request,
        result: challenge,
      });
      const presenter = mock<IProveNftOwnershipPresenter>();
      const proveNftOwnership = setupProveNftOwnership({
        gateway,
        presenter,
        wallet,
      });

      await proveNftOwnership.proveOwnership(request);

      expect(presenter.present).toHaveBeenCalledWith(
        success({
          id: challenge.id,
          signature,
        }),
      );
    });

    it.each([
      {
        ErrorCtor: PendingSigningRequestError,
        error: new PendingSigningRequestError(),
      },
      {
        ErrorCtor: WalletConnectionError,
        error: new WalletConnectionError(WalletConnectionErrorReason.CONNECTION_REFUSED),
      },
      {
        ErrorCtor: UserRejectedError,
        error: new UserRejectedError(),
      },
    ])(`should present any $ErrorCtor.name from the ${Wallet.name}`, async ({ error }) => {
      const wallet = mockWallet();
      when(wallet.signMessage).calledWith(challenge.message).mockResolvedValue(failure(error));

      const gateway = mockINftOwnershipChallengeGateway({
        request,
        result: challenge,
      });
      const presenter = mock<IProveNftOwnershipPresenter>();
      const proveNftOwnership = setupProveNftOwnership({
        gateway,
        presenter,
        wallet,
      });

      await proveNftOwnership.proveOwnership(request);

      expect(presenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
