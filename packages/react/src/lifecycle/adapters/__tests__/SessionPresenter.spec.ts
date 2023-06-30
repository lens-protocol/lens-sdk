import {
  authenticatedProfile,
  authenticatedWallet,
  getSession,
  notAuthenticated,
} from '@lens-protocol/api-bindings';
import { mockProfileIdentifier, mockWalletData } from '@lens-protocol/domain/mocks';
import { LogoutReason } from '@lens-protocol/domain/use-cases/wallets';
import { InvariantError } from '@lens-protocol/shared-kernel';

import { SessionPresenter } from '../SessionPresenter';

function noop() {}

describe(`Given the ${SessionPresenter.name}`, () => {
  const wallet = mockWalletData();

  describe(`when the "${SessionPresenter.prototype.anonymous.name}" method is invoked`, () => {
    it('should set a NotAuthenticatedSession', () => {
      const presenter = new SessionPresenter(noop);

      presenter.anonymous();

      expect(getSession()).toEqual(notAuthenticated());
    });
  });

  describe(`when the "${SessionPresenter.prototype.authenticated.name}" method is invoked`, () => {
    describe('with just WalletData', () => {
      it('should set an AuthenticatedWalletSession', () => {
        const presenter = new SessionPresenter(noop);

        presenter.authenticated(wallet, null);

        expect(getSession()).toEqual(authenticatedWallet(wallet));
      });
    });

    describe('with WalletData and ProfileIdentifier', () => {
      const profile = mockProfileIdentifier();

      it('should set an AuthenticatedProfileSession', () => {
        const presenter = new SessionPresenter(noop);

        presenter.authenticated(wallet, profile);

        expect(getSession()).toEqual(authenticatedProfile(wallet, profile));
      });
    });
  });

  describe(`when the "${SessionPresenter.prototype.switchProfile.name}" method is invoked`, () => {
    const wallet = mockWalletData();
    const oldProfile = mockProfileIdentifier();

    it('should change the current AuthenticatedProfileSession profile', () => {
      const newProfile = mockProfileIdentifier();
      const presenter = new SessionPresenter(noop);
      presenter.authenticated(wallet, oldProfile);

      presenter.switchProfile(newProfile);

      expect(getSession()).toEqual(authenticatedProfile(wallet, newProfile));
    });

    it(`should throw an ${InvariantError.name} in case the current session is not authenticated`, () => {
      const presenter = new SessionPresenter(noop);
      presenter.anonymous();

      expect(() => presenter.switchProfile(mockProfileIdentifier())).toThrow(InvariantError);
    });
  });

  describe(`when the "${SessionPresenter.prototype.logout.name}" method is invoked`, () => {
    const data = {
      logoutReason: LogoutReason.USER_INITIATED,
      lastLoggedInWallet: mockWalletData(),
    };
    const handler = jest.fn();

    it(`should:
        - set a NotAuthenticatedSession
        - call the injected handler with the logout data`, () => {
      const presenter = new SessionPresenter(handler);
      presenter.authenticated(wallet, null);

      presenter.logout(data);

      expect(handler).toHaveBeenCalledWith(data);
      expect(getSession()).toEqual(notAuthenticated());
    });
  });
});
