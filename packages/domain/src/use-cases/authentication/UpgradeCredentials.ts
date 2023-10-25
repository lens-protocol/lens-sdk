import { Result, invariant, success } from '@lens-protocol/shared-kernel';

import { ICredentials, ProfileId } from '../../entities';
import { ICredentialsWriter } from './ICredentialsWriter';
import { SessionData, profileSessionData } from './SessionData';

export type UpgradeCredentialsRequest = {
  forProfile: ProfileId;
};

export interface ICredentialsUpgrader {
  upgradeCredentials(forProfile: ProfileId): Promise<ICredentials>;
}

export interface IUpgradeCredentialsPresenter {
  present(result: Result<SessionData, never>): void;
}

export class UpgradeCredentials {
  constructor(
    private readonly credentialsUpgrader: ICredentialsUpgrader,
    private readonly credentialsWriter: ICredentialsWriter,
    private readonly presenter: IUpgradeCredentialsPresenter,
  ) {}

  async execute(request: UpgradeCredentialsRequest): Promise<void> {
    const credentials = await this.credentialsUpgrader.upgradeCredentials(request.forProfile);

    await this.credentialsWriter.save(credentials);

    // quick fix... should profile SessionData to replace ICredentials entity and make this code more type safe
    invariant(credentials.profileId, 'Profile ID is missing');

    this.presenter.present(
      success(
        profileSessionData({
          profileId: credentials.profileId,
          address: credentials.address,
        }),
      ),
    );
  }
}
