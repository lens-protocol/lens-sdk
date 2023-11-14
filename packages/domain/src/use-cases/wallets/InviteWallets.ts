import { EvmAddress, failure, success } from '@lens-protocol/shared-kernel';

import { Invite } from '../../entities';
import { IGenericResultPresenter } from '../transactions';

export type InviteWalletsRequest = {
  wallets: EvmAddress[];
};

export class WalletAlreadyInvitedError extends Error {
  name = 'WalletAlreadyInvitedError' as const;

  constructor(public readonly invalid: EvmAddress[]) {
    super(`Wallets already invited: ${invalid.join(', ')}`);
  }
}

export interface IInviteWalletsFactory {
  create(data: InviteWalletsRequest): Promise<Invite[]>;
}

export interface IInviteWalletsGateway {
  invite(data: Invite[]): Promise<void>;
}

export type IInviteWalletsPresenter = IGenericResultPresenter<void, WalletAlreadyInvitedError>;

export class InviteWallets {
  constructor(
    private readonly factory: IInviteWalletsFactory,
    private readonly gateway: IInviteWalletsGateway,
    private readonly presenter: IInviteWalletsPresenter,
  ) {}

  async invite(request: InviteWalletsRequest) {
    const invites = await this.factory.create(request);

    if (invites.length !== request.wallets.length) {
      const invalid = request.wallets.filter(
        (wallet) => !invites.some((invite) => invite.address === wallet),
      );
      this.presenter.present(failure(new WalletAlreadyInvitedError(invalid)));
      return;
    }

    await this.gateway.invite(invites);

    this.presenter.present(success());
  }
}
